// src/pages/OrdersPage.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Burger from '../components/Burgers/Burger';

const OrdersPage = () => {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already signed in
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      const userData = JSON.parse(savedUser);
      setUser(userData);
      setIsSignedIn(true);
      loadUserOrders(userData);
    }
  }, []);

  const loadUserOrders = (userData) => {
    // Load all orders for this user from localStorage
    const allOrders = [];
    
    // Get the last completed order
    const lastOrder = localStorage.getItem('lastOrder');
    if (lastOrder) {
      const orderData = JSON.parse(lastOrder);
      if (orderData.user && orderData.user.email === userData.email) {
        allOrders.push(orderData);
      }
    }
    
    // You could expand this to load multiple orders from a more complex storage system
    // For now, we'll just show the last order and any orders stored in an array
    const orderHistory = localStorage.getItem(`orderHistory_${userData.email}`);
    if (orderHistory) {
      const historyOrders = JSON.parse(orderHistory);
      allOrders.push(...historyOrders);
    }
    
    setOrders(allOrders);
  };

  const handleInputChange = (e) => {
    setLoginForm({
      ...loginForm,
      [e.target.name]: e.target.value
    });
  };

  const handleSignIn = (e) => {
    e.preventDefault();
    
    // Check if user exists
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      const userData = JSON.parse(savedUser);
      if (userData.email === loginForm.email) {
        setUser(userData);
        setIsSignedIn(true);
        loadUserOrders(userData);        alert('Амжилттай нэвтэрлээ!');
      } else {
        alert('Хэрэглэгч олдсонгүй. И-мэйлээ шалгах эсвэл эхлээд бүртгүүлнэ үү.');
      }
    } else {
      alert('Бүртгэл байхгүй. Эхлээд холбоо барих хуудсанд бүртгүүлнэ үү.');
    }
  };

  const handleSignOut = () => {
    setUser(null);
    setIsSignedIn(false);
    setOrders([]);
    setLoginForm({ email: '', password: '' });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  };
  const getIngredientsList = (ingredients) => {
    const ingredientNames = {
      salad: 'Салат',
      bacon: 'Гахайн мах', 
      cheese: 'Бяслаг',
      meat: 'Үхрийн мах'
    };
    
    return Object.entries(ingredients)
      .filter(([, count]) => count > 0)
      .map(([ingredient, count]) => `${ingredientNames[ingredient] || ingredient}: ${count}`)
      .join(', ');
  };
  if (!isSignedIn) {
    return (
      <div style={{ 
        padding: '40px 20px', 
        maxWidth: '500px', 
        margin: '0 auto',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
      }}>
        <div style={{
          background: 'white',
          borderRadius: '25px',
          padding: '40px',
          boxShadow: '0 25px 50px rgba(0,0,0,0.1)',
          border: '1px solid rgba(255,255,255,0.2)',
          backdropFilter: 'blur(10px)'
        }}>          <h2 style={{
            textAlign: 'center',
            fontSize: '2.5rem',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            margin: '0 0 30px 0',
            fontWeight: '800'
          }}>
            🔐 Нэвтрэх
          </h2>
          
          <p style={{
            textAlign: 'center',
            color: '#666',
            marginBottom: '30px',
            fontSize: '1.1rem'
          }}>
            Захиалгын түүхээ үзэх
          </p>
          
          <form onSubmit={handleSignIn} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>            <input
              type="email"
              name="email"
              placeholder="И-мэйл хаяг"
              value={loginForm.email}
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
                e.target.style.borderColor = '#667eea';
                e.target.style.boxShadow = '0 0 20px rgba(102, 126, 234, 0.2)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#e1e5e9';
                e.target.style.boxShadow = 'none';
              }}
            />
              <input
              type="password"
              name="password"
              placeholder="Нууц үг"
              value={loginForm.password}
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
                e.target.style.borderColor = '#667eea';
                e.target.style.boxShadow = '0 0 20px rgba(102, 126, 234, 0.2)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#e1e5e9';
                e.target.style.boxShadow = 'none';
              }}
            />
            
            <button 
              type="submit"
              style={{
                padding: '15px',
                background: 'linear-gradient(135deg, #4CAF50 0%, #45a049 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '15px',
                cursor: 'pointer',
                fontSize: '1.1rem',
                fontWeight: '700',
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
              }}            >
              🚀 Нэвтрэх
            </button>
          </form>
            <p style={{ textAlign: 'center', marginTop: '30px', color: '#666' }}>
            Бүртгэлгүй юу?{' '}
            <button 
              onClick={() => navigate('/contact')}
              style={{
                background: 'none',
                border: 'none',
                color: '#667eea',
                cursor: 'pointer',
                textDecoration: 'underline',
                fontSize: '1rem',
                fontWeight: '600'
              }}
            >
              Энд бүртгүүлэх
            </button>
          </p>
        </div>
      </div>
    );
  }
  return (
    <div style={{ 
      padding: '40px 20px', 
      maxWidth: '1000px', 
      margin: '0 auto',
      minHeight: '100vh'
    }}>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginBottom: '40px',
        background: 'white',
        padding: '25px 30px',
        borderRadius: '20px',
        boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
      }}>
        <div>
          <h2 style={{
            fontSize: '2.5rem',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            margin: '0',
            fontWeight: '800'
          }}>
            📦 Миний захиалгууд
          </h2>          <p style={{ margin: '5px 0 0 0', color: '#666', fontSize: '1.1rem' }}>
            Буцаж ирсэнд баярлалаа, {user.name || user.email}!
          </p>
        </div>
        <button 
          onClick={handleSignOut}
          style={{
            padding: '12px 25px',
            background: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a52 100%)',
            color: 'white',
            border: 'none',
            borderRadius: '15px',
            cursor: 'pointer',
            fontSize: '1rem',
            fontWeight: '600',
            transition: 'all 0.3s ease',
            boxShadow: '0 5px 15px rgba(255, 107, 107, 0.3)'
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = 'translateY(-2px)';
            e.target.style.boxShadow = '0 8px 20px rgba(255, 107, 107, 0.4)';
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = '0 5px 15px rgba(255, 107, 107, 0.3)';
          }}          >
            🚪 Гарах
          </button>
      </div>

      {orders.length === 0 ? (
        <div style={{
          textAlign: 'center',
          padding: '60px 40px',
          background: 'white',
          borderRadius: '25px',
          boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
        }}>
          <div style={{ fontSize: '4rem', marginBottom: '20px' }}>🍔</div>          <h3 style={{
            fontSize: '2rem',
            color: '#333',
            margin: '0 0 15px 0'
          }}>
            Захиалга байхгүй
          </h3>
          <p style={{
            color: '#666',
            fontSize: '1.1rem',
            marginBottom: '30px'
          }}>
            Эхний амттай хамгаалагчаа бэлдэж эхлээрэй!
          </p>
          <button 
            onClick={() => navigate('/')}
            style={{
              padding: '15px 30px',
              background: 'linear-gradient(135deg, #4CAF50 0%, #45a049 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '15px',
              cursor: 'pointer',
              fontSize: '1.1rem',
              fontWeight: '700',
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
            }}            >
              🍔 Бэлдэж эхлэх
            </button>
        </div>
      ) : (
        <div>
          <div style={{
            background: 'white',
            padding: '20px 30px',
            borderRadius: '15px',
            marginBottom: '30px',
            boxShadow: '0 5px 15px rgba(0,0,0,0.05)',
            textAlign: 'center'
          }}>            <p style={{ 
              margin: '0',
              fontSize: '1.2rem',
              color: '#4CAF50',
              fontWeight: '600'
            }}>
              📊 Нийт захиалга: {orders.length}
            </p>
          </div>
          
          {orders.map((order, index) => (
            <div 
              key={index} 
              style={{ 
                background: 'white',
                borderRadius: '25px', 
                padding: '30px', 
                marginBottom: '25px',
                boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                border: '1px solid rgba(255,255,255,0.2)',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-5px)';
                e.target.style.boxShadow = '0 25px 50px rgba(0,0,0,0.15)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 20px 40px rgba(0,0,0,0.1)';
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '25px' }}>
                <h3 style={{
                  margin: '0',
                  fontSize: '1.5rem',
                  color: '#333'
                }}>
                  🧾 Захиалга №{index + 1}
                </h3>
                <div style={{ textAlign: 'right' }}>                <div style={{ 
                  fontSize: '1.8rem', 
                  fontWeight: '700', 
                  background: 'linear-gradient(135deg, #4CAF50 0%, #45a049 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}>
                  ₮{(order.totalPrice * 3000).toLocaleString()}
                </div>
                <div style={{ 
                  fontSize: '0.9rem', 
                  color: '#666',
                  marginTop: '5px'
                }}>
                  📅 {formatDate(order.orderDate)}
                </div>
                </div>
              </div>
              
              <div style={{ display: 'flex', gap: '30px', flexWrap: 'wrap' }}>
                <div style={{ flex: '1', minWidth: '300px' }}>
                  <Burger ingredients={order.ingredients} />
                </div>
                
                <div style={{ flex: '1', minWidth: '300px' }}>
                  <div style={{ 
                    marginBottom: '20px',
                    padding: '20px',
                    background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                    borderRadius: '15px',
                    color: 'white'
                  }}>
                    <h4 style={{ margin: '0 0 10px 0', fontSize: '1.2rem' }}>🥗 Найрлага:</h4>
                    <p style={{ margin: '0', fontSize: '1rem' }}>{getIngredientsList(order.ingredients)}</p>
                  </div>
                  
                  {order.shipping && (
                    <div style={{ 
                      marginBottom: '20px',
                      padding: '20px',
                      background: 'linear-gradient(135deg, #4ecdc4 0%, #44a08d 100%)',
                      borderRadius: '15px',
                      color: 'white'
                    }}>
                      <h4 style={{ margin: '0 0 10px 0', fontSize: '1.2rem' }}>🚚 Хүргэлт:</h4>                      <p style={{ margin: '0', fontSize: '0.95rem' }}>
                        {order.shipping.address}<br/>
                        {order.shipping.city}, {order.shipping.zipCode}<br/>
                        <strong>Төрөл:</strong> {order.shipping.deliveryTime === 'standard' ? 'Стандарт' : 'Шуурхай'}
                      </p>
                    </div>
                  )}
                  
                  <div style={{
                    padding: '15px 20px',
                    background: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
                    borderRadius: '15px',
                    textAlign: 'center'
                  }}>
                    <span style={{ 
                      fontSize: '1rem',
                      fontWeight: '700',
                      color: '#333'
                    }}>
                      ✅ {order.status === 'confirmed' ? 'Баталгаажсан' : order.status || 'Баталгаажсан'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrdersPage;
