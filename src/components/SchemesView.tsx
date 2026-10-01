'use client';

import React, { useMemo, useState } from 'react';
import { ArrowRight, Baby, BriefcaseBusiness, CheckCircle2, ChevronDown, ChevronRight, ExternalLink, FileText, Flame, GraduationCap, Heart, HeartPulse, House, Leaf, Mic, Search, ShieldCheck, Users, Wallet, X } from 'lucide-react';
import { SCHEMES_DATA, type SchemeItem } from '@/data/mockData';
import { getOfficialSchemeInfo } from '@/data/officialSchemes';
import { useLanguage, type Locale } from '@/lib/i18n';
import type { NavTab } from './Sidebar';

interface Props { onNavigateTab: (tab: NavTab) => void; speak: (text: string) => void; searchQuery: string; onSearchChange: (value: string) => void; }
const filters = [
  { id: 'all', key: 'all', icon: null }, { id: 'women', key: 'women', icon: Users }, { id: 'children', key: 'children', icon: Baby },
  { id: 'education', key: 'education', icon: GraduationCap }, { id: 'employment', key: 'employment', icon: BriefcaseBusiness }, { id: 'health', key: 'health', icon: HeartPulse },
  { id: 'housing', key: 'housing', icon: House }, { id: 'agriculture', key: 'agriculture', icon: Leaf }, { id: 'social', key: 'social', icon: Users },
];
const themeById: Record<string, { icon: React.ElementType; tone: string; audience: string; tags: string[] }> = {
  pmmvy: { icon: Baby, tone: 'rose', audience: 'women', tags: ['गर्भावस्था', 'मातृत्व सहायता', 'DBT'] },
  ssy: { icon: GraduationCap, tone: 'emerald', audience: 'children', tags: ['बालिका शिक्षा', 'बचत', 'भविष्य'] },
  pmuy: { icon: Flame, tone: 'orange', audience: 'women', tags: ['LPG', 'स्वच्छ ईंधन', 'रसोई'] },
  mssc: { icon: Users, tone: 'violet', audience: 'women', tags: ['बचत', 'महिलाएँ', 'बंद'] },
  'pm-kisan': { icon: Leaf, tone: 'green', audience: 'farmers', tags: ['कृषि', 'DBT', 'किसान'] },
  'pm-jay': { icon: HeartPulse, tone: 'blue', audience: 'families', tags: ['स्वास्थ्य', 'कैशलेस इलाज', 'परिवार'] },
};
const enNames: Record<string, string> = { pmmvy: 'Pradhan Mantri Matru Vandana Yojana (PMMVY)', pmuy: 'Pradhan Mantri Ujjwala Yojana 2.0 (PMUY)', ssy: 'Sukanya Samriddhi Account (SSA)', mssc: 'Mahila Samman Savings Certificate (MSSC)', 'pm-kisan': 'Pradhan Mantri Kisan Samman Nidhi (PM-KISAN)', 'pm-jay': 'Ayushman Bharat Pradhan Mantri Jan Arogya Yojana (AB PM-JAY)' };
const enDescriptions: Record<string, string> = { pmmvy: 'Maternity cash support for eligible pregnant and lactating women.', pmuy: 'Deposit-free LPG connections for eligible women from poor households.', ssy: 'A small-savings account for a girl child below 10 years of age.', mssc: 'A time-limited savings scheme; new applications have closed.', 'pm-kisan': 'Direct income support for eligible landholding farmer families.', 'pm-jay': 'Cashless hospital cover for eligible families and all people aged 70+.' };
const taNames: Record<string, string> = { pmmvy: 'பிரதான் மந்திரி மாத்ரு வந்தனா யோஜனா (PMMVY)', pmuy: 'பிரதான் மந்திரி உஜ்வலா யோஜனா 2.0 (PMUY)', ssy: 'சுகன்யா சம்ரித்தி கணக்கு (SSA)', mssc: 'மகிளா சம்மான் சேமிப்புச் சான்றிதழ் (MSSC)', 'pm-kisan': 'பிரதான் மந்திரி கிசான் சம்மான் நிதி (PM-KISAN)', 'pm-jay': 'ஆயுஷ்மான் பாரத் பிரதான் மந்திரி ஜன் ஆரோக்கிய யோஜனா (PM-JAY)' };
const teNames: Record<string, string> = { pmmvy: 'ప్రధాన మంత్రి మాతృ వందన యోజన (PMMVY)', pmuy: 'ప్రధాన మంత్రి ఉజ్వల యోజన 2.0 (PMUY)', ssy: 'సుకన్య సమృద్ధి ఖాతా (SSA)', mssc: 'మహిళా సమ్మాన్ సేవింగ్స్ సర్టిఫికెట్ (MSSC)', 'pm-kisan': 'ప్రధాన మంత్రి కిసాన్ సమ్మాన్ నిధి (PM-KISAN)', 'pm-jay': 'ఆయుష్మాన్ భారత్ ప్రధాన మంత్రి జన్ ఆరోగ్య యోజన (PM-JAY)' };
const taDescriptions: Record<string, string> = { pmmvy: 'தகுதியுள்ள கர்ப்பிணி மற்றும் பாலூட்டும் பெண்களுக்கான மகப்பேறு நிதியுதவி.', pmuy: 'தகுதியுள்ள ஏழைக் குடும்பப் பெண்களுக்கு வைப்புத்தொகை இல்லாத LPG இணைப்பு.', ssy: '10 வயதுக்குக் குறைவான பெண் குழந்தைக்கான சிறுசேமிப்புக் கணக்கு.', mssc: 'குறிப்பிட்ட கால சேமிப்புத் திட்டம்; புதிய விண்ணப்பங்கள் முடிந்துவிட்டன.', 'pm-kisan': 'தகுதியான நிலம் வைத்துள்ள விவசாயக் குடும்பங்களுக்கு நேரடி வருமான உதவி.', 'pm-jay': 'தகுதியுள்ள குடும்பங்கள் மற்றும் 70+ வயதினருக்கான பணமில்லா மருத்துவக் காப்பீடு.' };
const teDescriptions: Record<string, string> = { pmmvy: 'అర్హ గర్భిణీ, పాలిచ్చే మహిళలకు ప్రసూతి నగదు సహాయం.', pmuy: 'అర్హ పేద కుటుంబ మహిళలకు డిపాజిట్ లేని LPG కనెక్షన్.', ssy: '10 ఏళ్లలోపు బాలిక కోసం చిన్న పొదుపు ఖాతా.', mssc: 'పరిమిత కాల పొదుపు పథకం; కొత్త దరఖాస్తులు ముగిశాయి.', 'pm-kisan': 'అర్హ భూమి కలిగిన రైతు కుటుంబాలకు నేరుగా ఆదాయ సహాయం.', 'pm-jay': 'అర్హ కుటుంబాలు, 70 ఏళ్లు పైబడినవారికి నగదు రహిత వైద్య కవరేజ్.' };
const featuredIds = ['pmmvy', 'ssy', 'pmuy', 'pm-jay'];

