export interface SchemeItem {
  id: string;
  name: string;
  shortName: string;
  ministry: string;
  benefitBadge: string;
  benefitAmount?: string;
  installments?: string;
  beneficiaryType?: string;
  paymentMethod?: string;
  category: 'maternity' | 'children' | 'pension' | 'skills' | 'farmers';
  description: string;
  tags: string[];
  beneficiaryCount: string;
  ageLimit: string;
  audioDuration: string;
  audioUrl?: string;
  documents: {
    id: string;
    name: string;
    description: string;
    required: boolean;
    ready: boolean;
  }[];
  eligibilityText: string;
  whereToApply: string;
  helpline: string;
}

export interface UserProfile {
  name: string;
  englishName: string;
  citizenId: string;
  avatar: string;
  age: number;
  village: string;
  district: string;
  state: string;
  familyMembers: number;
  verifications: {
    aadhaar: boolean;
    rationCard: string;
    dbtBank: string;
  };
  activeTrackers: {
    id: string;
    schemeName: string;
    ministry: string;
    applicationNo: string;
    currentStage: string;
    percentage: number;
    installmentNotice: string;
    amountExpected: string;
    ashaWorkerName: string;
    ashaPhone: string;
    stages: {
      name: string;
      completed: boolean;
      current: boolean;
    }[];
  }[];
  activeBenefits: {
    id: string;
    schemeName: string;
    benefitDescription: string;
    badge: string;
  }[];
  recommendedSchemes: {
    id: string;
    schemeName: string;
    targetFor: string;
    description: string;
    rate: string;
    matchPercent: number;
  }[];
  voiceSettings: {
    language: string;
    speed: 'slow' | 'normal' | 'fast';
    block: string;
  };
  documents: {
    id: string;
    name: string;
    subtitle: string;
    verified: boolean;
  }[];
  voiceHistory: {
    id: string;
    time: string;
    query: string;
    answer: string;
    status: string;
  }[];
}

