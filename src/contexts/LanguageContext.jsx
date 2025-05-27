import { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { translations } from '../data/translations.jsx';

// Create a context for language settings
const LanguageContext = createContext();

/**
 * Provider component for language context
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components
 */
export function LanguageProvider({ children }) {
  // Default to browser language if available and supported, otherwise English
  const getBrowserLanguage = () => {
    const browserLang = navigator.language.split('-')[0];
    return ['en', 'es'].includes(browserLang) ? browserLang : 'en';
  };

  const [language, setLanguage] = useState(() => {
    // Try to get language from localStorage first
    const savedLanguage = localStorage.getItem('preferredLanguage');
    return savedLanguage || getBrowserLanguage();
  });

  // Save language preference to localStorage whenever it changes
  const handleLanguageChange = (lang) => {
    setLanguage(lang);
    localStorage.setItem('preferredLanguage', lang);
  };

  const contextValue = {
    language,
    setLanguage: handleLanguageChange,
    translations: translations[language]
  };

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
}

LanguageProvider.propTypes = {
  children: PropTypes.node.isRequired
};

/**
 * Hook for using language context
 * @returns {Object} Language context
 */
export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}