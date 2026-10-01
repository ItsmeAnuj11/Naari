const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
}

// 1. Rename "Disha" to "Naari AI"
walkDir('./src', function(filePath) {
  if (filePath.endsWith('.tsx') || filePath.endsWith('.ts')) {
    let content = fs.readFileSync(filePath, 'utf8');
    let newContent = content.replace(/Disha/g, 'Naari AI');
    if (content !== newContent) {
      fs.writeFileSync(filePath, newContent, 'utf8');
    }
  }
});

// 2. Fix ProfileView.tsx
const profileFile = './src/components/ProfileView.tsx';
let profileContent = fs.readFileSync(profileFile, 'utf8');

// The replacement for ProfileView
const targetContent = `  const [name, setName] = useState('Vikash Kumar');
  const [email, setEmail] = useState('vikashkumar@example.com');
  const [phone, setPhone] = useState('+91 9876543210');`;

const replacementContent = `  const [name, setName] = useState('Vikash Kumar');
  const [email, setEmail] = useState('vikashkumar@example.com');
  const [phone, setPhone] = useState('+91 9876543210');

  useEffect(() => {
    const savedName = localStorage.getItem('disha_user_name');
    const savedContact = localStorage.getItem('disha_user_contact');
    if (savedName) setName(savedName);
    if (savedContact) {
      if (savedContact.includes('@')) setEmail(savedContact);
      else setPhone(savedContact);
    }
  }, []);`;

if (profileContent.includes(targetContent) && !profileContent.includes('localStorage.getItem')) {
  profileContent = profileContent.replace(targetContent, replacementContent);
  fs.writeFileSync(profileFile, profileContent, 'utf8');
}
