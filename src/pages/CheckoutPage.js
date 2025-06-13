import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Burger from '../components/Burgers/Burger';

const CheckoutPage = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const { ingredients, totalPrice } = location.state || { 
    ingredients: { salad: 0, bacon: 0, cheese: 0, meat: 0 }, 
    totalPrice: 4 
  };

  const handleApprove = () => {
    // Save order to localStorage and navigate to contact
    const orderData = {
      ingredients,
      totalPrice,
      timestamp: new Date().toISOString()
    };
    localStorage.setItem('currentOrder', JSON.stringify(orderData));
    navigate('/contact');
  };

  const handleBack = () => {
    navigate('/');
  };
  return (
    <div style={{ 
      padding: '40px 20px', 
      maxWidth: '800px', 
      margin: '0 auto',
      minHeight: '100vh'
    }}>      <div style={{
        textAlign: 'center',
        marginBottom: '40px'
      }}>        <h1 style={{
          fontSize: '3rem',
          background: 'linear-gradient(135deg, #D32F2F 0%, #FF5722 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          margin: '0 0 10px 0',
          fontWeight: '800'
        }}>
          {t('checkout.title')}
        </h1>
        <p style={{
          fontSize: '1.1rem',
          color: '#333'
        }}>
          {t('checkout.subtitle')}
        </p>
      </div>

      <div style={{
        background: 'rgba(255, 255, 255, 0.95)',
        borderRadius: '25px',
        padding: '40px',
        boxShadow: '0 25px 50px rgba(0,0,0,0.15)',
        border: '2px solid rgba(255, 107, 53, 0.2)',
        backdropFilter: 'blur(10px)'
      }}>        <h2 style={{
          textAlign: 'center',
          margin: '0 0 30px 0',
          fontSize: '1.8rem',
          color: '#D32F2F'
        }}>
          {t('checkout.details')}
        </h2>
        
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: '30px'
        }}>
          <Burger ingredients={ingredients} />
        </div>
          <div style={{
          textAlign: 'center',
          marginBottom: '40px',
          padding: '20px',
          background: 'linear-gradient(135deg, #FF6B35 0%, #F7931E 100%)',
          borderRadius: '15px',
          color: 'white'
        }}>
          <h3 style={{
            margin: '0',
            fontSize: '2rem',
            fontWeight: '700'
          }}>              {t('checkout.total')}: ₮{(totalPrice * 3000).toLocaleString()}
          </h3>
          <p style={{
            margin: '5px 0 0 0',
            fontSize: '0.9rem',
            opacity: '0.9'
          }}>
            (~${totalPrice.toFixed(2)})
          </p>
        </div>
        
        <div style={{ 
          display: 'flex', 
          gap: '20px', 
          justifyContent: 'center',
          flexWrap: 'wrap'
        }}>
          <button 
            onClick={handleBack}
            style={{
              padding: '15px 30px',
              backgroundColor: '#757575',
              color: 'white',
              border: 'none',
              borderRadius: '15px',
              cursor: 'pointer',
              fontSize: '1.1rem',
              fontWeight: '600',
              transition: 'all 0.3s ease',
              boxShadow: '0 8px 20px rgba(117, 117, 117, 0.3)',
              textTransform: 'uppercase',
              letterSpacing: '1px'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-3px)';
              e.target.style.boxShadow = '0 12px 25px rgba(117, 117, 117, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 8px 20px rgba(117, 117, 117, 0.3)';
            }}
          >
            ← {t('checkout.back')}
          </button>
          <button 
            onClick={handleApprove}
            style={{
              padding: '15px 30px',
              background: 'linear-gradient(135deg, #D32F2F 0%, #F44336 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '15px',
              cursor: 'pointer',
              fontSize: '1.1rem',
              fontWeight: '600',
              transition: 'all 0.3s ease',
              boxShadow: '0 8px 20px rgba(211, 47, 47, 0.3)',
              textTransform: 'uppercase',
              letterSpacing: '1px'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-3px)';
              e.target.style.boxShadow = '0 12px 25px rgba(211, 47, 47, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 8px 20px rgba(211, 47, 47, 0.3)';
            }}
          >
            {t('checkout.confirm')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;