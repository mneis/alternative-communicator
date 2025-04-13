import { useState, useCallback } from "react";

type LanguageCode = 'en-US' | 'pt-BR';

interface UseSpeechProps {
  rate?: number;
  pitch?: number;
  lang?: LanguageCode;
}

interface UseSpeechReturn {
  speak: (text: string) => void;
  speaking: boolean;
  supported: boolean;
  voices: SpeechSynthesisVoice[];
  cancel: () => void;
}

export default function useSpeech({
  rate = 0.9,  // Slightly slower for clarity
  pitch = 1,
  lang = "en-US"
}: UseSpeechProps = {}): UseSpeechReturn {
  const [speaking, setSpeaking] = useState(false);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  
  // Check if speech synthesis is supported
  const supported = 'speechSynthesis' in window;
  
  // Initialize voices if available
  if (supported && voices.length === 0) {
    const availableVoices = window.speechSynthesis.getVoices();
    if (availableVoices.length > 0) {
      setVoices(availableVoices);
    } else {
      window.speechSynthesis.onvoiceschanged = () => {
        setVoices(window.speechSynthesis.getVoices());
      };
    }
  }
  
  // Speak function
  const speak = useCallback((text: string) => {
    if (!supported) return;
    
    // Cancel any ongoing speech
    window.speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = rate;
    utterance.pitch = pitch;
    utterance.lang = lang;
    
    // Choose a voice if available (preferably a natural sounding one)
    const naturalVoice = voices.find(v => v.name.includes("Natural") && v.lang.includes(lang.split('-')[0]));
    if (naturalVoice) {
      utterance.voice = naturalVoice;
    }
    
    // Event handlers
    utterance.onstart = () => setSpeaking(true);
    utterance.onend = () => setSpeaking(false);
    utterance.onerror = () => setSpeaking(false);
    
    window.speechSynthesis.speak(utterance);
  }, [supported, rate, pitch, lang, voices]);
  
  // Cancel function
  const cancel = useCallback(() => {
    if (!supported) return;
    window.speechSynthesis.cancel();
    setSpeaking(false);
  }, [supported]);
  
  return { speak, speaking, supported, voices, cancel };
}
