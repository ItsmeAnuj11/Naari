'use client';

import React, { useMemo, useState } from 'react';
import { useLanguage } from '@/lib/i18n';
import { ArrowRight, Baby, Bot, ChevronDown, ChevronRight, ClipboardList, FileText, Headphones, HelpCircle, MapPin, MessageCircle, Phone, Search, ShieldCheck, Volume2, X } from 'lucide-react';

interface HelpViewProps {
  speak: (text: string) => void;
  isSpeaking: boolean;
  startListening: () => void;
  stopListening: () => void;
  isListening: boolean;
}

const faqs = [
  { question: 'प्रधानमंत्री मातृ वंदना योजना (PMMVY) क्या है?', answer: 'यह गर्भवती और स्तनपान कराने वाली महिलाओं के लिए मातृत्व सहायता योजना है। पात्रता और आवेदन के लिए नज़दीकी आंगनवाड़ी केंद्र से संपर्क करें।' },
  { question: 'इस योजना के लिए कौन पात्र है?', answer: 'पात्रता योजना के अनुसार अलग होती है। उम्र, परिवार की स्थिति और आवश्यक दस्तावेज़ों की जानकारी योजना के विवरण में देखें।' },
  { question: 'आवेदन कहाँ और कैसे करें?', answer: 'आप संबंधित सरकारी पोर्टल या नज़दीकी आंगनवाड़ी / जन सेवा केंद्र पर आवेदन कर सकती हैं। आवेदन से पहले ज़रूरी दस्तावेज़ तैयार रखें।' },
  { question: 'कौन से दस्तावेज़ चाहिए?', answer: 'आमतौर पर पहचान पत्र, बैंक खाते का विवरण और योजना से जुड़े प्रमाणपत्र मांगे जाते हैं। सटीक सूची योजना के अनुसार जाँचें।' },
  { question: 'पैसे कब और कैसे मिलते हैं?', answer: 'लाभ का समय और भुगतान तरीका योजना पर निर्भर करता है। स्वीकृत आवेदन की स्थिति संबंधित विभाग या हेल्पलाइन से जानें।' },
  { question: 'अगर मेरा आवेदन अस्वीकृत हो जाए तो क्या करूँ?', answer: 'अस्वीकृति का कारण पूछें, दस्तावेज़ों में कमी ठीक करें और योजना के संबंधित कार्यालय या हेल्पलाइन से दोबारा आवेदन की प्रक्रिया जानें।' },
];

const contacts = [
  { name: 'महिला हेल्पलाइन', note: 'महिलाओं की सुरक्षा और सहायता', number: '181', tone: 'rose', icon: Baby },
  { name: 'बाल हेल्पलाइन', note: 'बच्चों से जुड़ी सहायता', number: '1098', tone: 'blue', icon: Headphones },
  { name: 'प्रधानमंत्री मातृ वंदना योजना', note: 'योजना से संबंधित जानकारी', number: '1800 118 111', tone: 'green', icon: ShieldCheck },
  { name: 'आंगनवाड़ी सेवाएँ', note: 'नज़दीकी केंद्र की जानकारी', number: '14408', tone: 'orange', icon: MapPin },
  { name: 'राष्ट्रीय स्वास्थ्य मिशन', note: 'गर्भवती महिलाओं के लिए सहायता', number: '1800 180 1104', tone: 'purple', icon: HelpCircle },
];

const steps = [
  ['अपनी पात्रता जानें', 'देखें कि आप इस योजना के लिए योग्य हैं या नहीं'],
  ['ज़रूरी दस्तावेज़ तैयार करें', 'कौन से दस्तावेज़ चाहिए और कैसे बनवाएँ'],
  ['आवेदन करें', 'ऑनलाइन या नज़दीकी केंद्र पर'],
  ['आवेदन की स्थिति देखें', 'आपका आवेदन स्वीकृत हुआ या नहीं'],
  ['लाभ प्राप्त करें', 'पैसे कब और कैसे मिलेंगे'],
];

