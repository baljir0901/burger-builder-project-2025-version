// src/pages/ContactPage.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ContactPage = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    phone: ''
  });
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already signed in
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (isSignUp) {
      // Sign up logic
      const userData = {
        email: formData.email,
        name: formData.name,
        phone: formData.phone,
        signedUpAt: new Date().toISOString()
      };
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
      alert('Хэрэглэгчийн бүртгэл амжилттай үүслээ!');
    } else {
      // Sign in logic (simplified - just check if email exists)
      const savedUser = localStorage.getItem('user');
      if (savedUser) {
        const userData = JSON.parse(savedUser);
        if (userData.email === formData.email) {
          setUser(userData);
          alert('Амжилттай нэвтэрлээ!');
        } else {
          alert('Хэрэглэгч олдсонгүй. Эхлээд бүртгүүлнэ үү.');
        }
      } else {
        alert('Бүртгэл олдсонгүй. Эхлээд бүртгүүлнэ үү.');
      }
    }
  };

  const handleContinueToShipping = () => {
    if (user) {
      navigate('/shipping');
    } else {
      alert('Эхлээд нэвтэрнэ үү.');
    }
  };

  if (user) {
    return (
      <div style={{ 
        padding: '40px 20px', 
        maxWidth: '600px', 
        margin: '0 auto',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
      }}>
        <div style={{
          background: 'rgba(255, 255, 255, 0.95)',
          borderRadius: '25px',
          padding: '40px',
          boxShadow: '0 25px 50px rgba(0,0,0,0.15)',
          border: '2px solid rgba(255, 107, 53, 0.2)',
          backdropFilter: 'blur(10px)'
        }}>
          <h2 style={{
            textAlign: 'center',
            fontSize: '2.5rem',
            background: 'linear-gradient(135deg, #D32F2F 0%, #FF5722 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            margin: '0 0 30px 0',
            fontWeight: '800'
          }}>
            🎉 Тавтай морил, {user.name || user.email}!
          </h2>
          
          <div style={{ 
            marginBottom: '30px',
            padding: '25px',
            background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
            borderRadius: '15px',
            color: 'white'
          }}>
            <p style={{ margin: '0 0 10px 0', fontSize: '1.1rem' }}>
              <strong>📧 И-мэйл:</strong> {user.email}
            </p>
            {user.name && (
              <p style={{ margin: '0 0 10px 0', fontSize: '1.1rem' }}>
                <strong>👤 Нэр:</strong> {user.name}
              </p>
            )}
            {user.phone && (
              <p style={{ margin: '0', fontSize: '1.1rem' }}>
                <strong>📱 Утас:</strong> {user.phone}
              </p>
            )}
          </div>
          
          <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
            <button 
              onClick={handleContinueToShipping}
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
              }}
            >
              🚚 Хүргэлт рүү
            </button>
            
            <button 
              onClick={() => {
                localStorage.removeItem('user');
                setUser(null);
              }}
              style={{
                padding: '15px 30px',
                background: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a52 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '15px',
                cursor: 'pointer',
                fontSize: '1.1rem',
                fontWeight: '700',
                transition: 'all 0.3s ease',
                boxShadow: '0 8px 20px rgba(255, 107, 107, 0.3)',
                textTransform: 'uppercase',
                letterSpacing: '1px'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-3px)';
                e.target.style.boxShadow = '0 12px 25px rgba(255, 107, 107, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 8px 20px rgba(255, 107, 107, 0.3)';
              }}
            >
              🚪 Гарах
            </button>
          </div>
        </div>
      </div>
    );
  }

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
        background: 'rgba(255, 255, 255, 0.95)',
        borderRadius: '25px',
        padding: '40px',
        boxShadow: '0 25px 50px rgba(0,0,0,0.15)',
        border: '2px solid rgba(255, 107, 53, 0.2)',
        backdropFilter: 'blur(10px)'
      }}>
        <h2 style={{
          textAlign: 'center',
          fontSize: '2.5rem',
          background: 'linear-gradient(135deg, #D32F2F 0%, #FF5722 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          margin: '0 0 30px 0',
          fontWeight: '800'
        }}>
          {isSignUp ? '📝 Бүртгүүлэх' : '🔐 Нэвтрэх'}
        </h2>
        
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {isSignUp && (
            <input
              type="text"
              name="name"
              placeholder="Бүтэн нэр"
              value={formData.name}
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
          )}
          
          <input
            type="email"
            name="email"
            placeholder="И-мэйл хаяг"
            value={formData.email}
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
            type="password"
            name="password"
            placeholder="Нууц үг"
            value={formData.password}
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
          
          {isSignUp && (
            <input
              type="tel"
              name="phone"
              placeholder="Утасны дугаар"
              value={formData.phone}
              onChange={handleInputChange}
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
          )}
          
          <button 
            type="submit"
            style={{
              padding: '15px',
              background: 'linear-gradient(135deg, #D32F2F 0%, #F44336 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '15px',
              cursor: 'pointer',
              fontSize: '1.1rem',
              fontWeight: '700',
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
            {isSignUp ? '🚀 Бүртгүүлэх' : '🔑 Нэвтрэх'}
          </button>
        </form>
        
        <p style={{ textAlign: 'center', marginTop: '30px', color: '#666' }}>
          {isSignUp ? 'Аль хэдийн бүртгэлтэй юу?' : 'Бүртгэлгүй юу?'}{' '}
          <button 
            onClick={() => setIsSignUp(!isSignUp)}
            style={{
              background: 'none',
              border: 'none',
              color: '#D32F2F',
              cursor: 'pointer',
              textDecoration: 'underline',
              fontSize: '1rem',
              fontWeight: '600'
            }}
          >
            {isSignUp ? 'Нэвтрэх' : 'Бүртгүүлэх'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default ContactPage;