export const SCHEMES_DATA: SchemeItem[] = [
  {
    id: 'pmmvy',
    name: 'प्रधानमंत्री मातृ वंदना योजना (PMMVY)',
    shortName: 'मातृ वंदना योजना',
    ministry: 'महिला एवं बाल विकास मंत्रालय',
    benefitBadge: '₹5,000 प्रत्यक्ष लाभ (DBT)',
    benefitAmount: '₹5,000 नकद',
    installments: '2 किस्तों में',
    beneficiaryType: 'गर्भवती / धात्री',
    paymentMethod: 'DBT बैंक खाता',
    category: 'maternity',
    description: 'गर्भवती महिलाओं एवं स्तनपान कराने वाली माताओं के बेहतर पोषण और स्वास्थ्य जांच हेतु 3 किस्तों में प्रत्यक्ष बैंक खाता सहायता।',
    tags: ['आधार अनिवार्य', 'सीधा बैंक खाता', 'आंगनवाड़ी केंद्र'],
    beneficiaryCount: '3.24 करोड़+ लाभान्वित',
    ageLimit: 'उम्र: 19 वर्ष से अधिक',
    audioDuration: '1:40',
    eligibilityText: 'प्राथमिक पात्रता योग्य! आपकी वर्तमान जानकारी के अनुसार आप सीधे निकटतम केंद्र से आवेदन कर सकती हैं।',
    whereToApply: 'नजदीकी आंगनवाड़ी केंद्र या प्राथमिक स्वास्थ्य केंद्र (PHC)',
    helpline: '181',
    documents: [
      {
        id: 'doc-1',
        name: 'पहचान का कागज (Aadhaar / Voter ID)',
        description: 'माता व पिता का आधार कार्ड अनिवार्य',
        required: true,
        ready: true
      },
      {
        id: 'doc-2',
        name: 'बैंक या डाकघर पासबुक (Passbook)',
        description: 'महिला के नाम से आधार-लिंक्ड बैंक खाता',
        required: true,
        ready: true
      },
      {
        id: 'doc-3',
        name: 'माँ और बच्चे का सुरक्षा कार्ड (MCP Card)',
        description: 'आंगनवाड़ी अथवा सरकारी अस्पताल से जारी कार्ड',
        required: true,
        ready: false
      },
      {
        id: 'doc-4',
        name: 'पासपोर्ट फोटो व सक्रिय मोबाइल नंबर',
        description: 'ओटीपी और स्थिति संदेश प्राप्त करने हेतु',
        required: true,
        ready: false
      }
    ]
  },
  {
    id: 'pmuy',
    name: 'प्रधानमंत्री उज्ज्वला योजना 2.0 (PMUY)',
    shortName: 'उज्ज्वला योजना 2.0',
    ministry: 'पेट्रोलियम मंत्रालय',
    benefitBadge: 'मुफ़्त एलपीजी कनेक्शन',
    benefitAmount: 'निःशुल्क गैस कनेक्शन + चूल्हा',
    installments: 'एकमुश्त',
    beneficiaryType: 'गरीब परिवार की महिला मुखिया',
    paymentMethod: 'गैस एजेंसी द्वारा वितरण',
    category: 'maternity',
    description: 'गरीब परिवारों की वयस्क महिलाओं के नाम पर मुफ्त एलपीजी गैस कनेक्शन, एक भरा हुआ सिलेंडर तथा चूल्हा प्रदान किया जाता है।',
    tags: ['राशन कार्ड आवश्यक', '18+ महिला मुखिया'],
    beneficiaryCount: '10.3 करोड़+ लाभान्वित',
    ageLimit: '18 वर्ष से अधिक',
    audioDuration: '1:15',
    eligibilityText: 'बीपीएल राशन कार्ड धारक परिवार की वयस्क महिला पात्र हैं।',
    whereToApply: 'निकटतम एलपीजी गैस एजेंसी (Indane / BharatGas / HP)',
    helpline: '1906',
    documents: [
      {
        id: 'doc-pmuy-1',
        name: 'राशन कार्ड (BPL/Antyodaya)',
        description: 'परिवार के सभी सदस्यों के नाम सहित राशन कार्ड',
        required: true,
        ready: true
      },
      {
        id: 'doc-pmuy-2',
        name: 'आधार कार्ड',
        description: 'महिला मुखिया एवं 18 वर्ष से अधिक सदस्यों का आधार',
        required: true,
        ready: true
      },
      {
        id: 'doc-pmuy-3',
        name: 'बैंक पासबुक',
        description: 'सब्सिडी जमा हेतु आधार लिंक्ड बैंक खाता',
        required: true,
        ready: true
      }
    ]
  },
  {
    id: 'ssy',
    name: 'सुकन्या समृद्धि योजना (SSY)',
    shortName: 'सुकन्या समृद्धि योजना',
    ministry: 'डाक विभाग / वित्त मंत्रालय',
    benefitBadge: '8.2% वार्षिक ब्याज दर',
    benefitAmount: 'उच्च ब्याज + कर मुक्त बचत',
    installments: 'मासिक / वार्षिक जमा',
    beneficiaryType: '0 से 10 वर्ष की बालिका',
    paymentMethod: 'डाकघर / बैंक बचत खाता',
    category: 'children',
    description: 'बेटियों के उच्च शिक्षा व विवाह हेतु उच्च ब्याज दर युक्त बचत खाता। ₹250 से खाता प्रारंभ व पूर्ण आयकर छूट।',
    tags: ['0 से 10 वर्ष की बालिका', 'डाकघर/बैंक'],
    beneficiaryCount: '3.6 करोड़+ खाते',
    ageLimit: '0 से 10 वर्ष (बेटी की उम्र)',
    audioDuration: '1:30',
    eligibilityText: '10 वर्ष तक की बालिका के माता-पिता या कानूनी अभिभावक खाता खुलवा सकते हैं।',
    whereToApply: 'निकटतम डाकघर (Post Office) या अधिकृत राष्ट्रीयकृत बैंक',
    helpline: '1800-266-6868',
    documents: [
      {
        id: 'doc-ssy-1',
        name: 'बालिका का जन्म प्रमाण पत्र (Birth Certificate)',
        description: 'नगर निगम या अस्पताल द्वारा जारी प्रमाण पत्र',
        required: true,
        ready: true
      },
      {
        id: 'doc-ssy-2',
        name: 'अभिभावक का पहचान पत्र (Aadhaar/PAN)',
        description: 'माता या पिता का पहचान पत्र',
        required: true,
        ready: true
      },
      {
        id: 'doc-ssy-3',
        name: 'निवास प्रमाण पत्र',
        description: 'राशन कार्ड / बिजली बिल / वोटर आईडी',
        required: true,
        ready: true
      }
    ]
  },
  {
    id: 'mssc',
    name: 'महिला सम्मान बचत प्रमाण पत्र (MSSC)',
    shortName: 'महिला सम्मान बचत पत्र',
    ministry: 'लघु बचत योजना / वित्त मंत्रालय',
    benefitBadge: '7.5% निश्चित ब्याज',
    benefitAmount: 'अधिकतम ₹2 लाख तक जमा',
    installments: '2 वर्ष की अवधि',
    beneficiaryType: 'महिला एवं बालिकाएं',
    paymentMethod: 'बैंक / डाकघर द्वारा परिपक्वता भुगतान',
    category: 'skills',
    description: 'महिलाओं व बालिकाओं के लिए 2 वर्ष की अवधि का सुरक्षित निश्चित आय निवेश। अधिकतम ₹2 लाख तक जमा।',
    tags: ['2 वर्ष की अवधि', 'आंशिक निकासी सुविधा'],
    beneficiaryCount: '50 लाख+ महिलाएं',
    ageLimit: 'सभी आयु वर्ग की महिलाएं',
    audioDuration: '1:10',
    eligibilityText: 'कोई भी भारतीय महिला अपने नाम से या बालिका के नाम से खाता खोल सकती है।',
    whereToApply: 'भारतीय डाकघर या किसी भी अधिकृत सरकारी बैंक में',
    helpline: '1800-11-2018',
    documents: [
      {
        id: 'doc-mssc-1',
        name: 'आधार कार्ड',
        description: 'पहचान और पते का प्रमाण',
        required: true,
        ready: true
      },
      {
        id: 'doc-mssc-2',
        name: 'पैन कार्ड (PAN Card)',
        description: 'केवाईसी सत्यापन हेतु',
        required: false,
        ready: true
      },
      {
        id: 'doc-mssc-3',
        name: 'पासपोर्ट आकार फोटो',
        description: '2 रंगीन नवीन फोटो',
        required: true,
        ready: true
      }
    ]
  },
  {
    id: 'pm-kisan',
    name: 'प्रधानमंत्री किसान सम्मान निधि (PM-KISAN)',
    shortName: 'पीएम किसान सम्मान निधि',
    ministry: 'कृषि एवं किसान कल्याण मंत्रालय',
    benefitBadge: '₹6,000 प्रति वर्ष (DBT)',
    benefitAmount: '₹2,000 की 3 समान किस्तें',
    installments: 'हर 4 महीने पर ₹2,000',
    beneficiaryType: 'भूमिधारक किसान परिवार',
    paymentMethod: 'सीधे बैंक खाते में DBT',
    category: 'farmers',
    description: 'देश के छोटे और सीमांत कृषक परिवारों को सुनिश्चित आय सहायता प्रदान करने हेतु प्रति वर्ष ₹6,000 का सीधा लाभ।',
    tags: ['eKYC अनिवार्य', 'खतौनी नकल', 'DBT बैंक'],
    beneficiaryCount: '11 करोड़+ किसान',
    ageLimit: '18 वर्ष से अधिक',
    audioDuration: '1:20',
    eligibilityText: 'कृषि योग्य भूमि के स्वामी छोटे एवं सीमांत किसान परिवार पात्र हैं।',
    whereToApply: 'CSC जन सेवा केंद्र या कृषि विभाग कार्यालय',
    helpline: '155261 / 011-24300606',
    documents: [
      {
        id: 'doc-kisan-1',
        name: 'आधार कार्ड',
        description: 'e-KYC और आधार सीडिंग अनिवार्य',
        required: true,
        ready: true
      },
      {
        id: 'doc-kisan-2',
        name: 'भूमि खतौनी / जमाबंदी नकल',
        description: 'किसान के नाम भूमि का आधिकारिक रिकॉर्ड',
        required: true,
        ready: true
      },
      {
        id: 'doc-kisan-3',
        name: 'बैंक पासबुक',
        description: 'आधार से लिंक व NPCI एक्टिवेट बैंक खाता',
        required: true,
        ready: true
      }
    ]
  },
  {
    id: 'pm-jay',
    name: 'आयुष्मान भारत (PM-JAY)',
    shortName: 'आयुष्मान कार्ड',
    ministry: 'स्वास्थ्य एवं परिवार कल्याण मंत्रालय',
    benefitBadge: '₹5 लाख तक निःशुल्क इलाज',
    benefitAmount: 'प्रति परिवार प्रति वर्ष ₹5 लाख',
    installments: 'कैशलेस अस्पताल सेवा',
    beneficiaryType: 'SECC 2011 सूचीबद्ध / बीपीएल परिवार',
    paymentMethod: 'अस्पताल में सीधे कैशलेस उपचार',
    category: 'pension',
    description: 'गरीब और कमजोर परिवारों को गंभीर बीमारियों के इलाज हेतु सरकारी एवं सूचीबद्ध निजी अस्पतालों में ₹5 लाख तक का मुफ्त इलाज।',
    tags: ['गोल्डन कार्ड', 'कैशलेस इलाज', 'पूरे भारत में मान्य'],
    beneficiaryCount: '30 करोड़+ कार्ड धारक',
    ageLimit: 'सभी आयु वर्ग',
    audioDuration: '1:35',
    eligibilityText: 'सामाजिक-आर्थिक जाति जनगणना (SECC) या राज्य के बीपीएल राशन कार्ड धारक।',
    whereToApply: 'सरकारी अस्पताल में आयुष्मान मित्र केंद्र या नजदीकी CSC केंद्र',
    helpline: '14555',
    documents: [
      {
        id: 'doc-jay-1',
        name: 'राशन कार्ड (पात्र गृहस्थी या अंत्योदय)',
        description: 'परिवार के सभी सदस्यों का नाम दर्ज होना चाहिए',
        required: true,
        ready: true
      },
      {
        id: 'doc-jay-2',
        name: 'आधार कार्ड',
        description: 'बायोमेट्रिक प्रमाणीकरण हेतु',
        required: true,
        ready: true
      }
    ]
  }
];

