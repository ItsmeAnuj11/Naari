'use client';

import React, { useState } from 'react';
import { UserRound, UsersRound, FileText, ShieldCheck, CalendarDays, Pencil, Mail, Phone, MapPin, Languages, Settings, Volume2, Bell, Moon, LockKeyhole, Eye, Trash2, Info, Star, MessageSquare, CircleHelp, ChevronRight, Plus, LogOut, Globe, Camera, Check, X } from 'lucide-react';
import type { NavTab } from './Sidebar';

type Props = { onNavigateTab: (tab: NavTab) => void; speak: (text: string) => void; isSpeaking: boolean };
type Family = { relation: string; name: string; gender: string };

export function ProfileView({ onNavigateTab, speak }: Props) {
  const [name, setName] = useState('Vikash Kumar');
  const [email, setEmail] = useState('vikashkumar@example.com');
  const [phone, setPhone] = useState('+91 9876543210');
  const [family, setFamily] = useState<Family[]>([{ relation: 'माँ', name: 'सीता देवी', gender: 'महिला' }, { relation: 'पिता', name: 'राम कुमार', gender: 'पुरुष' }, { relation: 'बहन', name: 'पूजा कुमारी', gender: 'महिला' }]);
  const [prefs, setPrefs] = useState({ voice: true, notifications: true, dark: false });
  const [uploaded, setUploaded] = useState<string[]>(['आधार कार्ड', 'बैंक खाता विवरण']);
  const [dialog, setDialog] = useState('');
  const [info, setInfo] = useState('');
  const [draft, setDraft] = useState({ name, email, phone, relation: '', member: '' });
  const toggle = (key: keyof typeof prefs) => setPrefs(p => ({ ...p, [key]: !p[key] }));
  const showInfo = (message: string) => { setInfo(message); setDialog('info'); };
  const IconBox = ({ children, tone = 'blue' }: { children: React.ReactNode; tone?: string }) => <span className={`profile-icon ${tone}`}>{children}</span>;
  const Row = ({ icon, label, value, onClick, sub }: { icon: React.ReactNode; label: string; value?: React.ReactNode; onClick?: () => void; sub?: string }) => <button className="profile-row" onClick={onClick}><span className="profile-row-icon">{icon}</span><span className="profile-row-copy"><b>{label}</b>{sub && <small>{sub}</small>}</span>{value && <span className="profile-row-value">{value}</span>}<ChevronRight size={17}/></button>;
  const SwitchRow = ({ icon, label, sub, keyName }: { icon: React.ReactNode; label: string; sub?: string; keyName: keyof typeof prefs }) => <button className="profile-row" onClick={() => toggle(keyName)}><span className="profile-row-icon">{icon}</span><span className="profile-row-copy"><b>{label}</b>{sub && <small>{sub}</small>}</span><span className={`profile-switch ${prefs[keyName] ? 'on' : ''}`}><i/></span></button>;
  const heading = (icon: React.ReactNode, title: string, subtitle: string, tone = 'blue') => <div className="profile-card-heading"><IconBox tone={tone}>{icon}</IconBox><span><b>{title}</b><small>{subtitle}</small></span></div>;

  return <div className="profile-page">
    <div className="profile-title"><h1>मेरा प्रोफ़ाइल</h1><p>अपनी जानकारी देखें, सेटिंग्स बदलें और अपने परिवार की जानकारी प्रबंधित करें।</p></div>
    <section className="profile-hero">
      <div className="profile-avatar">{name.split(' ').map(v => v[0]).slice(0,2).join('').toUpperCase()}</div>
      <div className="profile-identity"><div className="profile-name-line"><h2>{name}</h2><button className="profile-edit" onClick={() => { setDraft({ ...draft, name, email, phone }); setDialog('edit'); }}><Pencil size={15}/> प्रोफ़ाइल संपादित करें</button></div><p><Mail size={17}/>{email}</p><p><Phone size={17}/>{phone}</p></div>
      <div className="profile-hero-meta"><div className="profile-secure"><IconBox tone="green"><ShieldCheck size={23}/></IconBox><span><b>खाता सुरक्षित है</b><small>आपकी जानकारी सुरक्षित है</small></span></div><div className="profile-joined"><CalendarDays size={23}/><span><small>जुड़ने की तिथि</small><b>15 सितंबर 2025</b></span></div></div>
    </section>
    <div className="profile-grid">
      <section className="profile-card">{heading(<UserRound size={23}/>, 'व्यक्तिगत जानकारी', 'अपनी मूल जानकारी और संपर्क विवरण प्रबंधित करें', 'purple')}
        <Row icon={<UserRound/>} label="पूरा नाम" value={name} onClick={() => { setDraft({ ...draft, name, email, phone }); setDialog('edit'); }}/><Row icon={<Phone/>} label="फोन नंबर" value={phone} onClick={() => { setDraft({ ...draft, name, email, phone }); setDialog('edit'); }}/><Row icon={<Mail/>} label="ईमेल" value={email} onClick={() => { setDraft({ ...draft, name, email, phone }); setDialog('edit'); }}/><Row icon={<MapPin/>} label="पता" value="Chennai, Tamil Nadu" onClick={() => showInfo('पता अपडेट करने के लिए सहायता केंद्र से संपर्क करें।')}/><Row icon={<Languages/>} label="भाषा" value="हिंदी" onClick={() => showInfo('भाषा बदलने के लिए नीचे भाषा और प्राथमिकताएँ खोलें।')}/>
      </section>
      <section className="profile-card">{heading(<UsersRound size={23}/>, 'परिवार की जानकारी', 'अपने परिवार के सदस्यों की जानकारी जोड़ें', 'purple')}
        <div className="profile-family-list">{family.map((person, i) => <div className="profile-family-row" key={`${person.relation}-${i}`}><span className={`profile-family-avatar ${person.gender === 'महिला' ? 'rose' : 'blue'}`}>{person.name.slice(0,1)}</span><span className="profile-row-copy"><b>{person.relation}</b><small>{person.name}</small></span><em className={person.gender === 'महिला' ? 'rose' : 'blue'}>{person.gender}</em><ChevronRight size={17}/></div>)}</div>
        <button className="profile-wide-action" onClick={() => { setDraft({ ...draft, relation: '', member: '' }); setDialog('family'); }}><Plus size={18}/> नया सदस्य जोड़ें</button>
      </section>
      <section className="profile-card">{heading(<FileText size={23}/>, 'मेरे दस्तावेज़', 'आवश्यक दस्तावेज़ों की जानकारी और स्थिति देखें', 'blue')}
        {[['आधार कार्ड','Camera','orange'],['बैंक खाता विवरण','FileText','purple'],['आय प्रमाण पत्र','FileText','rose'],['निवास प्रमाण पत्र','MapPin','green']].map(([label, icon, tone]) => { const done = uploaded.includes(label); const I = icon === 'Camera' ? Camera : icon === 'MapPin' ? MapPin : FileText; return <Row key={label} icon={<I/>} label={label} value={<span className={`profile-status ${done ? 'done' : ''}`}>{done ? 'जोड़ दिया गया' : 'अपलोड करें'}</span>} onClick={() => done ? showInfo(`${label} आपके दस्तावेज़ों में सुरक्षित है।`) : setUploaded(v => [...v, label])}/>; })}
        <button className="profile-wide-action" onClick={() => showInfo('आपके सभी दस्तावेज़ और उनकी स्थिति यहाँ दिखाई देगी।')}><FileText size={16}/> सभी दस्तावेज़ देखें</button>
      </section>
      <section className="profile-card">{heading(<Settings size={23}/>, 'भाषा और प्राथमिकताएँ', 'ऐप की भाषा और अन्य प्राथमिकता सेटिंग्स', 'blue')}
        <Row icon={<Globe/>} label="भाषा" value="हिंदी" onClick={() => showInfo('उपलब्ध भाषाएँ: हिंदी, अंग्रेज़ी, भोजपुरी और अवधी।')}/><SwitchRow icon={<Volume2/>} label="आवाज़ सहायक" keyName="voice"/><SwitchRow icon={<Bell/>} label="सूचनाएँ" sub="नई योजनाओं और अपडेट की जानकारी" keyName="notifications"/><SwitchRow icon={<Moon/>} label="डार्क मोड" keyName="dark"/>
      </section>
      <section className="profile-card">{heading(<ShieldCheck size={23}/>, 'गोपनीयता और सुरक्षा', 'आपकी जानकारी हमारी प्राथमिकता है', 'green')}
        <Row icon={<LockKeyhole/>} label="पासवर्ड बदलें" onClick={() => showInfo('पासवर्ड बदलने के लिए आपके पंजीकृत मोबाइल नंबर पर सत्यापन भेजा जाएगा।')}/><Row icon={<ShieldCheck/>} label="दो-स्तरीय सुरक्षा (2FA)" value="बंद" onClick={() => showInfo('दो-स्तरीय सुरक्षा सेटिंग जल्द उपलब्ध होगी।')}/><Row icon={<Eye/>} label="डेटा गोपनीयता" onClick={() => showInfo('आपका व्यक्तिगत डेटा सुरक्षित रखा जाता है और केवल आपकी सहमति से साझा किया जाता है।')}/><Row icon={<Trash2/>} label="मेरा डेटा हटाएँ" onClick={() => showInfo('डेटा हटाने के अनुरोध के लिए सहायता केंद्र से संपर्क करें।')}/>
      </section>
      <section className="profile-card">{heading(<Info size={23}/>, 'ऐप के बारे में', 'ऐप की जानकारी और सहायता', 'blue')}
        <Row icon={<FileText/>} label="संस्करण" value="v1.0.0" onClick={() => showInfo('Disha ऐप संस्करण 1.0.0')}/><Row icon={<Star/>} label="हमें रेट करें" onClick={() => showInfo('Disha का उपयोग करने के लिए धन्यवाद!')}/><Row icon={<MessageSquare/>} label="फ़ीडबैक दें" onClick={() => showInfo('अपना सुझाव support@disha.gov.in पर भेजें।')}/><Row icon={<CircleHelp/>} label="सहायता केंद्र" onClick={() => onNavigateTab('help')}/><Row icon={<Info/>} label="नियम और शर्तें" onClick={() => showInfo('नियम और शर्तों की जानकारी सहायता केंद्र में उपलब्ध है।')}/>
      </section>
    </div>
    <button className="profile-logout" onClick={() => showInfo('आपका सत्र सुरक्षित रूप से समाप्त कर दिया जाएगा।')}><LogOut size={19}/> लॉग आउट करें</button>

    {dialog && <div className="profile-modal-backdrop" onMouseDown={e => { if (e.target === e.currentTarget) setDialog(''); }}><section className="profile-modal"><header><b>{dialog === 'edit' ? 'प्रोफ़ाइल संपादित करें' : dialog === 'family' ? 'परिवार का सदस्य जोड़ें' : 'जानकारी'}</b><button onClick={() => setDialog('')}><X size={19}/></button></header>
      {dialog === 'edit' ? <form onSubmit={e => { e.preventDefault(); setName(draft.name); setEmail(draft.email); setPhone(draft.phone); setDialog(''); speak('आपकी प्रोफ़ाइल जानकारी अपडेट हो गई है।'); }}><label>पूरा नाम<input required value={draft.name} onChange={e => setDraft({ ...draft, name: e.target.value })}/></label><label>ईमेल<input type="email" value={draft.email} onChange={e => setDraft({ ...draft, email: e.target.value })}/></label><label>फोन नंबर<input value={draft.phone} onChange={e => setDraft({ ...draft, phone: e.target.value })}/></label><button className="profile-modal-primary">बदलाव सहेजें</button></form> : dialog === 'family' ? <form onSubmit={e => { e.preventDefault(); setFamily([...family, { relation: draft.relation, name: draft.member, gender: 'महिला' }]); setDialog(''); }}><label>रिश्ता<input required placeholder="जैसे: बेटी" value={draft.relation} onChange={e => setDraft({ ...draft, relation: e.target.value })}/></label><label>सदस्य का नाम<input required value={draft.member} onChange={e => setDraft({ ...draft, member: e.target.value })}/></label><button className="profile-modal-primary">सदस्य जोड़ें</button></form> : <div className="profile-info-content"><p>{info}</p><button className="profile-modal-primary" onClick={() => setDialog('')}>ठीक है</button></div>}
    </section></div>}
  </div>;
}
