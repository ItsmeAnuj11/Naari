'use client';

import React, { useState } from 'react';
import { ChevronDown, Globe, Volume2, Flower2, Search } from 'lucide-react';
import { NavTab } from './Sidebar';
import { languageOptions, useLanguage } from '@/lib/i18n';

interface TopHeaderProps {
  onSpeakPage?: () => void;
  isSpeaking?: boolean;
  onNavigateProfile?: () => void;
  activeTab?: NavTab;
  schemeSearchValue?: string;
  onSchemeSearchChange?: (value: string) => void;
}

export function TopHeader({ onSpeakPage, isSpeaking = false, onNavigateProfile, activeTab, schemeSearchValue = '', onSchemeSearchChange }: TopHeaderProps) {
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const { locale, setLocale, t } = useLanguage();
  const selectedLang = languageOptions.find(lang => lang.id === locale)?.label || 'हिंदी';

  return (
    <header className="app-header">
      <a href="/" className="brand-lockup" aria-label="Naari AI होम">
        <span className="brand-mark"><Flower2 size={30} strokeWidth={2.2} /></span>
        <span><strong>Naari AI</strong><small>{t('सरकारी योजनाओं तक आपकी आसान साथी')}</small></span>
      </a>
      {activeTab === 'schemes' && <label className="header-scheme-search"><Search size={20} /><input value={schemeSearchValue} onChange={(event) => onSchemeSearchChange?.(event.target.value)} placeholder={t('कौन सी योजना खोज रहे हैं? (जैसे - मातृत्व, शिक्षा, गैस, पेंशन...)')} /></label>}
      <div className="header-actions">
        <button onClick={onSpeakPage} className={`header-icon-button ${isSpeaking ? 'speaking' : ''}`} aria-label={t('speak')} title={t('speak')}><Volume2 size={18} /></button>
        <div className="relative">
          <button onClick={() => setLangMenuOpen(!langMenuOpen)} className="header-pill"><Globe size={18} /><span>{selectedLang}</span><ChevronDown size={16} /></button>
          {langMenuOpen && <div className="language-menu">{languageOptions.map((lang) => <button key={lang.id} aria-selected={locale === lang.id} onClick={() => { setLocale(lang.id); setLangMenuOpen(false); }}>{lang.label}</button>)}</div>}
        </div>
        <button onClick={onNavigateProfile} className={`profile-pill ${activeTab === 'profile' ? 'selected' : ''}`}><span className="profile-avatar">V</span><span className="profile-name">Vikash</span><ChevronDown size={16} /></button>
      </div>
    </header>
  );
}
