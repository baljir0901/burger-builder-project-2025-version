// src/pages/ShippingPage.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Burger from '../components/Burgers/Burger';

const ShippingPage = () => {
  const [user, setUser] = useState(null);
  const [order, setOrder] = useState(null);
  const [shippingInfo, setShippingInfo] = useState({
    address: '',
    city: '',
    zipCode: '',
    deliveryTime: 'standard'
  });
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is signed in
    const savedUser = localStorage.getItem('user');
    const savedOrder = localStorage.getItem('currentOrder');
    
    if (!savedUser) {
      alert('Эхлээд нэвтэрнэ үү.');
      navigate('/contact');
      return;
    }
    
    if (!savedOrder) {
      alert('Захиалга олдоогүй. Эхлээд захиалга үүсгэнэ үү.');
      navigate('/');
      return;
    }
    
    setUser(JSON.parse(savedUser));
    setOrder(JSON.parse(savedOrder));
  }, [navigate]);

  const handleInputChange = (e) => {
    setShippingInfo({
      ...shippingInfo,
      [e.target.name]: e.target.value
    });
  };
  
  const handleSubmitOrder = (e) => {
    e.preventDefault();
    
    if (!shippingInfo.address || !shippingInfo.city || !shippingInfo.zipCode) {
      alert('Хүргэлтийн мэдээллийг бүгдийг нь бөглөнө үү.');
      return;
    }
    
    // Calculate final price with delivery charge
    let finalPrice = order.totalPrice;
    if (shippingInfo.deliveryTime === 'express') {
      finalPrice += 2.00;
    }
    
    // Save complete order with shipping info
    const completeOrder = {
      ...order,
      totalPrice: finalPrice,
      user: user,
      shipping: shippingInfo,
      orderDate: new Date().toISOString(),
      status: 'confirmed'
    };
    
    // Save to orders history for this user
    const orderHistoryKey = `orderHistory_${user.email}`;
    const existingHistory = localStorage.getItem(orderHistoryKey);
    let orderHistory = existingHistory ? JSON.parse(existingHistory) : [];
    orderHistory.push(completeOrder);
    localStorage.setItem(orderHistoryKey, JSON.stringify(orderHistory));
    
    // Also save as last order (for backward compatibility)
    localStorage.setItem('lastOrder', JSON.stringify(completeOrder));
    localStorage.removeItem('currentOrder'); // Clear current order
    
    alert('Захиалга баталгаажлаа! Худалдан авалтанд баярлалаа.');
    navigate('/');
  };

  if (!user || !order) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        fontSize: '1.5rem',
        color: '#333'
      }}>
        ⏳ Ачааллаж байна...
      </div>
    );
  }

  return (
    <div style={{ 
      padding: '40px 20px', 
      maxWidth: '800px', 
      margin: '0 auto',
      minHeight: '100vh'
    }}>
      <div style={{
        textAlign: 'center',
        marginBottom: '40px'
      }}>
        <h1 style={{
          fontSize: '3rem',
          background: 'linear-gradient(135deg, #D32F2F 0%, #FF5722 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          margin: '0 0 10px 0',
          fontWeight: '800'
        }}>
          🚚 Хүргэлтийн мэдээлэл
        </h1>
        <p style={{
          fontSize: '1.1rem',
          color: '#333'
        }}>
          Захиалгын дэлгэрэнгүй болон хүргэлтийн хаяг
        </p>
      </div>

      <div style={{
        background: 'rgba(255, 255, 255, 0.95)',
        borderRadius: '25px',
        padding: '40px',
        boxShadow: '0 25px 50px rgba(0,0,0,0.15)',
        border: '2px solid rgba(255, 107, 53, 0.2)',
        backdropFilter: 'blur(10px)',
        marginBottom: '30px'
      }}>
        <h3 style={{
          margin: '0 0 25px 0',
          fontSize: '1.8rem',
          color: '#D32F2F',
          textAlign: 'center'
        }}>
          👤 Хэрэглэгчийн мэдээлэл
        </h3>
        
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          gap: '15px',
          padding: '25px',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          borderRadius: '15px',
          color: 'white'
        }}>
          <p style={{ margin: '0', fontSize: '1.1rem' }}>
            <strong>👤 Нэр:</strong> {user.name || 'Заагаагүй'}
          </p>
          <p style={{ margin: '0', fontSize: '1.1rem' }}>
            <strong>📧 И-мэйл:</strong> {user.email}
          </p>
          {user.phone && (
            <p style={{ margin: '0', fontSize: '1.1rem' }}>
              <strong>📱 Утас:</strong> {user.phone}
            </p>
          )}
        </div>
      </div>
        
      <div style={{
        background: 'rgba(255, 255, 255, 0.95)',
        borderRadius: '25px',
        padding: '40px',
        boxShadow: '0 25px 50px rgba(0,0,0,0.15)',
        border: '2px solid rgba(255, 107, 53, 0.2)',
        backdropFilter: 'blur(10px)',
        marginBottom: '30px'
      }}>
        <h3 style={{
          margin: '0 0 25px 0',
          fontSize: '1.8rem',
          color: '#D32F2F',
          textAlign: 'center'
        }}>
          🍔 Таны захиалга
        </h3>
        
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: '25px'
        }}>
          <Burger ingredients={order.ingredients} />
        </div>
        
        <div style={{
          textAlign: 'center',
          marginBottom: '20px',
          padding: '20px',
          background: 'linear-gradient(135deg, #FF6B35 0%, #F7931E 100%)',
          borderRadius: '15px',
          color: 'white'
        }}>
          <p style={{ 
            fontSize: '1.5rem', 
            fontWeight: '700',
            margin: '0 0 10px 0'
          }}>
            💰 Дэд нийт: ₮{(order.totalPrice * 3000).toLocaleString()}
            {shippingInfo.deliveryTime === 'express' && (
              <>
                <br/>
                <span style={{ fontSize: '1.2rem' }}>
                  🚀 Шуурхай хүргэлт: +₮6,000
                </span>
                <br/>
                <span style={{ 
                  fontSize: '1.8rem',
                  fontWeight: '800',
                  color: '#FFD700',
                  textShadow: '0 2px 4px rgba(0,0,0,0.3)'
                }}>
                  🎯 Нийт: ₮{((order.totalPrice + 2.00) * 3000).toLocaleString()}
                </span>
              </>
            )}
          </p>
          <p style={{
            margin: '5px 0 0 0',
            fontSize: '0.9rem',
            opacity: '0.9'
          }}>
            (~${order.totalPrice.toFixed(2)}{shippingInfo.deliveryTime === 'express' ? ' + $2.00' : ''})
          </p>
        </div>
        
        <div style={{
          padding: '20px',
          background: 'linear-gradient(135deg, #4ecdc4 0%, #44a08d 100%)',
          borderRadius: '15px',
          color: 'white'
        }}>
          <h4 style={{ margin: '0 0 15px 0', fontSize: '1.3rem' }}>🥗 Найрлага:</h4>
          <ul style={{ margin: '0', paddingLeft: '20px' }}>
            {Object.entries(order.ingredients).map(([ingredient, count]) => (
              count > 0 && (
                <li key={ingredient} style={{ marginBottom: '5px', fontSize: '1.1rem' }}>
                  {ingredient === 'salad' && '🥬 Салат'}
                  {ingredient === 'bacon' && '🥓 Гахайн мах'}
                  {ingredient === 'cheese' && '🧀 Бяслаг'}
                  {ingredient === 'meat' && '🥩 Үхрийн мах'}: {count}
                </li>
              )
            ))}
          </ul>
        </div>
      </div>
      
      <div style={{
        background: 'rgba(255, 255, 255, 0.95)',
        borderRadius: '25px',
        padding: '40px',
        boxShadow: '0 25px 50px rgba(0,0,0,0.15)',
        border: '2px solid rgba(255, 107, 53, 0.2)',
        backdropFilter: 'blur(10px)'
      }}>
        <form onSubmit={handleSubmitOrder}>
          <h3 style={{
            margin: '0 0 30px 0',
            fontSize: '1.8rem',
            color: '#D32F2F',
            textAlign: 'center'
          }}>
            🏠 Хүргэлтийн хаяг
          </h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <input
              type="text"
              name="address"
              placeholder="🏠 Гудамжны хаяг"
              value={shippingInfo.address}
              onChange={handleInputChange}
              required
              style={{ 
                padding: '15px 20px', 
                borderRadius: '15px', 
                border: '2px solid #e1e5e9',
                fontSize: '1rem',
                transition: 'all 0.3s ease',
                outline: 'none'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#D32F2F';
                e.target.style.boxShadow = '0 0 20px rgba(211, 47, 47, 0.2)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#e1e5e9';
                e.target.style.boxShadow = 'none';
              }}
            />
            
            <input
              type="text"
              name="city"
              placeholder="🏙️ Хот/Дүүрэг"
              value={shippingInfo.city}
              onChange={handleInputChange}
              required
              style={{ 
                padding: '15px 20px', 
                borderRadius: '15px', 
                border: '2px solid #e1e5e9',
                fontSize: '1rem',
                transition: 'all 0.3s ease',
                outline: 'none'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#D32F2F';
                e.target.style.boxShadow = '0 0 20px rgba(211, 47, 47, 0.2)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#e1e5e9';
                e.target.style.boxShadow = 'none';
              }}
            />
            
            <input
              type="text"
              name="zipCode"
              placeholder="📮 Шуудангийн код"
              value={shippingInfo.zipCode}
              onChange={handleInputChange}
              required
              style={{ 
                padding: '15px 20px', 
                borderRadius: '15px', 
                border: '2px solid #e1e5e9',
                fontSize: '1rem',
                transition: 'all 0.3s ease',
                outline: 'none'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#D32F2F';
                e.target.style.boxShadow = '0 0 20px rgba(211, 47, 47, 0.2)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#e1e5e9';
                e.target.style.boxShadow = 'none';
              }}
            />
            
            <div style={{
              padding: '20px',
              background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
              borderRadius: '15px',
              color: 'white'
            }}>
              <label style={{ 
                display: 'block', 
                marginBottom: '15px',
                fontSize: '1.2rem',
                fontWeight: '700'
              }}>
                ⏰ Хүргэлтийн хугацаа:
              </label>
              <select
                name="deliveryTime"
                value={shippingInfo.deliveryTime}
                onChange={handleInputChange}
                style={{ 
                  padding: '15px 20px', 
                  borderRadius: '15px', 
                  border: 'none',
                  width: '100%',
                  fontSize: '1rem',
                  outline: 'none',
                  cursor: 'pointer',
                  background: 'white',
                  color: '#333'
                }}
              >
                <option value="standard">🕒 Стандарт (30-45 минут)</option>
                <option value="express">⚡ Шуурхай (15-20 минут) +₮6,000</option>
              </select>
            </div>
            
            <div style={{ 
              display: 'flex', 
              gap: '15px', 
              marginTop: '30px',
              justifyContent: 'center',
              flexWrap: 'wrap'
            }}>
              <button 
                type="button"
                onClick={() => navigate('/contact')}
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
                ← Буцах
              </button>
              
              <button 
                type="submit"
                style={{
                  padding: '15px 30px',
                  background: 'linear-gradient(135deg, #4CAF50 0%, #45a049 100%)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '15px',
                  cursor: 'pointer',
                  fontSize: '1.1rem',
                  fontWeight: '600',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 8px 20px rgba(76, 175, 80, 0.3)',
                  textTransform: 'uppercase',
                  letterSpacing: '1px'
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-3px)';
                  e.target.style.boxShadow = '0 12px 25px rgba(76, 175, 80, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 8px 20px rgba(76, 175, 80, 0.3)';
                }}
              >
                ✅ Захиалга батлах
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ShippingPage;
