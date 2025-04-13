import React, { createContext, useState, useContext, ReactNode } from 'react';

type LanguageCode = 'en-US' | 'pt-BR';

interface LanguageContextType {
  language: LanguageCode;
  setLanguage: (language: LanguageCode) => void;
}

export const LanguageContext = createContext<LanguageContextType>({
  language: 'en-US',
  setLanguage: () => {},
});

interface LanguageProviderProps {
  children: ReactNode;
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [language, setLanguage] = useState<LanguageCode>('en-US');

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}