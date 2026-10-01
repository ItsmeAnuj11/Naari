'use client';

import React from 'react';
import { useLanguage } from '@/lib/i18n';
import { ArrowRight, Baby, Flame, GraduationCap, HelpCircle, Languages, MapPin, Mic, Phone, ShieldCheck, Users } from 'lucide-react';
import { NavTab } from './Sidebar';

interface HomeViewProps {
  onNavigateTab: (tab: NavTab) => void;
  speak: (text: string) => void;
  isSpeaking: boolean;
  isListening: boolean;
  startListening: () => void;
  stopListening: () => void;
  transcript: string;
}

const popularSchemes = [
  { title: 'प्रधानमंत्री मातृ वंदना योजना (PMMVY)', description: 'गर्भवती और स्तनपान कराने वाली महिलाओं के लिए', icon: Baby, tone: 'pink', tags: ['गर्भावस्था', 'आर्थिक सहायता'] },
  { title: 'सुकन्या समृद्धि योजना', description: 'लड़कियों की शिक्षा और भविष्य के लिए', icon: GraduationCap, tone: 'green', tags: ['बालिका शिक्षा', 'बचत योजना'] },
  { title: 'प्रधानमंत्री उज्ज्वला योजना', description: 'गरीब महिलाओं के लिए मुफ्त रसोई गैस कनेक्शन', icon: Flame, tone: 'orange', tags: ['रसोई गैस', 'स्वच्छ ईंधन'] },
  { title: 'महिलाओं के लिए अन्य योजनाएँ', description: 'पेंशन, स्वरोजगार और कौशल विकास', icon: Users, tone: 'purple', tags: ['महिलाओं के लिए', 'सामाजिक सुरक्षा'] },
];

const quickQuestions = [
  { title: t('गर्भावस्था के लिए कोई योजना'), subtitle: t('जैसे PM Matru Vandana Yojana'), icon: Baby, tone: 'pink', prompt: 'गर्भावस्था में कौन सी सरकारी सहायता मिलती है?' },
  { title: t('लड़कियों की पढ़ाई के लिए योजना'), subtitle: t('जैसे Sukanya Samriddhi Yojana'), icon: GraduationCap, tone: 'green', prompt: 'लड़कियों की पढ़ाई के लिए कौन सी योजनाएँ हैं?' },
  { title: t('रसोई गैस के लिए योजना'), subtitle: t('जैसे Ujjwala Yojana'), icon: Flame, tone: 'orange', prompt: 'उज्ज्वला योजना के बारे में बताइए' },
  { title: 'महिलाओं के लिए अन्य योजनाएँ', subtitle: t('जैसे पेंशन, स्वरोजगार, कौशल विकास'), icon: Users, tone: 'purple', prompt: 'महिलाओं के लिए उपलब्ध सरकारी योजनाएँ बताइए' },
];