function matchesFilter(scheme: SchemeItem, filter: string) {
  if (filter === 'all') return true;
  if (filter === 'women') return ['pmmvy', 'pmuy', 'mssc'].includes(scheme.id);
  if (filter === 'children' || filter === 'education') return scheme.id === 'ssy';
  if (filter === 'employment') return false;
  if (filter === 'health') return scheme.id === 'pm-jay' || scheme.id === 'pmmvy';
  if (filter === 'housing') return false;
  if (filter === 'agriculture') return scheme.id === 'pm-kisan';
  if (filter === 'social') return ['mssc', 'pm-jay'].includes(scheme.id);
  return true;
}

export function SchemesView({ onNavigateTab, speak, searchQuery, onSearchChange }: Props) {
  const { locale, t } = useLanguage();
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedScheme, setSelectedScheme] = useState<SchemeItem | null>(null);
  const [sort, setSort] = useState('popular');
  const [speakingScheme, setSpeakingScheme] = useState('');
  const nameOf = (scheme: SchemeItem) => locale === 'en' ? enNames[scheme.id] || scheme.name : locale === 'ta' ? taNames[scheme.id] || scheme.name : locale === 'te' ? teNames[scheme.id] || scheme.name : scheme.name;
  const descriptionOf = (scheme: SchemeItem) => locale === 'en' ? enDescriptions[scheme.id] || scheme.description : locale === 'ta' ? taDescriptions[scheme.id] || scheme.description : locale === 'te' ? teDescriptions[scheme.id] || scheme.description : scheme.description;
  const detailOf = selectedScheme ? getOfficialSchemeInfo(selectedScheme.id, locale) : null;
  const filteredSchemes = useMemo(() => {
    const query = searchQuery.trim().toLocaleLowerCase();
    const results = SCHEMES_DATA.filter(scheme => (!query || [scheme.name, scheme.shortName, scheme.description, ...scheme.tags, enNames[scheme.id] || '', enDescriptions[scheme.id] || ''].some(value => value.toLocaleLowerCase().includes(query))) && matchesFilter(scheme, selectedFilter));
    if (sort === 'alpha') return [...results].sort((a, b) => nameOf(a).localeCompare(nameOf(b), locale === 'en' ? 'en' : 'hi'));
    return [...results].sort((a, b) => { const ai = featuredIds.indexOf(a.id); const bi = featuredIds.indexOf(b.id); return (ai < 0 ? 9 : ai) - (bi < 0 ? 9 : bi); });
  }, [searchQuery, selectedFilter, sort, locale]);
  const featured = featuredIds.map(id => SCHEMES_DATA.find(item => item.id === id)).filter((item): item is SchemeItem => Boolean(item));
  const openDetails = (scheme: SchemeItem) => { setSelectedScheme(scheme); setSpeakingScheme(''); };
  const explain = () => {
    if (!selectedScheme || !detailOf) return;
    if (speakingScheme === selectedScheme.id) { window.speechSynthesis.cancel(); setSpeakingScheme(''); return; }
    setSpeakingScheme(selectedScheme.id);
    speak(detailOf.explanation);
    window.setTimeout(() => setSpeakingScheme(''), Math.max(5000, detailOf.explanation.length * 65));
  };
  const localizedTags = (tags: string[]) => {
    const dictionaries: Partial<Record<typeof locale, Record<string, string>>> = {
      en: { 'गर्भावस्था':'Maternity', 'मातृत्व सहायता':'Maternity support', DBT:'Direct transfer', 'बालिका शिक्षा':'Girls education', 'बचत':'Savings', 'भविष्य':'Future', LPG:'LPG', 'स्वच्छ ईंधन':'Clean fuel', 'रसोई':'Cooking', 'महिलाएँ':'Women', 'बंद':'Closed', 'कृषि':'Agriculture', 'किसान':'Farmers', 'स्वास्थ्य':'Health', 'कैशलेस इलाज':'Cashless care', 'परिवार':'Families' },
      ta: { 'गर्भावस्था':'கர்ப்பகாலம்', 'मातृत्व सहायता':'மகப்பேறு உதவி', DBT:'நேரடி பணப்பரிமாற்றம்', 'बालिका शिक्षा':'பெண் கல்வி', 'बचत':'சேமிப்பு', 'भविष्य':'எதிர்காலம்', LPG:'LPG', 'स्वच्छ ईंधन':'சுத்தமான எரிபொருள்', 'रसोई':'சமையல்', 'महिलाएँ':'பெண்கள்', 'बंद':'முடிந்தது', 'कृषि':'விவசாயம்', 'किसान':'விவசாயிகள்', 'स्वास्थ्य':'சுகாதாரம்', 'कैशलेस इलाज':'பணமில்லா சிகிச்சை', 'परिवार':'குடும்பங்கள்' },
      te: { 'गर्भावस्था':'గర్భధారణ', 'मातृत्व सहायता':'మాతృత్వ సహాయం', DBT:'నేరుగా నగదు బదిలీ', 'बालिका शिक्षा':'బాలికల విద్య', 'बचत':'పొదుపు', 'भविष्य':'భవిష్యత్తు', LPG:'LPG', 'स्वच्छ ईंधन':'శుభ్రమైన ఇంధనం', 'रसोई':'వంట', 'महिलाएँ':'మహిళలు', 'बंद':'ముగిసింది', 'कृषि':'వ్యవసాయం', 'किसान':'రైతులు', 'स्वास्थ्य':'ఆరోగ్యం', 'कैशलेस इलाज':'నగదు రహిత చికిత్స', 'परिवार':'కుటుంబాలు' },
    };
    const dictionary = dictionaries[locale];
    return dictionary ? tags.map(tag => dictionary[tag] || tag) : tags;
  };

  return <div className="schemes-page">
    <label className="scheme-mobile-search"><Search size={19}/><input value={searchQuery} onChange={event => onSearchChange(event.target.value)} placeholder={locale === 'en' ? 'Search schemes' : 'योजना खोजें'}/></label>
    <div className="scheme-page-heading"><div><h1>{t('allSchemes')}</h1><p>{t('schemeIntro')}</p></div><div className="scheme-assurances"><span><i className="assurance-heart"><Heart size={22} fill="currentColor"/></i>{t('women')}<br/>{t('schemes')}</span><span><i className="assurance-shield"><ShieldCheck size={23} fill="currentColor"/></i>{t('source')}<br/>{t('verified')}</span></div></div>
    <div className="scheme-official-banner"><ShieldCheck size={18}/><span>{t('centralScheme')} · {t('verified')}</span><a href="https://www.myscheme.gov.in/" target="_blank" rel="noreferrer">{t('readMore')} <ExternalLink size={14}/></a></div>
    <div className="scheme-filter-bar" role="tablist" aria-label={t('schemes')}>{filters.map(({ id, key, icon: Icon }) => <button key={id} role="tab" aria-selected={selectedFilter === id} className={selectedFilter === id ? 'selected' : ''} onClick={() => setSelectedFilter(id)}>{Icon && <Icon size={17}/>}<span>{t(key)}</span></button>)}</div>
    <section className="scheme-featured-section"><div className="scheme-section-title"><div><h2>{t('popular')}</h2><p>{t('popularSub')}</p></div></div><div className="scheme-featured-grid">{featured.map(scheme => { const theme = themeById[scheme.id] || themeById.pmmvy; const Icon = theme.icon; const meta = getOfficialSchemeInfo(scheme.id, locale); return <article className="scheme-feature-card" key={scheme.id}><div className={`scheme-feature-icon ${theme.tone}`}><Icon size={34} fill="currentColor" strokeWidth={1.8}/></div><span className={`scheme-audience ${theme.tone}`}>{t(theme.audience)}</span><h3>{nameOf(scheme)}</h3><p>{descriptionOf(scheme)}</p><div className={`scheme-tags ${theme.tone}`}>{localizedTags(theme.tags).slice(0,3).map(tag => <span key={tag}>{tag}</span>)}</div>{meta && !meta.active && <span className="scheme-closed-badge">{t('closed')}</span>}<button className="scheme-view-button" onClick={() => openDetails(scheme)}>{t('viewDetails')} <ArrowRight size={17}/></button></article>; })}</div></section>
    <section className="scheme-all-section"><div className="scheme-list-heading"><div><h2>{t('allSchemes')}</h2><p>{t('allSchemesSub')}</p></div><label>{t('sortBy')} <select value={sort} onChange={event => setSort(event.target.value)}><option value="popular">{t('popularity')}</option><option value="alpha">{t('alphabetical')}</option></select><ChevronDown size={15}/></label></div><div className="scheme-list" aria-live="polite">{filteredSchemes.map(scheme => { const theme = themeById[scheme.id] || themeById.pmmvy; const Icon = theme.icon; const meta = getOfficialSchemeInfo(scheme.id, locale); return <button className="scheme-list-row" key={scheme.id} onClick={() => openDetails(scheme)}><span className={`scheme-list-icon ${theme.tone}`}><Icon size={27} fill="currentColor" strokeWidth={1.8}/></span><span className="scheme-list-copy"><strong>{nameOf(scheme)}</strong><small>{descriptionOf(scheme)}{meta && !meta.active ? ` · ${t('closed')}` : ''}</small></span><span className={`scheme-list-tags ${theme.tone}`}>{localizedTags(theme.tags).slice(0,3).map(tag => <i key={tag}>{tag}</i>)}</span><ChevronRight size={20} className="scheme-list-chevron"/></button>; })}{!filteredSchemes.length && <div className="scheme-empty"><Search size={24}/><strong>{t('noResults')}</strong><span>{t('trySearch')}</span></div>}</div></section>
    {selectedScheme && detailOf && <div className="scheme-modal-backdrop" role="presentation" onClick={() => setSelectedScheme(null)}><section className="scheme-detail-modal scheme-detail-expanded" role="dialog" aria-modal="true" aria-labelledby="scheme-detail-title" onClick={event => event.stopPropagation()}><button className="scheme-modal-close" onClick={() => setSelectedScheme(null)} aria-label={t('close')}><X size={21}/></button><div className="scheme-detail-content"><span className="official-label"><ShieldCheck size={15}/>{t('officialScheme')} · {t('centralScheme')}</span><h2 id="scheme-detail-title">{nameOf(selectedScheme)}</h2><p>{descriptionOf(selectedScheme)}</p><div className="scheme-detail-benefit"><Wallet size={19}/><span>{detailOf.benefit}</span></div>{!detailOf.active && <div className="scheme-detail-closed"><b>{t('closed')}</b><span>{t('closedMessage')}</span></div>}<div className="scheme-detail-block"><h3>{t('eligibility')}</h3><p>{detailOf.eligibility}</p></div><div className="scheme-detail-block"><h3>{t('whereApply')}</h3><p>{detailOf.where}</p></div><div className="scheme-detail-block"><h3>{t('process')}</h3><ol>{detailOf.steps.map((step, i) => <li key={step}><span>{i+1}</span>{step}</li>)}</ol></div><div className="scheme-detail-block"><h3>{t('documents')}</h3><ul>{detailOf.documents.map(doc => <li key={doc}><CheckCircle2 size={17}/>{doc}</li>)}</ul></div><div className="scheme-update-note">{t('updateNote')}</div><div className="scheme-source-links"><a href={detailOf.sourceUrl} target="_blank" rel="noreferrer">{t('source')} <ExternalLink size={15}/></a>{detailOf.active && <a href={detailOf.applyUrl} target="_blank" rel="noreferrer">{t('applyOfficial')} <ExternalLink size={15}/></a>}<a href={`tel:${detailOf.helpline}`}><Mic size={15}/>{t('helpline')} {detailOf.helpline}</a></div></div><aside className="scheme-ai-side"><div className="scheme-ai-badge"><span>✦</span> Naari AI</div><div className={`scheme-ai-mic ${speakingScheme ? 'speaking' : ''}`}><Mic size={34}/></div><b>{t('dishaAi')}</b><p>{speakingScheme ? t('speaking') : t('explainScheme')}</p><button onClick={explain} className="scheme-ai-action"><Mic size={17}/>{speakingScheme ? t('stopSpeaking') : t('dishaAi')}</button></aside></section></div>}
  </div>;
}