export const MOCK_USER: UserProfile = {
  name: 'सुनीता देवी',
  englishName: 'Sunita Devi',
  citizenId: '#UP-78421',
  avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=250',
  age: 28,
  village: 'परसेंडी',
  district: 'सीतापुर',
  state: 'उत्तर प्रदेश',
  familyMembers: 3,
  verifications: {
    aadhaar: true,
    rationCard: 'NFSA/BPL',
    dbtBank: 'PNB (...7309)'
  },
  activeTrackers: [
    {
      id: 'pmmvy-track-1',
      schemeName: 'प्रधानमंत्री मातृ वंदना योजना (PMMVY)',
      ministry: 'महिला एवं बाल विकास मंत्रालय',
      applicationNo: '#UP-MMVY-9042',
      currentStage: 'आंगनवाड़ी सुपरवाइजर सत्यापन',
      percentage: 75,
      installmentNotice: 'किस्त 2 प्रतीक्षित',
      amountExpected: '₹2,000 बैंक ट्रांसफर',
      ashaWorkerName: 'माया देवी',
      ashaPhone: '9839XXXXXX',
      stages: [
        { name: 'आवेदन दर्ज', completed: true, current: false },
        { name: 'दस्तावेज़ मान्य', completed: true, current: false },
        { name: 'आँगनवाड़ी जांच', completed: true, current: true },
        { name: '₹2,000 बैंक ट्रांसफर', completed: false, current: false }
      ]
    }
  ],
  activeBenefits: [
    {
      id: 'benefit-1',
      schemeName: 'प्रधानमंत्री उज्ज्वला योजना 2.0',
      benefitDescription: 'मुफ्त गैस कनेक्शन प्राप्त • सब्सिडी सक्रिय',
      badge: 'रिफिल उपलब्ध'
    },
    {
      id: 'benefit-2',
      schemeName: 'आयुष्मान भारत (PM-JAY कार्ड)',
      benefitDescription: 'प्रति वर्ष ₹5 लाख तक का निःशुल्क इलाज उपलब्ध',
      badge: 'कार्ड सक्रिय'
    }
  ],
  recommendedSchemes: [
    {
      id: 'ssy-rec',
      schemeName: 'सुकन्या समृद्धि योजना',
      targetFor: '1 वर्ष की बेटी हेतु',
      description: 'बेटी की शिक्षा और सुरक्षित भविष्य के लिए 8.2% ब्याज दर। मात्र ₹250 से शुरुआत करें।',
      rate: '8.2% ब्याज दर',
      matchPercent: 100
    }
  ],
  voiceSettings: {
    language: 'हिन्दी (अवधी मिश्रित)',
    speed: 'normal',
    block: 'उत्तर प्रदेश > सीतापुर > हरगांव'
  },
  documents: [
    {
      id: 'doc-aadhaar',
      name: 'पहचान प्रमाण (आधार कार्ड)',
      subtitle: 'XXXX-XXXX-4912 • सत्यापित',
      verified: true
    },
    {
      id: 'doc-mcp',
      name: 'माँ-बच्चा सुरक्षा कार्ड (MCP)',
      subtitle: 'टीकाकरण रिकॉर्ड अपडेटेड',
      verified: true
    },
    {
      id: 'doc-passbook',
      name: 'बैंक पासबुक (DBT सक्रिय)',
      subtitle: 'PNB • खा: ...7309 (सीडेड)',
      verified: true
    },
    {
      id: 'doc-income',
      name: 'तहसील आय प्रमाण पत्र',
      subtitle: 'वार्षिक: ₹48,000 (वैध: मार्च 2026)',
      verified: true
    }
  ],
  voiceHistory: [
    {
      id: 'hist-1',
      time: 'कल, शाम 4:20 बजे',
      query: 'मातृ वंदना का दूसरा पैसा कब तक खाते में आएगा?',
      answer: 'Naari AI: आपका आवेदन आँगनवाड़ी सत्यापन पर है, 7 दिनों में राशि अंतरित होगी।',
      status: 'समाधान मिला'
    },
    {
      id: 'hist-2',
      time: '12 मई 2025',
      query: 'उज्ज्वला सिलेंडर रिफिल सब्सिडी कैसे चेक करें?',
      answer: 'Naari AI: बैंक खाते में ₹312 की सब्सिडी 8 मई को जमा कर दी गई है।',
      status: 'समाधान मिला'
    }
  ]
};

