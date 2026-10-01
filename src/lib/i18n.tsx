'use client';

import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

export type Locale = 'hi' | 'en' | 'awa' | 'bho' | 'ta' | 'te';
export const languageOptions: { id: Locale; label: string; native: string; speech: string }[] = [
  { id: 'hi', label: 'हिंदी', native: 'हिंदी', speech: 'hi-IN' },
  { id: 'en', label: 'English', native: 'English', speech: 'en-IN' },
  { id: 'awa', label: 'अवधी', native: 'अवधी', speech: 'hi-IN' },
  { id: 'bho', label: 'भोजपुरी', native: 'भोजपुरी', speech: 'hi-IN' },
  { id: 'ta', label: 'தமிழ்', native: 'தமிழ்', speech: 'ta-IN' },
  { id: 'te', label: 'తెలుగు', native: 'తెలుగు', speech: 'te-IN' },
];

const words: Record<Locale, Record<string, string>> = {
  hi: { home: 'होम', schemes: 'योजनाएँ', help: 'सहायता', profile: 'मेरा प्रोफ़ाइल', speak: 'पेज सुनें', allSchemes: 'सभी सरकारी योजनाएँ', schemeIntro: 'अपने और परिवार के लिए उपयुक्त सरकारी योजनाएँ खोजें।', verified: 'सरकारी स्रोत से सत्यापित जानकारी', popular: 'लोकप्रिय योजनाएँ', popularSub: 'लोग जिन योजनाओं को अक्सर देखते हैं', allSchemesSub: 'केंद्र सरकार की योजनाएँ और आवेदन की जानकारी देखें।', all: 'सभी', women: 'महिलाओं के लिए', children: 'बच्चों के लिए', farmers: 'किसानों के लिए', families: 'परिवारों के लिए', education: 'शिक्षा', employment: 'रोज़गार', health: 'स्वास्थ्य', housing: 'आवास', agriculture: 'कृषि', social: 'सामाजिक सुरक्षा', viewDetails: 'पूरी जानकारी', sortBy: 'क्रम अनुसार', popularity: 'लोकप्रियता', alphabetical: 'वर्णक्रम', noResults: 'कोई योजना नहीं मिली', trySearch: 'दूसरा शब्द खोजें या दूसरी श्रेणी चुनें।', officialScheme: 'सरकारी योजना', centralScheme: 'केंद्र सरकार की योजना', source: 'आधिकारिक स्रोत', applyOfficial: 'सरकारी आवेदन पेज खोलें', eligibility: 'पात्रता मानदंड', whereApply: 'कहाँ आवेदन करें', process: 'आवेदन प्रक्रिया', documents: 'ज़रूरी दस्तावेज़', benefit: 'योजना का लाभ', helpline: 'हेल्पलाइन', dishaAi: 'दिशा AI से पूछें', explainScheme: 'योजना सुनने के लिए दबाएँ', speaking: 'दिशा समझा रही है…', stopSpeaking: 'समझाना रोकें', close: 'बंद करें', updateNote: 'नियम बदल सकते हैं। आवेदन से पहले आधिकारिक पोर्टल पर पात्रता और दस्तावेज़ जाँचें।', active: 'आवेदन खुले हैं', closed: 'नए आवेदन बंद', closedMessage: 'आवेदन की अवधि 31 मार्च 2025 को समाप्त हुई। मौजूदा खाते योजना के नियमों के अनुसार जारी रहेंगे।', readMore: 'myScheme पर और सरकारी योजनाएँ देखें' },
  en: {
    home: 'Home', schemes: 'Schemes', help: 'Help', profile: 'My profile', speak: 'Read this page', allSchemes: 'All Government Schemes',
    schemeIntro: 'Find government schemes that may suit you and your family.', verified: 'Official government information', popular: 'Popular schemes', popularSub: 'Schemes people often explore', allSchemesSub: 'Explore central government schemes and their application details.',
    all: 'All', women: 'For women', children: 'For children', farmers: 'For farmers', families: 'For families', education: 'Education', employment: 'Employment', health: 'Health', housing: 'Housing', agriculture: 'Agriculture', social: 'Social security',
    viewDetails: 'View details', sortBy: 'Sort by', popularity: 'Popular', alphabetical: 'A–Z', noResults: 'No schemes found', trySearch: 'Try another search or category.',
    officialScheme: 'Official scheme', centralScheme: 'Central Government scheme', source: 'Official source', applyOfficial: 'Open official application page',
    eligibility: 'Eligibility criteria', whereApply: 'Where to apply', process: 'How to apply', documents: 'Documents to prepare', benefit: 'Scheme benefit', helpline: 'Helpline',
    dishaAi: 'Ask Disha AI', explainScheme: 'Tap to hear this scheme explained', speaking: 'Disha is explaining…', stopSpeaking: 'Stop explanation', close: 'Close', updateNote: 'Rules can change. Confirm current eligibility and documents on the official portal before applying.',
    active: 'Applications open', closed: 'New applications closed', closedMessage: 'The application window ended on 31 March 2025. Existing accounts continue under scheme rules.',
    readMore: 'Browse more official schemes on myScheme',
  },
  awa: {
    home: 'घर', schemes: 'योजनन', help: 'मदद', profile: 'हमार प्रोफाइल', speak: 'ई पन्ना सुनें', allSchemes: 'सब सरकारी योजनन',
    schemeIntro: 'अपने अउर परिवार खातिर काम की सरकारी योजनन खोजौ।', verified: 'सरकारी स्रोत से सही जानकारी', popular: 'लोकप्रिय योजनन', popularSub: 'जिन योजनन के लोग जियादा देखत हैं', allSchemesSub: 'केंद्र सरकार की योजनन अउर आवेदन की जानकारी देखौ।',
    all: 'सब', women: 'महिलन खातिर', children: 'बच्चन खातिर', farmers: 'किसानन खातिर', families: 'परिवारन खातिर', education: 'पढ़ाई', employment: 'रोजगार', health: 'सेहत', housing: 'घर', agriculture: 'खेती', social: 'सामाजिक सुरक्षा',
    viewDetails: 'जानकारी देखौ', sortBy: 'क्रम', popularity: 'लोकप्रिय', alphabetical: 'नाम से', noResults: 'कौनो योजना नाहीं मिली', trySearch: 'दूसर शब्द या श्रेणी चुनौ।',
    officialScheme: 'सरकारी योजना', centralScheme: 'केंद्र सरकार की योजना', source: 'सरकारी जानकारी', applyOfficial: 'सरकारी आवेदन पन्ना खोलौ',
    eligibility: 'कौन पात्र है', whereApply: 'कहाँ आवेदन करें', process: 'आवेदन कैसे करें', documents: 'जरूरी कागज', benefit: 'योजना का लाभ', helpline: 'मदद नंबर',
    dishaAi: 'दिशा AI से पूछौ', explainScheme: 'योजना सुनै खातिर दबावौ', speaking: 'दिशा समझावत है…', stopSpeaking: 'समझाना रोकौ', close: 'बंद करौ', updateNote: 'नियम बदल सकत हैं। आवेदन से पहिले सरकारी पन्ने पर पात्रता अउर कागज जांचौ।',
    active: 'आवेदन चालू', closed: 'नया आवेदन बंद', closedMessage: 'आवेदन 31 मार्च 2025 तक लिए गए थे। पुराने खाते नियम के मुताबिक चलत रहिहैं।', readMore: 'myScheme पर अउर सरकारी योजनन देखौ',
  },
  bho: {
    home: 'होम', schemes: 'योजना', help: 'सहायता', profile: 'हमार प्रोफाइल', speak: 'ई पन्ना सुनें', allSchemes: 'सब सरकारी योजना',
    schemeIntro: 'रउरा अउर परिवार खातिर काम के सरकारी योजना खोजीं।', verified: 'सरकारी स्रोत से प्रमाणित जानकारी', popular: 'लोकप्रिय योजना', popularSub: 'लोग जवन योजना जादे देखेलें', allSchemesSub: 'केंद्र सरकार के योजना आ आवेदन के जानकारी देखीं।',
    all: 'सब', women: 'महिला खातिर', children: 'लइका खातिर', farmers: 'किसान खातिर', families: 'परिवार खातिर', education: 'पढ़ाई', employment: 'रोजगार', health: 'स्वास्थ्य', housing: 'आवास', agriculture: 'खेती', social: 'सामाजिक सुरक्षा',
    viewDetails: 'पूरा जानकारी', sortBy: 'क्रम', popularity: 'लोकप्रिय', alphabetical: 'नाम से', noResults: 'कवनो योजना ना मिलल', trySearch: 'दूसर शब्द भा श्रेणी चुनीं।',
    officialScheme: 'सरकारी योजना', centralScheme: 'केंद्र सरकार के योजना', source: 'सरकारी जानकारी', applyOfficial: 'सरकारी आवेदन पन्ना खोलीं',
    eligibility: 'पात्रता', whereApply: 'कहाँ आवेदन करीं', process: 'आवेदन के तरीका', documents: 'जरूरी कागज', benefit: 'योजना के लाभ', helpline: 'हेल्पलाइन',
    dishaAi: 'दिशा AI से पूछीं', explainScheme: 'समझे खातिर दबाईं', speaking: 'दिशा समझावत बिया…', stopSpeaking: 'समझावल रोकीं', close: 'बंद करीं', updateNote: 'नियम बदल सकेला। आवेदन से पहिले सरकारी पोर्टल पर पात्रता आ कागज जाँच लीं।',
    active: 'आवेदन चालू बा', closed: 'नया आवेदन बंद बा', closedMessage: 'आवेदन 31 मार्च 2025 तक लिहल गइल रहे। पुरान खाता नियम से चलत रही।', readMore: 'myScheme पर अउर सरकारी योजना देखीं',
  },
  ta: {
    home: 'முகப்பு', schemes: 'திட்டங்கள்', help: 'உதவி', profile: 'என் சுயவிவரம்', speak: 'இந்தப் பக்கத்தைப் படிக்கவும்',
    allSchemes: 'அனைத்து அரசு திட்டங்கள்', schemeIntro: 'உங்களுக்கும் உங்கள் குடும்பத்திற்கும் ஏற்ற அரசு திட்டங்களைக் கண்டறியுங்கள்.', verified: 'அரசு ஆதாரத் தகவல்', popular: 'பிரபலமான திட்டங்கள்', popularSub: 'மக்கள் அடிக்கடி பார்க்கும் திட்டங்கள்', allSchemesSub: 'மத்திய அரசு திட்டங்கள் மற்றும் விண்ணப்ப விவரங்களைப் பாருங்கள்.',
    all: 'அனைத்தும்', women: 'பெண்களுக்கு', children: 'குழந்தைகளுக்கு', farmers: 'விவசாயிகளுக்கு', families: 'குடும்பங்களுக்கு', education: 'கல்வி', employment: 'வேலைவாய்ப்பு', health: 'சுகாதாரம்', housing: 'வீடு', agriculture: 'விவசாயம்', social: 'சமூகப் பாதுகாப்பு',
    viewDetails: 'விவரங்கள்', sortBy: 'வரிசை', popularity: 'பிரபலம்', alphabetical: 'அகரவரிசை', noResults: 'திட்டங்கள் எதுவும் இல்லை', trySearch: 'வேறு சொல் அல்லது பிரிவைத் தேர்ந்தெடுக்கவும்.',
    officialScheme: 'அரசுத் திட்டம்', centralScheme: 'மத்திய அரசு திட்டம்', source: 'அதிகாரப்பூர்வ ஆதாரம்', applyOfficial: 'அரசு விண்ணப்பப் பக்கத்தைத் திறக்கவும்',
    eligibility: 'தகுதி', whereApply: 'எங்கே விண்ணப்பிப்பது', process: 'விண்ணப்பிக்கும் முறை', documents: 'தேவையான ஆவணங்கள்', benefit: 'திட்டப் பயன்', helpline: 'உதவி எண்',
    dishaAi: 'திஷா AI-யிடம் கேளுங்கள்', explainScheme: 'திட்ட விளக்கத்தைக் கேட்கத் தொடவும்', speaking: 'திஷா விளக்குகிறது…', stopSpeaking: 'விளக்கத்தை நிறுத்து', close: 'மூடு', updateNote: 'விதிகள் மாறலாம். விண்ணப்பிக்கும் முன் அதிகாரப்பூர்வ தளத்தில் தகுதியையும் ஆவணங்களையும் சரிபார்க்கவும்.',
    active: 'விண்ணப்பங்கள் திறந்துள்ளன', closed: 'புதிய விண்ணப்பங்கள் நிறுத்தப்பட்டன', closedMessage: 'புதிய விண்ணப்பக் காலம் 31 மார்ச் 2025 அன்று முடிந்தது. ஏற்கெனவே உள்ள கணக்குகள் திட்ட விதிகளின்படி தொடரும்.', readMore: 'myScheme-ல் மேலும் அரசுத் திட்டங்களைப் பாருங்கள்',
  },
  te: {
    home: 'హోమ్', schemes: 'పథకాలు', help: 'సహాయం', profile: 'నా ప్రొఫైల్', speak: 'ఈ పేజీని వినండి',
    allSchemes: 'అన్ని ప్రభుత్వ పథకాలు', schemeIntro: 'మీకు, మీ కుటుంబానికి ఉపయోగపడే ప్రభుత్వ పథకాలను కనుగొనండి.', verified: 'అధికారిక ప్రభుత్వ సమాచారం', popular: 'ప్రాచుర్యం పొందిన పథకాలు', popularSub: 'ప్రజలు తరచుగా చూసే పథకాలు', allSchemesSub: 'కేంద్ర ప్రభుత్వ పథకాలు, దరఖాస్తు వివరాలను చూడండి.',
    all: 'అన్నీ', women: 'మహిళలకు', children: 'పిల్లలకు', farmers: 'రైతులకు', families: 'కుటుంబాలకు', education: 'విద్య', employment: 'ఉపాధి', health: 'ఆరోగ్యం', housing: 'గృహం', agriculture: 'వ్యవసాయం', social: 'సామాజిక భద్రత',
    viewDetails: 'వివరాలు చూడండి', sortBy: 'క్రమం', popularity: 'ప్రాచుర్యం', alphabetical: 'అక్షరక్రమం', noResults: 'పథకాలు కనబడలేదు', trySearch: 'మరో పదం లేదా విభాగాన్ని ఎంచుకోండి.',
    officialScheme: 'ప్రభుత్వ పథకం', centralScheme: 'కేంద్ర ప్రభుత్వ పథకం', source: 'అధికారిక మూలం', applyOfficial: 'అధికారిక దరఖాస్తు పేజీ తెరవండి',
    eligibility: 'అర్హత ప్రమాణాలు', whereApply: 'ఎక్కడ దరఖాస్తు చేయాలి', process: 'దరఖాస్తు విధానం', documents: 'అవసరమైన పత్రాలు', benefit: 'పథకం ప్రయోజనం', helpline: 'సహాయ నంబర్',
    dishaAi: 'దిశ AIని అడగండి', explainScheme: 'పథకం వివరణ వినడానికి తాకండి', speaking: 'దిశ వివరిస్తోంది…', stopSpeaking: 'వివరణ ఆపండి', close: 'మూసివేయండి', updateNote: 'నిబంధనలు మారవచ్చు. దరఖాస్తు చేసే ముందు అధికారిక పోర్టల్‌లో అర్హత, పత్రాలను నిర్ధారించండి.',
    active: 'దరఖాస్తులు తెరిచి ఉన్నాయి', closed: 'కొత్త దరఖాస్తులు ముగిశాయి', closedMessage: 'కొత్త దరఖాస్తుల గడువు 31 మార్చి 2025న ముగిసింది. ఇప్పటికే ఉన్న ఖాతాలు పథకం నిబంధనల ప్రకారం కొనసాగుతాయి.', readMore: 'mySchemeలో మరిన్ని ప్రభుత్వ పథకాలను చూడండి',
  },
};

type LocaleContextValue = { locale: Locale; setLocale: (locale: Locale) => void; t: (key: string) => string; speechLocale: string };
const LocaleContext = createContext<LocaleContextValue>({ locale: 'hi', setLocale: () => {}, t: key => words.hi[key] || key, speechLocale: 'hi-IN' });

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useState<Locale>('hi');
  useEffect(() => {
    const saved = window.localStorage.getItem('disha-locale') as Locale | null;
    if (saved && saved in words) {
      setLocale(saved);
      document.documentElement.lang = languageOptions.find(language => language.id === saved)?.speech || 'hi-IN';
    }
  }, []);
  const updateLocale = (next: Locale) => { setLocale(next); window.localStorage.setItem('disha-locale', next); document.documentElement.lang = languageOptions.find(language => language.id === next)?.speech || 'hi-IN'; };
  const speechLocale = languageOptions.find(language => language.id === locale)?.speech || 'hi-IN';
  const value = useMemo(() => ({ locale, setLocale: updateLocale, t: (key: string) => words[locale][key] || words.hi[key] || key, speechLocale }), [locale]);
  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}
export const useLanguage = () => useContext(LocaleContext);