export function HomeView({ onNavigateTab, speak, isSpeaking, isListening, startListening, stopListening, transcript }: HomeViewProps) {
  const { t } = useLanguage();
  const ask = (prompt: string) => {
    speak(prompt);
  };

  return (
    <div className="home-view">
      <section className="home-top-grid">
        <div className="home-voice-card">
          <div className="home-voice-badge"><Mic size={17} /> {t('आपकी सरकारी साथी')}</div>
          <h1>{t('बस बोलिए,')}<br /><span>{t('हम सुनेंगे और मदद करेंगे')}</span></h1>
          <p className="home-voice-copy">{t('सरकारी योजनाओं की जानकारी आपकी भाषा में, सरल तरीके से।')}</p>
          <div className="home-mic-row">
            <div className={`home-wave ${isListening ? 'active' : ''}`} aria-hidden="true"><i /><i /><i /><i /><i /><i /><i /></div>
            <button className={`home-mic ${isListening ? 'listening' : ''} ${isSpeaking ? 'speaking' : ''}`} onClick={() => isListening ? stopListening() : startListening()} aria-label={isListening ? t('सुनना बंद करें') : t('बोलने के लिए क्लिक करें')}><Mic size={43} strokeWidth={2.2} /></button>
            <div className={`home-wave home-wave-right ${isListening ? 'active' : ''}`} aria-hidden="true"><i /><i /><i /><i /><i /><i /><i /></div>
          </div>
          <div className="home-mic-prompt">{isListening ? t('सुन रहे हैं… अभी बोलिए') : t('बोलने के लिए क्लिक करें')}</div>
          {transcript && <div className="home-transcript">“{transcript}”</div>}
          <div className="home-trust-row">
            <div><ShieldCheck size={22} /><span>{t('सही और सरल जानकारी')}</span></div>
            <div><Languages size={22} /><span>{t('आपकी भाषा में')}</span></div>
            <div><Users size={22} /><span>{t('विश्वसनीय सरकारी स्रोतों पर आधारित')}</span></div>
          </div>
        </div>

        <aside className="home-questions-card">
          <h2>{t('आज आप क्या जानना चाहेंगे?')}</h2>
          <p>{t('नीचे दिए गए उदाहरण पर क्लिक करें या खुद बोलें')}</p>
          <div className="home-question-list">
            {quickQuestions.map(({ title, subtitle, icon: Icon, tone, prompt }) => (
              <button key={title} className="home-question" onClick={() => ask(prompt)}>
                <span className={`home-icon ${tone}`}><Icon size={27} fill="currentColor" strokeWidth={1.8} /></span>
                <span className="home-question-text"><strong>{title}</strong><small>{subtitle}</small></span>
                <ArrowRight size={19} />
              </button>
            ))}
          </div>
        </aside>
      </section>

      <section className="home-popular">
        <div className="home-section-heading"><div><h2>लोकप्रिय योजनाएँ</h2><p>{t('महिलाओं के लिए महत्वपूर्ण सरकारी योजनाएँ')}</p></div><button onClick={() => onNavigateTab('schemes')}>{t('सभी योजनाएँ देखें')} <ArrowRight size={17} /></button></div>
        <div className="home-scheme-grid">
          {popularSchemes.map(({ title, description, icon: Icon, tone, tags }) => (
            <button key={title} className="home-scheme-card" onClick={() => onNavigateTab('schemes')}>
              <span className={`home-icon ${tone}`}><Icon size={29} fill="currentColor" strokeWidth={1.8} /></span>
              <span className="home-scheme-copy"><strong>{title}</strong><small>{description}</small><span className="home-tags">{tags.map(tag => <i key={tag}>{tag}</i>)}</span></span>
              <span className="home-card-arrow">›</span>
            </button>
          ))}
        </div>
      </section>

      <section className="home-help-panel">
        <div className="home-section-heading"><div><h2>{t('और सहायता चाहिए?')}</h2><p>{t('आप नीचे दिए गए विकल्पों से भी मदद ले सकती हैं')}</p></div></div>
        <div className="home-help-grid">
          <button onClick={() => onNavigateTab('help')}><span className="home-icon pink"><MapPin size={25} fill="currentColor" /></span><span><strong>{t('नज़दीकी आंगनवाड़ी केंद्र खोजें')}</strong><small>{t('अपने क्षेत्र का केंद्र और पता देखें')}</small></span><ArrowRight size={18} /></button>
          <a href="tel:181"><span className="home-icon green"><Phone size={25} fill="currentColor" /></span><span><strong>हेल्पलाइन</strong><small>181 महिला हेल्पलाइन</small></span><ArrowRight size={18} /></a>
          <button onClick={() => onNavigateTab('help')}><span className="home-icon blue"><HelpCircle size={25} fill="currentColor" /></span><span><strong>सामान्य प्रश्न</strong><small>{t('अक्सर पूछे जाने वाले सवाल')}</small></span><ArrowRight size={18} /></button>
        </div>
      </section>
    </div>
  );
}