export const TESTIMONIALS = [
  {
    id: 'test-1',
    name: 'सुनीता देवी',
    location: 'सीतापुर',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400',
    quote: 'मैंने केवल बोलकर पूछा था और Naari AI ने मुझे मातृ वंदना के ₹5,000 सीधे मेरे आधार खाते में पाने का रास्ता बता दिया।',
    tag: '✓ सफलतापूर्वक ₹5,000 प्राप्त',
    tagColor: 'green'
  },
  {
    id: 'test-2',
    name: 'आंगनवाड़ी केंद्र',
    location: 'लखनऊ',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400',
    quote: 'नागरिकों को अब लंबी कतारों में नहीं लगना पड़ता। केंद्र पर आने से पहले ही उन्हें पता होता है कि कौन सा फॉर्म चाहिए।',
    tag: '🛡️ सत्यापित सहायता केंद्र',
    tagColor: 'blue'
  },
  {
    id: 'test-3',
    name: 'रामेश्वर वर्मा',
    location: 'बाराबंकी',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=400',
    quote: 'पीएम किसान सम्मान निधि की 16वीं किस्त का स्टेटस मैंने अपनी स्थानीय बोली में सुनकर 2 मिनट में जान लिया।',
    tag: '✓ किसान सम्मान निधि लाभार्थी',
    tagColor: 'green'
  }
];

