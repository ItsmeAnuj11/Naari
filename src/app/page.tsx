'use client';

import React, { useState, useCallback } from 'react';
import { Sidebar, NavTab } from '@/components/Sidebar';
import { TopHeader } from '@/components/TopHeader';
import { HomeView } from '@/components/HomeView';
import { SchemesView } from '@/components/SchemesView';
import { HelpView } from '@/components/HelpView';
import { ProfileView } from '@/components/ProfileView';
import { useSpeechRecognition, useSpeechSynthesis } from '@/hooks/useSpeech';
import { LanguageProvider, useLanguage } from '@/lib/i18n';
import { getSpeechReply } from '@/lib/voiceReplies';

function AppContent() {
  const [activeTab, setActiveTab] = useState<NavTab>('home');
  const [voiceTranscript, setVoiceTranscript] = useState('');
  const [schemeSearch, setSchemeSearch] = useState('');

  // Speech hooks for voice synthesis & recognition
  const { speak, stop: stopSpeaking, isSpeaking } = useSpeechSynthesis();
  const { locale, speechLocale } = useLanguage();
  const speakInLanguage = useCallback((text: string) => speak(text, speechLocale), [speak, speechLocale]);

  const handleSpeechResult = useCallback((text: string) => {
    const query = text.trim();
    if (!query) return;
    setVoiceTranscript(query);
    const reply = getSpeechReply(query, locale);
    speak(reply.text, reply.language);
  }, [locale, speak]);
  const handleSpeechError = useCallback((err: string) => {
    console.warn('Speech error:', err);
  }, []);

  const { isListening, startListening, stopListening, transcript } = useSpeechRecognition({
    language: speechLocale,
    onResult: handleSpeechResult,
    onError: handleSpeechError,
  });

  // Global page readout handler for top header button
  const handleSpeakPage = () => {
    if (isSpeaking) {
      stopSpeaking();
      return;
    }

    if (activeTab === 'home') {
      speakInLanguage('नमस्ते! यह दिशा पोर्टल का मुख्य पृष्ठ है। यहाँ आप बोलकर सरकारी योजनाओं की पात्रता जांच सकती हैं।');
    } else if (activeTab === 'schemes') {
      speakInLanguage('यह योजना निर्देशिका है। यहाँ मातृ वंदना, उज्ज्वला, सुकन्या समृद्धि और अन्य सरकारी योजनाओं की सूची और जरूरी दस्तावेज दिए गए हैं।');
    } else if (activeTab === 'help') {
      speakInLanguage('यह सहायता केंद्र है। यहाँ हेल्पलाइन नंबर 181 और 1075, निकटतम सेवा केंद्र, और शिकायत दर्ज करने की सुविधा उपलब्ध है।');
    } else if (activeTab === 'profile') {
      speakInLanguage('यह आपकी नागरिक प्रोफाइल है। यहाँ आपके सक्रिय आवेदन, डिजिटल दस्तावेज, और पूर्व बातचीत का विवरण है।');
    }
  };

  return (
    <div className="app-shell min-h-screen font-sans text-slate-800 antialiased selection:bg-blue-100 selection:text-blue-900">
        <TopHeader
          onSpeakPage={handleSpeakPage}
          isSpeaking={isSpeaking}
          onNavigateProfile={() => setActiveTab('profile')}
          activeTab={activeTab}
          schemeSearchValue={schemeSearch}
          onSchemeSearchChange={setSchemeSearch}
          />

        <div className="app-body">
          <Sidebar
            activeTab={activeTab}
            onTabChange={(tab) => {
              setActiveTab(tab);
              document.querySelector('.app-main')?.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            isListening={isListening}
          />
        <main className="app-main flex-1">
          {activeTab === 'home' && (
            <HomeView
              onNavigateTab={setActiveTab}
              speak={speakInLanguage}
              isSpeaking={isSpeaking}
              isListening={isListening}
              startListening={startListening}
              stopListening={stopListening}
              transcript={transcript || voiceTranscript}
            />
          )}

          {activeTab === 'schemes' && (
            <SchemesView
              onNavigateTab={setActiveTab}
              speak={speakInLanguage}
              searchQuery={schemeSearch}
              onSearchChange={setSchemeSearch}
            />
          )}

          {activeTab === 'help' && (
            <HelpView
              speak={speakInLanguage}
              isSpeaking={isSpeaking}
              startListening={startListening}
              stopListening={stopListening}
              isListening={isListening}
            />
          )}

          {activeTab === 'profile' && (
            <ProfileView
              onNavigateTab={setActiveTab}
              speak={speakInLanguage}
              isSpeaking={isSpeaking}
            />
          )}
        </main>
        </div>
    </div>
  );
}

export default function App() { return <LanguageProvider><AppContent /></LanguageProvider>; }
