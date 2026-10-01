'use client';

import { useState, useRef, useCallback, useEffect } from 'react';

interface UseSpeechRecognitionOptions {
  language?: string;
  onResult?: (transcript: string) => void;
  onError?: (error: string) => void;
}

// Extend Window type for webkitSpeechRecognition
interface SpeechRecognitionEvent {
  results: {
    [index: number]: {
      [index: number]: {
        transcript: string;
        confidence: number;
      };
      isFinal: boolean;
    };
    length: number;
  };
}

export function useSpeechRecognition({ language = 'hi-IN', onResult, onError }: UseSpeechRecognitionOptions = {}) {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const recognitionRef = useRef<unknown>(null);

  const startListening = useCallback(() => {
    // Check for browser support
    const SpeechRecognition = (window as unknown as Record<string, unknown>).SpeechRecognition || 
                               (window as unknown as Record<string, unknown>).webkitSpeechRecognition;
    
    if (!SpeechRecognition) {
      onError?.('आपके ब्राउज़र में वॉइस की सुविधा नहीं है। कृपया Chrome ब्राउज़र का इस्तेमाल करें।');
      return;
    }

    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const recognition = new (SpeechRecognition as any)();
      recognition.lang = language;
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      recognition.onstart = () => {
        setIsListening(true);
        setTranscript('');
      };

      recognition.onresult = (event: SpeechRecognitionEvent) => {
        const result = event.results[0]?.[0]?.transcript || '';
        setTranscript(result);
        onResult?.(result);
      };

      recognition.onerror = (event: { error: string }) => {
        setIsListening(false);
        if (event.error === 'no-speech') {
          onError?.('no-speech');
        } else if (event.error === 'not-allowed') {
          onError?.('माइक्रोफ़ोन की अनुमति दें। बिना माइक्रोफ़ोन के आवाज़ नहीं सुनी जा सकती।');
        } else {
          onError?.(event.error);
        }
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch (err) {
      console.error('Speech recognition error:', err);
      onError?.('वॉइस सुविधा शुरू नहीं हो सकी।');
    }
  }, [language, onResult, onError]);

  const stopListening = useCallback(() => {
    if (recognitionRef.current) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (recognitionRef.current as any).stop();
      setIsListening(false);
    }
  }, []);

  return { isListening, transcript, startListening, stopListening };
}

/**
 * Text-to-Speech using Web Speech API
 */
export function useSpeechSynthesis() {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  const speak = useCallback((text: string, language: string = 'hi-IN') => {
    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = language;
    utterance.rate = 0.85; // Slightly slower for clarity
    utterance.pitch = 1.1; // Slightly higher for warmth

    // Prefer a voice for the requested response language.
    const voices = window.speechSynthesis.getVoices();
    const languagePrefix = language.split('-')[0].toLowerCase();
    const matchingVoice = voices.find(v => v.lang.toLowerCase().startsWith(languagePrefix)) || voices.find(v => v.lang.toLowerCase() === language.toLowerCase());
    if (matchingVoice) utterance.voice = matchingVoice;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  }, []);

  const stop = useCallback(() => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  }, []);

  // Load voices on mount
  useEffect(() => {
    const loadVoices = () => {
      window.speechSynthesis.getVoices();
    };
    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
  }, []);

  return { isSpeaking, speak, stop };
}
