'use client';

import React from 'react';
import { Home, Layers, HelpCircle, User, PhoneCall } from 'lucide-react';
import { useLanguage } from '@/lib/i18n';

export type NavTab = 'home' | 'schemes' | 'help' | 'profile';

interface SidebarProps {
  activeTab: NavTab;
  onTabChange: (tab: NavTab) => void;
  isListening?: boolean;
}

export function Sidebar({ activeTab, onTabChange, isListening = false }: SidebarProps) {
  const { t } = useLanguage();
  const items = [
    { id: 'home' as const, label: t('home'), icon: Home },
    { id: 'schemes' as const, label: t('schemes'), icon: Layers },
    { id: 'help' as const, label: t('help'), icon: HelpCircle },
    { id: 'profile' as const, label: t('profile'), icon: User },
  ];

  return (
    <aside className="app-sidebar">
      <nav aria-label={t('मुख्य नेविगेशन')} className="sidebar-nav">
        {items.map(({ id, label, icon: Icon }) => (
          <button key={id} onClick={() => onTabChange(id)} className={`sidebar-link ${activeTab === id ? 'active' : ''}`} aria-current={activeTab === id ? 'page' : undefined}>
            <Icon size={22} strokeWidth={2.2} />
            <span>{label}</span>
          </button>
        ))}
      </nav>
      <a href="tel:181" className="sidebar-help">
        <span className="sidebar-help-icon"><PhoneCall size={20} /></span>
        <span><strong>{t('मदद चाहिए?')}</strong><small>{isListening ? t('आवाज़ सुन रहे हैं') : t('181 पर कॉल करें')}</small></span>
        <span aria-hidden="true">›</span>
      </a>
    </aside>
  );
}
