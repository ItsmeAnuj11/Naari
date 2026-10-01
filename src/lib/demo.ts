/**
 * Demo mode: Predefined conversation flow for reliable demo without API dependency
 */

export interface DemoStep {
  phase: string;
  assistantResponse: string;
  expectedUserInputs?: string[];
  nextOnYes?: number;
  nextOnNo?: number;
  nextStep?: number;
  showButtons?: { label: string; value: string }[];
}

export const DEMO_FLOW: DemoStep[] = [
  {
    phase: 'greeting',
    assistantResponse: 'नमस्ते! मैं Naari AI हूँ। मैं आपकी मदद के लिए यहाँ हूँ। मैं आपको प्रधानमंत्री मातृ वंदना योजना के बारे में बताऊँगी। इस योजना में सरकार गर्भवती महिलाओं और नई माताओं को पैसे देती है। आइए देखते हैं कि क्या यह योजना आपके लिए हो सकती है।',
    nextStep: 1,
  },
  {
    phase: 'question_1',
    assistantResponse: 'पहला सवाल — क्या आप माँ बनने वाली हैं या हाल ही में आपका बच्चा हुआ है?',
    expectedUserInputs: ['हाँ', 'जी हाँ', 'हां', 'जी', 'yes'],
    showButtons: [
      { label: 'हाँ', value: 'हाँ' },
      { label: 'नहीं', value: 'नहीं' },
    ],
    nextOnYes: 2,
    nextOnNo: 6,
  },
  {
    phase: 'question_2',
    assistantResponse: 'बहुत अच्छा! अब बताइए — यह आपका पहला बच्चा है या दूसरा?',
    expectedUserInputs: ['पहला', 'दूसरा', 'first', 'second'],
    showButtons: [
      { label: 'पहला', value: 'पहला' },
      { label: 'दूसरा', value: 'दूसरा' },
    ],
    nextOnYes: 3, // "पहला" or "दूसरा" both proceed
    nextOnNo: 7,
  },
  {
    phase: 'question_3',
    assistantResponse: 'ठीक है। अब एक और सवाल — क्या आपका बैंक में या पोस्ट ऑफिस में खाता है?',
    expectedUserInputs: ['हाँ', 'जी हाँ', 'हां', 'yes'],
    showButtons: [
      { label: 'हाँ', value: 'हाँ' },
      { label: 'नहीं', value: 'नहीं' },
    ],
    nextOnYes: 4,
    nextOnNo: 8,
  },
  {
    phase: 'eligibility',
    assistantResponse: 'आपकी बताई जानकारी के अनुसार आप इस योजना के लिए पात्र हो सकती हैं। पहले बच्चे के लिए ₹5,000 दो किस्तों में मिलते हैं। अंतिम पुष्टि संबंधित केंद्र करेगा। अब मैं आपको बताती हूँ कि आपको कौन से कागज़ात चाहिए।',
    nextStep: 5,
  },
  {
    phase: 'documents',
    assistantResponse: 'आपको तीन कागज़ात चाहिए। पहला — पहचान पत्र, जैसे कि आधार कार्ड। दूसरा — माँ और बच्चे का स्वास्थ्य कार्ड जो अस्पताल या आंगनवाड़ी से मिलता है। और तीसरा — बैंक या डाकघर की पासबुक। अब बताती हूँ कि आपको कहाँ जाना है।',
    nextStep: 9,
  },
  {
    phase: 'not_eligible_pregnant',
    assistantResponse: 'कोई बात नहीं। यह योजना गर्भवती महिलाओं और नई माताओं के लिए है। अगर भविष्य में ज़रूरत हो तो आंगनवाड़ी केंद्र पर जाकर जानकारी ले सकती हैं। हेल्पलाइन नंबर 1515 है।',
    nextStep: 10,
  },
  {
    phase: 'not_eligible_child_order',
    assistantResponse: 'यह योजना पहले और दूसरे बच्चे के लिए है। दूसरे बच्चे पर लाभ सिर्फ़ बेटी होने पर मिलता है। ज़्यादा जानकारी के लिए आंगनवाड़ी केंद्र या हेल्पलाइन 1515 पर संपर्क करें।',
    nextStep: 10,
  },
  {
    phase: 'no_bank_account',
    assistantResponse: 'कोई बात नहीं! पहले आपको बैंक या डाकघर में खाता खुलवाना होगा। आंगनवाड़ी कार्यकर्ता खाता खुलवाने में मदद कर सकती हैं। खाता खुलने के बाद आप इस योजना के लिए आवेदन कर सकती हैं।',
    nextStep: 9,
  },
  {
    phase: 'where_to_go',
    assistantResponse: 'आपको अपने नज़दीकी आंगनवाड़ी केंद्र जाना है। वहाँ की कार्यकर्ता आपकी मदद करेंगी। अगर कोई और सवाल हो तो हेल्पलाइन नंबर 1515 पर सुबह 9 बजे से शाम 6 बजे तक फ़ोन कर सकती हैं।',
    nextStep: 10,
  },
  {
    phase: 'closing',
    assistantResponse: 'मुझे खुशी हुई कि मैं आपकी मदद कर सकी। याद रखिए — आंगनवाड़ी केंद्र जाइए और ये तीन कागज़ात साथ ले जाइए। आपकी जानकारी इस बातचीत के बाद सेव नहीं की जाती। शुभकामनाएँ!',
    nextStep: -1,
  },
];

/**
 * Find the next step based on user input in demo mode
 */
export function getNextDemoStep(currentStepIndex: number, userInput: string): number {
  const step = DEMO_FLOW[currentStepIndex];
  if (!step) return -1;
  
  if (step.nextStep !== undefined) {
    return step.nextStep;
  }

  const input = userInput.toLowerCase().trim();
  
  // Check for yes/positive responses
  const yesPatterns = ['हाँ', 'हां', 'जी', 'जी हाँ', 'yes', 'ha', 'haan', 'ji'];
  const noPatterns = ['नहीं', 'ना', 'no', 'nahi', 'naa'];
  
  const isYes = yesPatterns.some(p => input.includes(p));
  const isNo = noPatterns.some(p => input.includes(p));

  // For question 2, check specific answers
  if (step.phase === 'question_2') {
    const firstPatterns = ['पहला', 'पहली', 'first', 'pehla', 'pehli', '1'];
    const secondPatterns = ['दूसरा', 'दूसरी', 'second', 'doosra', 'doosri', '2'];
    const thirdPatterns = ['तीसरा', 'तीसरी', 'third', 'teesra', '3', 'ज़्यादा', 'zyada'];
    
    if (firstPatterns.some(p => input.includes(p)) || secondPatterns.some(p => input.includes(p))) {
      return step.nextOnYes ?? currentStepIndex + 1;
    }
    if (thirdPatterns.some(p => input.includes(p))) {
      return step.nextOnNo ?? 7;
    }
    // Default: proceed (assume first)
    return step.nextOnYes ?? currentStepIndex + 1;
  }
  
  if (isYes && step.nextOnYes !== undefined) {
    return step.nextOnYes;
  }
  if (isNo && step.nextOnNo !== undefined) {
    return step.nextOnNo;
  }
  
  // Default: proceed to next
  return step.nextOnYes ?? currentStepIndex + 1;
}
