const fs = require('fs');
let code = fs.readFileSync('src/components/HomeView.tsx', 'utf8');

// Replace the global quickQuestions
code = code.replace(/const quickQuestions = \[[\s\S]*?\];\n/, '');

// Add quickQuestions inside the component
code = code.replace(/const ask = \(prompt: string\) => \{\n\s*speak\(prompt\);\n\s*\};\n/, 
  `const ask = (prompt: string) => { speak(prompt); };\n  const quickQuestions = [\n    { title: t('गर्भावस्था के लिए कोई योजना'), subtitle: t('जैसे PM Matru Vandana Yojana'), icon: Baby, tone: 'pink', prompt: 'गर्भावस्था में कौन सी सरकारी सहायता मिलती है?' },\n    { title: t('लड़कियों की पढ़ाई के लिए योजना'), subtitle: t('जैसे Sukanya Samriddhi Yojana'), icon: GraduationCap, tone: 'green', prompt: 'लड़कियों की पढ़ाई के लिए कौन सी योजनाएँ हैं?' },\n    { title: t('रसोई गैस के लिए योजना'), subtitle: t('जैसे Ujjwala Yojana'), icon: Flame, tone: 'orange', prompt: 'उज्ज्वला योजना के बारे में बताइए' },\n    { title: 'महिलाओं के लिए अन्य योजनाएँ', subtitle: t('जैसे पेंशन, स्वरोजगार, कौशल विकास'), icon: Users, tone: 'purple', prompt: 'महिलाओं के लिए उपलब्ध सरकारी योजनाएँ बताइए' },\n  ];\n`);

fs.writeFileSync('src/components/HomeView.tsx', code, 'utf8');
