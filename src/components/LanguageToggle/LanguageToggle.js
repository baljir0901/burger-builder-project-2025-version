import React from 'react';
import { useTranslation } from 'react-i18next';

const LanguageToggle = () => {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLanguage = i18n.language === 'en' ? 'mn' : 'en';
    i18n.changeLanguage(newLanguage);
  };

  const currentLanguage = i18n.language === 'en' ? 'EN' : 'МН';
  const otherLanguage = i18n.language === 'en' ? 'МН' : 'EN';

  return (
    <button
      onClick={toggleLanguage}
      style={{
        background: 'rgba(255, 255, 255, 0.2)',
        color: 'white',
        border: '2px solid rgba(255, 255, 255, 0.3)',
        borderRadius: '25px',
        padding: '8px 16px',
        cursor: 'pointer',
        fontSize: '14px',
        fontWeight: '700',
        transition: 'all 0.3s ease',
        backdropFilter: 'blur(10px)',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        minWidth: '80px',
        justifyContent: 'center'
      }}
      onMouseEnter={(e) => {
        e.target.style.background = 'rgba(255, 255, 255, 0.3)';
        e.target.style.transform = 'translateY(-2px)';
        e.target.style.boxShadow = '0 8px 20px rgba(255, 255, 255, 0.2)';
      }}
      onMouseLeave={(e) => {
        e.target.style.background = 'rgba(255, 255, 255, 0.2)';
        e.target.style.transform = 'translateY(0)';
        e.target.style.boxShadow = 'none';
      }}
      title={`Switch to ${otherLanguage}`}
    >
      <span style={{ fontSize: '16px' }}>🌐</span>
      <span>{currentLanguage}</span>
    </button>
  );
};

export default LanguageToggle;
