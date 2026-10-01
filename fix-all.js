const fs = require('fs');

// Read and fix i18n.tsx
let content = fs.readFileSync('src/lib/i18n.tsx', 'utf8');

// The problem: line 27 starts with "  , " which means the closing } and comma were already there
// We need to merge the extra keys INTO the en: {} block
// Pattern: readMore: '...',\n  , "key": "val"...},\n  awa: {
// Should become: readMore: '...', "key": "val"...},\n  awa: {

// Step 1: Fix the en: block - remove the broken "  , " separator
content = content.replace(/readMore: '([^']+)',\n  , "सरकारी योजनाओं/g, `readMore: '$1',\n    "सरकारी योजनाओं`);

// Also fix other locales: awa, bho, te - same issue
content = content.replace(/\n  , "सरकारी योजनाओं तक आपकी आसान साथी": "Your easy guide/g, '\n    "सरकारी योजनाओं तक आपकी आसान साथी": "Your easy guide');

// Fix all cases where there's "\n  , " pattern followed by a quoted key
content = content.replace(/,\n  , "/g, ',\n    "');
content = content.replace(/,\n  , '/g, ",\n    '");

fs.writeFileSync('src/lib/i18n.tsx', content, 'utf8');
console.log('Fixed i18n.tsx');

// Fix ProfileView.tsx - label=t('x') -> label={t('x')}
let pv = fs.readFileSync('src/components/ProfileView.tsx', 'utf8');
// Fix patterns like: label=t('x') value= -> label={t('x')} value=
pv = pv.replace(/label=t\('([^']+)'\)\s*(value=|onClick=|sub=|\/)/g, "label={t('$1')} $2");
// Also fix if any remaining label=t(
pv = pv.replace(/label=t\('([^']+)'\)/g, "label={t('$1')}");
fs.writeFileSync('src/components/ProfileView.tsx', pv, 'utf8');
console.log('Fixed ProfileView.tsx');

// Fix Sidebar.tsx - aria-label=t() -> aria-label={}
let sb = fs.readFileSync('src/components/Sidebar.tsx', 'utf8');
sb = sb.replace(/aria-label=t\('([^']+)'\)/g, "aria-label={t('$1')}");
fs.writeFileSync('src/components/Sidebar.tsx', sb, 'utf8');
console.log('Fixed Sidebar.tsx');

// Fix TopHeader.tsx - placeholder=t() -> placeholder={}
let th = fs.readFileSync('src/components/TopHeader.tsx', 'utf8');
th = th.replace(/placeholder=t\('([^']+)'\)/g, "placeholder={t('$1')}");
fs.writeFileSync('src/components/TopHeader.tsx', th, 'utf8');
console.log('Fixed TopHeader.tsx');

// Fix HelpView.tsx
let hw = fs.readFileSync('src/components/HelpView.tsx', 'utf8');
// question: '{t('...')} text' -> question: t('...') + ' text'
hw = hw.replace(/question: '\{t\('([^']+)'\)\} ([^']+)'/g, "question: t('$1') + ' $2'");
fs.writeFileSync('src/components/HelpView.tsx', hw, 'utf8');
console.log('Fixed HelpView.tsx');
