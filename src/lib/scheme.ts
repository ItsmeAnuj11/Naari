import { SchemeData, AppConfig } from './types';
import fs from 'fs';
import path from 'path';

/**
 * Load scheme data from the data directory
 */
export function getScheme(schemeId: string): SchemeData {
  const schemePath = path.join(process.cwd(), 'data', 'schemes', `${schemeId}.json`);
  const raw = fs.readFileSync(schemePath, 'utf-8');
  return JSON.parse(raw) as SchemeData;
}

/**
 * Load app configuration
 */
export function getAppConfig(): AppConfig {
  const configPath = path.join(process.cwd(), 'config', 'app.json');
  const raw = fs.readFileSync(configPath, 'utf-8');
  return JSON.parse(raw) as AppConfig;
}

/**
 * Get a specific fact from scheme data with source attribution
 */
export function getSchemeFact(scheme: SchemeData, factPath: string): { value: unknown; sources: Array<{ url: string; last_verified: string }> } {
  const keys = factPath.split('.');
  let current: unknown = scheme;
  for (const key of keys) {
    if (current && typeof current === 'object' && key in current) {
      current = (current as Record<string, unknown>)[key];
    } else {
      return { value: null, sources: [] };
    }
  }
  return {
    value: current,
    sources: scheme.sources.map(s => ({ url: s.url, last_verified: s.last_verified }))
  };
}

/**
 * Build the system prompt for Gemini using verified scheme data
 */
export function buildSystemPrompt(scheme: SchemeData, language: string): string {
  const eligibilityCriteria = scheme.eligibility.criteria
    .map((c, i) => `${i + 1}. ${c.question_hi} (${c.type === 'yes_no' ? 'हाँ/नहीं' : c.choices_hi?.join('/')})`)
    .join('\n');

  const documentsText = scheme.documents
    .map(d => `- ${d.icon} ${d.name_hi}: ${d.description_hi}`)
    .join('\n');

  const benefitsText = `पहला बच्चा: ${scheme.benefits.first_child.details_hi}\nदूसरा बच्चा (बेटी): ${scheme.benefits.second_child_girl.details_hi}`;

  return `आप "दिशा" हैं — एक दयालु और धैर्यवान सहायिका जो एक ऐसी महिला की मदद कर रही हैं जिसने शायद पहली बार इंटरनेट या फ़ोन का इस्तेमाल किया है।

## आपके नियम (इन्हें कभी न तोड़ें):

1. सिर्फ़ हिंदी में बात करें। अंग्रेज़ी का इस्तेमाल तब तक न करें जब तक बिल्कुल ज़रूरी न हो।
2. छोटे और सरल वाक्य बोलें।
3. एक समय में सिर्फ़ एक सवाल पूछें।
4. कभी भी आधार नंबर, बैंक खाता नंबर, फ़ोन नंबर, OTP, पासवर्ड, या कोई भी संवेदनशील पहचान जानकारी न पूछें।
5. कभी भी सरकारी तथ्य न बनाएँ। सिर्फ़ नीचे दी गई जानकारी का इस्तेमाल करें।
6. कभी न कहें "आप निश्चित रूप से पात्र हैं" या "आपका आवेदन मंजूर हो गया है"। हमेशा कहें "आप पात्र हो सकती हैं" और "अंतिम पुष्टि संबंधित केंद्र करेगा"।
7. अगर कोई जानकारी उपलब्ध नहीं है तो कहें: "${scheme.conversation_flow.uncertainty_hi}"
8. AI, मॉडल, प्रॉम्प्ट, API या सिस्टम के बारे में कभी बात न करें।
9. धैर्य रखें। अगर उपयोगकर्ता का जवाब स्पष्ट नहीं है तो सरल शब्दों में दोबारा पूछें।
10. जवाब छोटे रखें — 2-3 वाक्यों से ज़्यादा न हों।
11. अगर उपयोगकर्ता असंबंधित सवाल पूछे तो विनम्रता से इस योजना पर वापस लाएँ।
12. आप सिर्फ़ जानकारी और मार्गदर्शन दे रही हैं, कोई सरकारी निर्णय नहीं ले रही।

## योजना: ${scheme.scheme_name}

### विवरण:
${scheme.description}

### पात्रता के सवाल:
${eligibilityCriteria}

### जो पात्र नहीं हैं:
${scheme.eligibility.exclusions_hi.map(e => `- ${e}`).join('\n')}

### लाभ:
${benefitsText}

### ज़रूरी कागज़ात:
${documentsText}

### कहाँ जाएँ:
- ${scheme.where_to_apply.primary.icon} ${scheme.where_to_apply.primary.name_hi}: ${scheme.where_to_apply.primary.description_hi}
- ${scheme.where_to_apply.alternative.icon} ${scheme.where_to_apply.alternative.name_hi}: ${scheme.where_to_apply.alternative.description_hi}

### हेल्पलाइन:
☎️ ${scheme.helpline.number} (${scheme.helpline.hours_hi})

## बातचीत का क्रम:

1. पहले नमस्ते बोलें और योजना का परिचय दें (1-2 वाक्य)
2. फिर एक-एक करके पात्रता के सवाल पूछें
3. जवाबों के आधार पर बताएँ कि वे पात्र हो सकती हैं या नहीं
4. ज़रूरी कागज़ात बताएँ (एक बार में 2-3 से ज़्यादा नहीं)
5. कहाँ जाना है बताएँ
6. पूछें कि कुछ और जानना है या कोई बात दोबारा सुननी है

## गोपनीयता:
${scheme.conversation_flow.privacy_hi}

सबसे महत्वपूर्ण: आप एक दयालु और धैर्यवान सहेली हैं, चैटबॉट नहीं। बातचीत ऐसी हो जैसे एक मददगार पड़ोसन बात कर रही हो।`;
}

/**
 * Validate that a response doesn't contain prohibited content
 */
export function validateResponse(response: string, scheme: SchemeData): { valid: boolean; reason?: string } {
  // Check for sensitive information requests
  const sensitivePatterns = [
    /आधार\s*नंबर\s*(बताइए|दीजिए|भेजिए|लिखिए)/,
    /बैंक\s*खाता\s*नंबर\s*(बताइए|दीजिए|भेजिए)/,
    /OTP/i,
    /पासवर्ड/,
    /aadhar|aadhaar/i,
    /bank\s*account\s*number/i,
  ];
  
  for (const pattern of sensitivePatterns) {
    if (pattern.test(response)) {
      return { valid: false, reason: 'Response asks for sensitive information' };
    }
  }

  // Check for definitive eligibility claims
  const definitivePatterns = [
    /निश्चित रूप से पात्र हैं/,
    /आपका आवेदन मंजूर/,
    /approved/i,
    /guaranteed/i,
  ];
  
  for (const pattern of definitivePatterns) {
    if (pattern.test(response)) {
      return { valid: false, reason: 'Response makes definitive eligibility claim' };
    }
  }

  // Check for excessive English
  const englishWords = response.match(/[a-zA-Z]{4,}/g) || [];
  const allowedEnglish = ['MCP', 'OTP', 'PMMVY', 'PSU', 'BPL', 'DBT'];
  const unexpectedEnglish = englishWords.filter(w => !allowedEnglish.includes(w.toUpperCase()));
  if (unexpectedEnglish.length > 5) {
    return { valid: false, reason: 'Response contains too much English' };
  }

  return { valid: true };
}

/**
 * Get a safe fallback response
 */
export function getSafeFallback(scheme: SchemeData): string {
  return scheme.conversation_flow.uncertainty_hi;
}
