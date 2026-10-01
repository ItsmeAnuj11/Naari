const fs = require('fs');

const i18nFile = './src/lib/i18n.tsx';
let content = fs.readFileSync(i18nFile, 'utf8');
content = content.replace(/Naari AI AI/g, 'Naari AI');
fs.writeFileSync(i18nFile, content, 'utf8');

const profileFile = './src/components/ProfileView.tsx';
let profileContent = fs.readFileSync(profileFile, 'utf8');
profileContent = profileContent.replace(/support@disha\.gov\.in/g, 'support@naari.gov.in');
fs.writeFileSync(profileFile, profileContent, 'utf8');
