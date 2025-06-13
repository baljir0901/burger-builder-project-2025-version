// src/App.js
import React from 'react'
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import BurgerBuilderPage from './pages/BurgerBuilderPage'
import CheckoutPage from './pages/CheckoutPage'
import ContactPage from './pages/ContactPage'
import ShippingPage from './pages/ShippingPage'
import OrdersPage from './pages/OrdersPage'
import LanguageToggle from './components/LanguageToggle'
import './i18n'
import './index.css'

const Navigation = () => {
  const location = useLocation();
  const { t } = useTranslation();
  
  const navStyle = {
    background: 'linear-gradient(135deg, #D32F2F 0%, #F44336 50%, #FF5722 100%)',
    padding: '15px 20px',
    boxShadow: '0 4px 20px rgba(211, 47, 47, 0.3)',
    borderBottom: '3px solid #B71C1C',
    position: 'relative',
    zIndex: 10
  };
  
  const linkStyle = {
    color: 'white',
    textDecoration: 'none',
    padding: '10px 20px',
    margin: '0 5px',
    borderRadius: '25px',
    transition: 'all 0.3s ease',
    display: 'inline-block',
    fontWeight: '500',
    fontSize: '16px'
  };
  
  const activeLinkStyle = {
    ...linkStyle,
    background: 'rgba(255,255,255,0.2)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255,255,255,0.3)'
  };
  
  return (
    <nav style={navStyle}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap', flex: 1 }}>
          <Link 
            to="/orders" 
            style={location.pathname === '/orders' ? activeLinkStyle : linkStyle}
            onMouseEnter={(e) => {
              if (location.pathname !== '/orders') {
                e.target.style.background = 'rgba(255,255,255,0.1)';
                e.target.style.transform = 'translateY(-2px)';
              }
            }}
            onMouseLeave={(e) => {
              if (location.pathname !== '/orders') {
                e.target.style.background = 'transparent';
                e.target.style.transform = 'translateY(0)';
              }
            }}
          >
            🔐 {t('nav.login')}
          </Link>
          <Link 
            to="/" 
            style={location.pathname === '/' ? activeLinkStyle : linkStyle}
            onMouseEnter={(e) => {
              if (location.pathname !== '/') {
                e.target.style.background = 'rgba(255,255,255,0.1)';
                e.target.style.transform = 'translateY(-2px)';
              }
            }}
            onMouseLeave={(e) => {
              if (location.pathname !== '/') {
                e.target.style.background = 'transparent';
                e.target.style.transform = 'translateY(0)';
              }
            }}
          >
            🍔 {t('nav.burger')}
          </Link>
          <Link 
            to="/checkout" 
            style={location.pathname === '/checkout' ? activeLinkStyle : linkStyle}
            onMouseEnter={(e) => {
              if (location.pathname !== '/checkout') {
                e.target.style.background = 'rgba(255,255,255,0.1)';
                e.target.style.transform = 'translateY(-2px)';
              }
            }}
            onMouseLeave={(e) => {
              if (location.pathname !== '/checkout') {
                e.target.style.background = 'transparent';
                e.target.style.transform = 'translateY(0)';
              }
            }}
          >
            🧾 {t('nav.checkout')}
          </Link>
          <Link 
            to="/contact" 
            style={location.pathname === '/contact' ? activeLinkStyle : linkStyle}
            onMouseEnter={(e) => {
              if (location.pathname !== '/contact') {
                e.target.style.background = 'rgba(255,255,255,0.1)';
                e.target.style.transform = 'translateY(-2px)';
              }
            }}
            onMouseLeave={(e) => {
              if (location.pathname !== '/contact') {
                e.target.style.background = 'transparent';
                e.target.style.transform = 'translateY(0)';
              }
            }}
          >
            📞 {t('nav.contact')}
          </Link>
          <Link 
            to="/shipping" 
            style={location.pathname === '/shipping' ? activeLinkStyle : linkStyle}
            onMouseEnter={(e) => {
              if (location.pathname !== '/shipping') {
                e.target.style.background = 'rgba(255,255,255,0.1)';
                e.target.style.transform = 'translateY(-2px)';
              }
            }}
            onMouseLeave={(e) => {
              if (location.pathname !== '/shipping') {
                e.target.style.background = 'transparent';
                e.target.style.transform = 'translateY(0)';
              }
            }}
          >
            🚚 {t('nav.shipping')}
          </Link>
        </div>
        
        {/* Language Toggle */}
        <div style={{ marginLeft: '20px' }}>
          <LanguageToggle />
        </div>
      </div>
    </nav>
  );
};

const App = () => {
  return (
    <BrowserRouter>      <div style={{ 
        minHeight: '100vh', 
        background: 'linear-gradient(135deg, #FF6B35 0%, #F7931E 50%, #FFD23F 100%)',
        fontFamily: "'Roboto', 'Arial', sans-serif",
        position: 'relative'
      }}>
        {/* Fast food pattern overlay */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M20 20c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10zm10 0c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10z'/%3E%3C/g%3E%3C/svg%3E")`,
          zIndex: 0
        }}></div>
        <Navigation />
        <Routes>
          <Route path="/" element={<BurgerBuilderPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/shipping" element={<ShippingPage />} />
          <Route path="/orders" element={<OrdersPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
