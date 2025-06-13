import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Burger from '../components/Burgers/Burger';
import BuildControls from '../components/BuildControls/BuildControls';

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
};

const BurgerBuilderPage = () => {
  const { t } = useTranslation();
  const [ingredients, setIngredients] = useState({
    salad: 0,
    bacon: 0,
    cheese: 0,
    meat: 0,  });
  const [totalPrice, setTotalPrice] = useState(4); // Хамгааны үндсэн үнэ
  const navigate = useNavigate();

  const addIngredient = (type) => {
    setIngredients((prev) => ({
      ...prev,
      [type]: prev[type] + 1,
    }));
    setTotalPrice((prev) => prev + INGREDIENT_PRICES[type]);
  };

  const removeIngredient = (type) => {
    if (ingredients[type] <= 0) return;
    setIngredients((prev) => ({
      ...prev,
      [type]: prev[type] - 1,
    }));
    setTotalPrice((prev) => prev - INGREDIENT_PRICES[type]);
  };  const handleOrder = () => {
    // Navigate to checkout with order data
    navigate('/checkout', { 
      state: { 
        ingredients, 
        totalPrice 
      } 
    });
  };  return (    <div style={{
      padding: '40px 20px',
      maxWidth: '1200px',
      margin: '0 auto',
      minHeight: '100vh',
      position: 'relative',
      zIndex: 1
    }}><div style={{
        textAlign: 'center',
        marginBottom: '40px'
      }}>        <h1 style={{
          fontSize: '3.5rem',
          background: 'linear-gradient(135deg, #D32F2F 0%, #FF5722 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          margin: '0 0 10px 0',
          fontWeight: '800',
          textShadow: '0 4px 8px rgba(0,0,0,0.1)',
          position: 'relative',
          zIndex: 1
        }}>
          {t('burgerBuilder.title')}
        </h1>
        <p style={{
          fontSize: '1.2rem',
          color: '#333',
          fontWeight: '500',
          position: 'relative',
          zIndex: 1
        }}>
          {t('burgerBuilder.subtitle')}
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '40px',
        alignItems: 'start'
      }}>        {/* Burger Display */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.95)',
          borderRadius: '20px',
          padding: '30px',
          boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
          border: '2px solid rgba(255, 107, 53, 0.2)',
          backdropFilter: 'blur(10px)',
          position: 'relative',
          zIndex: 1
        }}>
          <Burger ingredients={ingredients} />
          <div style={{
            textAlign: 'center',
            marginTop: '20px',
            padding: '15px',
            background: 'linear-gradient(135deg, #FF6B35 0%, #F7931E 100%)',
            borderRadius: '15px',
            color: 'white',
            boxShadow: '0 8px 20px rgba(255, 107, 53, 0.3)'
          }}>            <h3 style={{
              margin: '0',
              fontSize: '1.8rem',
              fontWeight: '700'
            }}>
              {t('burgerBuilder.total')}: ₮{(totalPrice * 3000).toLocaleString()}
            </h3>
            <p style={{
              margin: '5px 0 0 0',
              fontSize: '0.9rem',
              opacity: '0.9'
            }}>
              (~${totalPrice.toFixed(2)})
            </p>
          </div>
        </div>

        {/* Controls */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.95)',
          borderRadius: '20px',
          padding: '30px',
          boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
          border: '2px solid rgba(255, 107, 53, 0.2)',
          position: 'relative',
          zIndex: 1
        }}>          <h3 style={{
            margin: '0 0 25px 0',
            fontSize: '1.5rem',
            color: '#D32F2F',
            textAlign: 'center',
            fontWeight: '700'
          }}>
            {t('burgerBuilder.ingredients')}
          </h3>
          <BuildControls
            addIngredient={addIngredient}
            removeIngredient={removeIngredient}
            disabled={ingredients}
          />
          
          <button 
            onClick={handleOrder}
            style={{
              width: '100%',
              padding: '18px 30px',
              fontSize: '1.2rem',
              fontWeight: '700',
              background: 'linear-gradient(135deg, #D32F2F 0%, #F44336 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '15px',
              cursor: 'pointer',
              marginTop: '25px',
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
            {t('burgerBuilder.order')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BurgerBuilderPage;