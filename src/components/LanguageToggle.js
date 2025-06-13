import React from 'react';
import { useTranslation } from 'react-i18next';

const LanguageToggle = () => {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'mn' : 'en';
    i18n.changeLanguage(newLang);
  };

  return (
    <button
      onClick={toggleLanguage}
      style={{
        background: 'rgba(255,255,255,0.2)',
        border: '1px solid rgba(255,255,255,0.3)',
        borderRadius: '20px',
        color: 'white',
        padding: '8px 16px',
        cursor: 'pointer',
        fontSize: '14px',
        fontWeight: '600',
        transition: 'all 0.3s ease',
        backdropFilter: 'blur(10px)',
        display: 'flex',
        alignItems: 'center',
        gap: '6px'
      }}
      onMouseEnter={(e) => {
        e.target.style.background = 'rgba(255,255,255,0.3)';
        e.target.style.transform = 'translateY(-2px)';
      }}
      onMouseLeave={(e) => {
        e.target.style.background = 'rgba(255,255,255,0.2)';
        e.target.style.transform = 'translateY(0)';
      }}
    >
      <span style={{ fontSize: '16px' }}>
        {i18n.language === 'en' ? 'US' : '🇲🇳'}
      </span>
      <span>
        {i18n.language === 'en' ? 'MN' : 'MN'}
      </span>
    </button>
  );
};

export default LanguageToggle;