export const FAQS = [
  {
    id: 'faq-1',
    question: 'खाते में DBT की किस्त नहीं आई तो क्या करें?',
    answer: 'यदि आपकी किस्त नहीं आई है, तो सबसे पहले बैंक शाखा जाकर जांचें कि आपका आधार NPCI से लिंक (Seeded) है या नहीं। यदि आधार लिंक है, तो अपने आवेदन की स्थिति (Status) Naari AI पर जांचें या टोल-फ्री नंबर 14447 पर कॉल करें।'
  },
  {
    id: 'faq-2',
    question: 'राशन कार्ड में नए बच्चे का नाम कैसे जुड़वाएं?',
    answer: 'बच्चे का नाम जुड़वाने के लिए बच्चे का जन्म प्रमाण पत्र तथा माता-पिता का आधार कार्ड लेकर नजदीकी राशन डीलर या खाद्य आपूर्ति विभाग के जन सेवा केंद्र (CSC) पर आवेदन करें। Naari AI आपको आवश्यक फॉर्म का प्रारूप बता सकती है।'
  },
  {
    id: 'faq-3',
    question: 'आधार में मोबाइल नंबर कैसे बदलें?',
    answer: 'आधार में मोबाइल नंबर बदलने के लिए किसी दस्तावेज की जरूरत नहीं होती। आप नजदीकी डाकघर (Post Office) या आधार सेवा केंद्र जाकर बायोमेट्रिक (अंगूठा) लगाकर ₹50 शुल्क में नंबर अपडेट करा सकती हैं।'
  },
  {
    id: 'faq-4',
    question: 'मातृत्व वंदना (PMMVY) का लाभ कब मिलता है?',
    answer: 'प्रथम किस्त गर्भावस्था के पंजीकरण और कम से कम एक प्रसव पूर्व जांच (ANC) पर मिलती है। दूसरी किस्त बच्चे के जन्म पंजीकरण और प्राथमिक टीकाकरण (BCG, OPV, DPT) पूरा होने पर सीधे बैंक खाते में जमा होती है।'
  },
  {
    id: 'faq-5',
    question: 'आयुष्मान कार्ड में ₹5 लाख का मुफ्त इलाज कैसे लें?',
    answer: 'किसी भी सरकारी या सूचीबद्ध निजी अस्पताल में आयुष्मान मित्र काउंटर पर अपना आधार कार्ड और राशन कार्ड दिखाएं। वहां तुरंत गोल्डन कार्ड से पहचान सत्यापित कर कैशलेस उपचार शुरू कर दिया जाता है।'
  }
];