export function HelpView({ speak, startListening, stopListening, isListening }: HelpViewProps) {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  const [chatReply, setChatReply] = useState('');
  const [centerNotice, setCenterNotice] = useState(false);

  const topics = [
    { title: 'आवेदन प्रक्रिया', description: 'आवेदन कैसे करें, कहाँ करें, कितना समय लगेगा', icon: FileText, tone: 'blue', question: 'सरकारी योजना के लिए आवेदन कैसे करें?' },
    { title: 'ज़रूरी दस्तावेज़', description: 'कौन से दस्तावेज़ चाहिए, कैसे बनवाएँ', icon: ClipboardList, tone: 'rose', question: 'सरकारी योजनाओं के लिए कौन से दस्तावेज़ चाहिए?' },
    { title: 'कहाँ जाना है', description: 'आंगनवाड़ी केंद्र, सरकारी कार्यालय, बैंक आदि', icon: MapPin, tone: 'green', question: 'मेरे पास कौन सा सरकारी सहायता केंद्र है?' },
    { title: 'हेल्पलाइन नंबर', description: 'किससे संपर्क करें, फोन नंबर की सूची', icon: Phone, tone: 'orange', question: t('महिला हेल्पलाइन') + ' नंबर क्या है?' },
    { title: 'सामान्य प्रश्न', description: 'अक्सर पूछे जाने वाले प्रश्न और उनके उत्तर', icon: MessageCircle, tone: 'purple', question: 'सरकारी योजनाओं के बारे में आम सवाल बताइए' },
  ];

  const visibleFaqs = useMemo(() => {
    const query = searchQuery.trim().toLocaleLowerCase();
    if (!query) return faqs;
    return faqs.filter((faq) => `${faq.question} ${faq.answer}`.toLocaleLowerCase().includes(query));
  }, [searchQuery]);

  const handleChat = (event: React.FormEvent) => {
    event.preventDefault();
    if (!chatMessage.trim()) return;
    setChatReply('आपका सवाल दर्ज हो गया है। योजना और आवेदन संबंधी सहायता के लिए 181 पर कॉल करें या ऊपर दिए गए FAQs देखें।');
    setChatMessage('');
  };

  return (
    <div className="help-page">
      <div className="help-heading-row">
        <div><h1>सहायता केंद्र</h1><p>{t('हम यहाँ आपकी मदद के लिए हैं। अपनी समस्या चुनें या सीधे सहायता प्राप्त करें।')}</p></div>
        <label className="help-search"><Search size={21} /><input value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)} placeholder={t('अपना प्रश्न खोजें (जैसे - आवेदन कैसे करें, कौन से दस्तावेज़ चाहिए...)')} /></label>
      </div>

      <section className="help-topic-grid" aria-label="सहायता विषय">
        {topics.map(({ title, description, icon: Icon, tone }) => <button className="help-topic-card" key={title} onClick={() => {
          if (title === 'सामान्य प्रश्न') { setSearchQuery(''); document.querySelector('.help-faq-panel')?.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
          else if (title === 'हेल्पलाइन नंबर') { document.querySelector('.help-contact-panel')?.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
          else { setSearchQuery(title === 'ज़रूरी दस्तावेज़' ? 'दस्तावेज़' : title === 'कहाँ जाना है' ? 'कहाँ' : 'आवेदन'); document.querySelector('.help-faq-panel')?.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
        }}>
          <span className={`help-icon ${tone}`}><Icon size={27} /></span><ChevronRight className="help-topic-chevron" size={19} /><strong>{title}</strong><small>{description}</small>
        </button>)}
      </section>

      <section className="help-direct-section">
        <div className="help-section-heading"><h2>{t('सीधे सहायता प्राप्त करें')}</h2><p>{t('नीचे दिए गए तरीकों से आप हमसे मदद ले सकती हैं')}</p></div>
        <div className="help-direct-grid">
          <a className="help-direct-card hotline" href="tel:181"><span className="help-direct-icon"><Phone size={28} fill="currentColor" /></span><span><strong>{t('महिला हेल्पलाइन')}</strong><b>181</b><small>{t('24x7 उपलब्ध')}</small></span><ChevronRight size={20} /></a>
          <div className="help-direct-card voice"><span className="help-direct-icon"><Headphones size={29} /></span><span><strong>{t('हमसे बात करें (वॉइस)')}</strong><small>{t('अपना प्रश्न बोलकर पूछें')}</small><button onClick={isListening ? stopListening : startListening}><Volume2 size={16} />{isListening ? 'सुनना बंद करें' : t('अभी शुरू करें')}</button></span></div>
          <div className="help-direct-card chat"><span className="help-direct-icon"><MessageCircle size={28} fill="currentColor" /></span><span><strong>{t('हमसे चैट करें')}</strong><small>{t('टेक्स्ट में अपना प्रश्न लिखें')}</small><button onClick={() => { setChatOpen(true); setChatReply(''); }}><MessageCircle size={16} />{t('चैट शुरू करें')}</button></span></div>
          <div className="help-direct-card nearby"><span className="help-direct-icon"><MapPin size={29} fill="currentColor" /></span><span><strong>{t('नज़दीकी आंगनवाड़ी केंद्र')}</strong><small>अपने क्षेत्र का {t('केंद्र खोजें')}</small><button onClick={() => setCenterNotice(!centerNotice)}><MapPin size={16} />{t('केंद्र खोजें')}</button></span></div>
        </div>
        {centerNotice && <div className="help-center-note"><MapPin size={18} /> अपने गाँव या वार्ड के आंगनवाड़ी केंद्र की जानकारी के लिए {t('महिला हेल्पलाइन')} 181 या स्थानीय ग्राम पंचायत से संपर्क करें। <button onClick={() => setCenterNotice(false)} aria-label="बंद करें"><X size={16} /></button></div>}
      </section>

      <section className="help-bottom-grid">
        <div className="help-bottom-panel help-faq-panel">
          <div className="help-panel-heading"><h2>अक्सर पूछे जाने वाले प्रश्न</h2><button onClick={() => { setSearchQuery(''); setOpenFaq(null); }}>{t('सभी देखें')} <ArrowRight size={16} /></button></div>
          <div className="help-faq-list">
            {visibleFaqs.map((faq) => { const index = faqs.indexOf(faq); const expanded = openFaq === index; return <div className={`help-faq-item ${expanded ? 'expanded' : ''}`} key={faq.question}><button onClick={() => setOpenFaq(expanded ? null : index)} aria-expanded={expanded}><span>{faq.question}</span>{expanded ? <ChevronDown size={18} /> : <ChevronRight size={18} />}</button>{expanded && <div className="help-faq-answer"><p>{faq.answer}</p><button onClick={() => speak(faq.answer)}><Volume2 size={15} /> उत्तर सुनें</button></div>}</div>; })}
            {visibleFaqs.length === 0 && <div className="help-no-faq">{t('कोई प्रश्न नहीं मिला। अलग शब्द से खोजें।')}</div>}
          </div>
        </div>

        <div className="help-bottom-panel help-contact-panel">
          <div className="help-panel-heading"><h2>{t('महत्वपूर्ण संपर्क')}</h2></div>
          <div className="help-contact-list">{contacts.map(({ name, note, number, tone, icon: Icon }) => <div className="help-contact-row" key={number}><span className={`help-contact-icon ${tone}`}><Icon size={19} /></span><span className="help-contact-copy"><strong>{name}</strong><small>{note}</small></span><a href={`tel:${number.replaceAll(' ', '')}`}>{number}</a><a className="help-call-icon" href={`tel:${number.replaceAll(' ', '')}`} aria-label={`${name} को कॉल करें`}><Phone size={17} fill="currentColor" /></a></div>)}</div>
        </div>

        <div className="help-bottom-panel help-guide-panel">
          <div className="help-panel-heading"><div><h2>{t('स्टेप बाय स्टेप गाइड')}</h2><p>{t('योजना का लाभ लेने की पूरी प्रक्रिया')}</p></div></div>
          <ol>{steps.map(([title, description], index) => <li key={title}><span className="help-step-number">{index + 1}</span><span><strong>{title}</strong><small>{description}</small></span></li>)}</ol>
        </div>
      </section>

      {chatOpen && <div className="help-chat-backdrop" role="presentation" onClick={() => setChatOpen(false)}><section className="help-chat-dialog" role="dialog" aria-modal="true" aria-label="Naari AI चैट सहायता" onClick={(event) => event.stopPropagation()}><header><span className="help-chat-avatar"><Bot size={20} /></span><span><strong>Naari AI चैट सहायता</strong><small>आपकी मदद के लिए यहाँ हैं</small></span><button onClick={() => setChatOpen(false)} aria-label="चैट बंद करें"><X size={20} /></button></header><div className="help-chat-body"><p>नमस्ते! योजनाओं या आवेदन के बारे में अपना सवाल लिखें।</p>{chatReply && <p className="help-chat-reply">{chatReply}</p>}</div><form onSubmit={handleChat}><input value={chatMessage} onChange={(event) => setChatMessage(event.target.value)} placeholder="अपना प्रश्न लिखें..." /><button type="submit">भेजें</button></form></section></div>}
    </div>
  );
}
