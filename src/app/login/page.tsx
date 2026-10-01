'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight, Eye, EyeOff, FileText, Globe, LockKeyhole, Mail, MapPin, Mic, ShieldCheck, Sparkles } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [showPassword, setShowPassword] = useState(false);

  return (
    <main className="login-page">
      <div className="login-card">
        <section className="login-intro">
          <a href="/" className="login-brand"><span className="login-logo"><Sparkles size={32} /></span><span><strong>Disha</strong><small>सरकारी योजनाओं तक आपकी आसान साथी</small></span></a>
          <div className="login-message">
            <h1>हर महिला तक<br />सरकारी योजना,<br /><em>बस एक आवाज़ में</em></h1>
            <p>Disha आपको सरकारी योजनाओं की जानकारी आपकी भाषा में, सरल तरीके से और आवाज़ के माध्यम से प्रदान करता है।</p>
            <ul>
              <li><span className="login-feature blue"><Mic size={22} /></span><span><b>बोलकर जानकारी पाएँ</b><small>टाइप करने की ज़रूरत नहीं</small></span></li>
              <li><span className="login-feature violet"><FileText size={22} /></span><span><b>सही और सरल जानकारी</b><small>सरकारी स्रोतों पर आधारित</small></span></li>
              <li><span className="login-feature green"><MapPin size={22} /></span><span><b>नज़दीकी सहायता केंद्र</b><small>आंगनवाड़ी केंद्र और हेल्पलाइन</small></span></li>
              <li><span className="login-feature amber"><ShieldCheck size={22} /></span><span><b>आपकी जानकारी सुरक्षित</b><small>हम आपकी गोपनीयता का सम्मान करते हैं</small></span></li>
            </ul>
          </div>
          <small className="login-government">भारत सरकार की नागरिक सेवा पहल</small>
        </section>
        <section className="login-form-panel">
          <button className="login-language"><Globe size={18} /> हिंदी <span>⌄</span></button>
          <div className="login-form-content">
            <h2><span>Disha</span> में आपका स्वागत है</h2>
            <p>लॉग इन करें या नया खाता बनाकर सरकारी योजनाओं की जानकारी पाएँ</p>
            <div className="login-tabs"><button className={mode === 'login' ? 'chosen' : ''} onClick={() => setMode('login')}>लॉग इन</button><button className={mode === 'register' ? 'chosen' : ''} onClick={() => setMode('register')}>नया खाता बनाएँ</button></div>
            <form onSubmit={(event) => { event.preventDefault(); router.push('/'); }}>
              <label>ईमेल या फोन नंबर<div className="login-input"><Mail size={20} /><input required autoComplete="username" placeholder="example@gmail.com या +91 9876543210" /></div></label>
              <label>पासवर्ड<div className="login-input"><LockKeyhole size={20} /><input required type={showPassword ? 'text' : 'password'} autoComplete={mode === 'login' ? 'current-password' : 'new-password'} placeholder="पासवर्ड दर्ज करें" /><button type="button" onClick={() => setShowPassword(!showPassword)} aria-label="पासवर्ड दिखाएँ">{showPassword ? <EyeOff size={20} /> : <Eye size={20} />}</button></div></label>
              {mode === 'login' && <button type="button" className="forgot-link">पासवर्ड भूल गए?</button>}
              <button className="login-submit" type="submit">{mode === 'login' ? 'लॉग इन करें' : 'खाता बनाएँ'} <ArrowRight size={20} /></button>
            </form>
            <div className="login-divider"><span />या<span /></div>
            <button className="google-button" onClick={() => router.push('/') }><b>G</b> Google से जारी रखें</button>
            <div className="login-switch">{mode === 'login' ? 'अब तक खाता नहीं है?' : 'पहले से खाता है?'} <button onClick={() => setMode(mode === 'login' ? 'register' : 'login')}>{mode === 'login' ? 'नया खाता बनाएँ' : 'लॉग इन करें'}</button></div>
          </div>
        </section>
      </div>
    </main>
  );
}
