const fs = require('fs');

// 1. Fix HelpView.tsx
let hw = fs.readFileSync('src/components/HelpView.tsx', 'utf8');
hw = hw.replace(/question: '\{t\('महिला हेल्पलाइन'\)\} नंबर क्या है\?'/, "question: t('महिला हेल्पलाइन') + ' नंबर क्या है?'");
fs.writeFileSync('src/components/HelpView.tsx', hw);

// 2. Fix ProfileView.tsx
let pv = fs.readFileSync('src/components/ProfileView.tsx', 'utf8');
pv = pv.replace(/label=t\(/g, "label={t(").replace(/'\)\s*value=/g, "')} value=").replace(/'\)\s*onClick=/g, "')} onClick=");
fs.writeFileSync('src/components/ProfileView.tsx', pv);

// 3. Fix Sidebar.tsx
let sb = fs.readFileSync('src/components/Sidebar.tsx', 'utf8');
sb = sb.replace(/aria-label=t\('मुख्य नेविगेशन'\)/, "aria-label={t('मुख्य नेविगेशन')}");
fs.writeFileSync('src/components/Sidebar.tsx', sb);

// 4. Fix TopHeader.tsx
let th = fs.readFileSync('src/components/TopHeader.tsx', 'utf8');
th = th.replace(/placeholder=t\('([^']+)'\)/, "placeholder={t('$1')}");
fs.writeFileSync('src/components/TopHeader.tsx', th);

// 5. Fix i18n.tsx
let i18n = fs.readFileSync('src/lib/i18n.tsx', 'utf8');
// "readMore: 'Browse more official schemes on myScheme',\n  , "सरकारी..."
i18n = i18n.replace(/readMore: '[^']+'(\s*)\}\s*,\s*,\s*"सरकारी योजनाओं/g, "readMore: 'Browse more official schemes on myScheme', \"सरकारी योजनाओं");
i18n = i18n.replace(/\},\s*\n\s*,\s*"सरकारी योजनाओं/g, ', "सरकारी योजनाओं');
fs.writeFileSync('src/lib/i18n.tsx', i18n);

console.log('Fixed');
