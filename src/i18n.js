import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      // Navigation
      nav: {
        login: "Login",
        burger: "Burger Builder",
        checkout: "Checkout",
        contact: "Contact",
        shipping: "Shipping"
      },
      
      // Burger Builder Page
      burgerBuilder: {
        title: "🍔 Burger Builder",
        subtitle: "Build your favorite burger",
        ingredients: "Choose Ingredients",
        total: "Total",
        order: "Order Now"
      },
        // Ingredients
      ingredients: {
        salad: "🥬 Lettuce",
        bacon: "🥓 Bacon", 
        cheese: "🧀 Cheese",
        meat: "🥩 Beef",
        add: "Add",
        remove: "Remove",
        pleaseAdd: "Please add some ingredients here!"
      },
      
      // Checkout Page
      checkout: {
        title: "🧾 Checkout",
        subtitle: "Review and confirm your order",
        details: "Order Details",
        total: "Total",
        back: "← Back",
        confirm: "✓ Confirm Order"
      },
      
      // Contact Page
      contact: {
        signUp: "📝 Sign Up",
        signIn: "🔐 Sign In",
        welcome: "🎉 Welcome",
        fullName: "Full Name",
        email: "Email Address",
        password: "Password",
        phone: "Phone Number",
        continueShipping: "🚚 Continue to Shipping",
        signOut: "🚪 Sign Out",
        noAccount: "Don't have an account?",
        haveAccount: "Already have an account?",
        createAccount: "🚀 Create Account",
        signInButton: "🔑 Sign In"
      },
      
      // Shipping Page
      shipping: {
        title: "🚚 Shipping Information",
        subtitle: "Order details and delivery address",
        customerInfo: "👤 Customer Information",
        yourOrder: "🍔 Your Order",
        subtotal: "💰 Subtotal",
        expressDelivery: "🚀 Express Delivery",
        total: "🎯 Total",
        ingredients: "🥗 Ingredients",
        deliveryAddress: "🏠 Delivery Address",
        streetAddress: "🏠 Street Address",
        city: "🏙️ City",
        zipCode: "📮 ZIP Code",
        deliveryTime: "⏰ Delivery Time",
        standard: "🕒 Standard (30-45 minutes)",
        express: "⚡ Express (15-20 minutes)",
        back: "← Back",
        confirmOrder: "✅ Confirm Order",
        name: "Name",
        notProvided: "Not provided",
        type: "Type",
        loading: "⏳ Loading..."
      },
      
      // Orders Page
      orders: {
        signInTitle: "🔐 Sign In",
        signInSubtitle: "Access your order history",
        signInButton: "🚀 Sign In",
        noAccount: "Don't have an account?",
        signUpHere: "Sign Up Here",
        myOrders: "📦 My Orders",
        welcomeBack: "Welcome back",
        signOutButton: "🚪 Sign Out",
        noOrders: "No Orders Yet",
        noOrdersText: "Start building your first delicious burger!",
        startBuilding: "🍔 Start Building",
        totalOrders: "📊 Total Orders",
        order: "🧾 Order #",
        ingredients: "🥗 Ingredients",
        delivery: "🚚 Delivery",
        type: "Type",
        standard: "Standard", 
        express: "Express",
        confirmed: "Confirmed"
      },
      
      // Messages
      messages: {
        signInFirst: "Please sign in first.",
        noOrderFound: "No order found. Please create an order first.",
        fillShippingInfo: "Please fill in all shipping information.",
        orderConfirmed: "Order confirmed! Thank you for your purchase.",
        accountCreated: "Account created successfully!",
        signedInSuccess: "Signed in successfully!",
        userNotFound: "User not found. Please check your email or sign up first.",
        noAccountFound: "No account found. Please sign up first on the Contact page.",
        signInFirstMessage: "Please sign in first.",
        createOrderFirst: "No order found. Please create an order first."
      },
      
      // Common
      common: {
        loading: "Loading...",
        name: "Name",
        email: "Email",
        phone: "Phone"
      }
    }
  },
  mn: {
    translation: {
      // Navigation
      nav: {
        login: "Нэвтрэх",
        burger: "Бургер",
        checkout: "Төлбөр",
        contact: "Холбоо барих",
        shipping: "Хүргэлт"
      },
      
      // Burger Builder Page
      burgerBuilder: {
        title: "🍔 Бургерээ бүтээе",
        subtitle: "Таны дуртай бургерээ өөрөө бэлдээрэй",
        ingredients: "🥗 Эндээс жороо нэмээрэй",
        total: "Нийт",
        order: "🚀 Захиалах"
      },
        // Ingredients
      ingredients: {
        salad: "🥬 Салат",
        bacon: "🥓 Гахайн мах",
        cheese: "🧀 Бяслаг", 
        meat: "🥩 Үхрийн мах",
        add: "Нэмэх",
        remove: "Хасах",
        pleaseAdd: "Энд жор нэмээрэй!"
      },
      
      // Checkout Page
      checkout: {
        title: "🧾 Төлбөр тооцоо",
        subtitle: "Захиалгаа шалгаад баталгаажуулаарай",
        details: "📋 Захиалгын дэлгэрэнгүй",
        total: "Нийт",
        back: "← Буцах",
        confirm: "✓ Захиалга баталгаажуулах"
      },
      
      // Contact Page
      contact: {
        signUp: "📝 Бүртгүүлэх",
        signIn: "🔐 Нэвтрэх",
        welcome: "🎉 Тавтай морил",
        fullName: "Бүтэн нэр",
        email: "И-мэйл хаяг",
        password: "Нууц үг",
        phone: "Утасны дугаар",
        continueShipping: "🚚 Хүргэлт рүү",
        signOut: "🚪 Гарах",
        noAccount: "Бүртгэлгүй юу?",
        haveAccount: "Аль хэдийн бүртгэлтэй юу?",
        createAccount: "🚀 Бүртгүүлэх",
        signInButton: "🔑 Нэвтрэх"
      },
      
      // Shipping Page
      shipping: {
        title: "🚚 Хүргэлтийн мэдээлэл",
        subtitle: "Захиалгын дэлгэрэнгүй болон хүргэлтийн хаяг",
        customerInfo: "👤 Хэрэглэгчийн мэдээлэл",
        yourOrder: "🍔 Таны захиалга",
        subtotal: "💰 Дэд нийт",
        expressDelivery: "🚀 Шуурхай хүргэлт",
        total: "🎯 Нийт",
        ingredients: "🥗 Найрлага",
        deliveryAddress: "🏠 Хүргэлтийн хаяг",
        streetAddress: "🏠 Гудамжны хаяг",
        city: "🏙️ Хот/Дүүрэг",
        zipCode: "📮 Шуудангийн код",
        deliveryTime: "⏰ Хүргэлтийн хугацаа",
        standard: "🕒 Стандарт (30-45 минут)",
        express: "⚡ Шуурхай (15-20 минут)",
        back: "← Буцах",
        confirmOrder: "✅ Захиалга батлах",
        name: "Нэр",
        notProvided: "Заагаагүй",
        type: "Төрөл",
        loading: "⏳ Ачааллаж байна..."
      },
      
      // Orders Page
      orders: {
        signInTitle: "🔐 Нэвтрэх",
        signInSubtitle: "Захиалгын түүхээ үзэх",
        signInButton: "🚀 Нэвтрэх",
        noAccount: "Бүртгэлгүй юу?",
        signUpHere: "Энд бүртгүүлэх",
        myOrders: "📦 Миний захиалгууд",
        welcomeBack: "Буцаж ирсэнд баярлалаа",
        signOutButton: "🚪 Гарах",
        noOrders: "Захиалга байхгүй",
        noOrdersText: "Эхний амттай бургерээ бэлдэж эхлээрэй!",
        startBuilding: "🍔 Бэлдэж эхлэх",
        totalOrders: "📊 Нийт захиалга",
        order: "🧾 Захиалга №",
        ingredients: "🥗 Найрлага",
        delivery: "🚚 Хүргэлт",
        type: "Төрөл",
        standard: "Стандарт",
        express: "Шуурхай", 
        confirmed: "Баталгаажсан"
      },
      
      // Messages
      messages: {
        signInFirst: "Эхлээд нэвтэрнэ үү.",
        noOrderFound: "Захиалга олдоогүй. Эхлээд захиалга үүсгэнэ үү.",
        fillShippingInfo: "Хүргэлтийн мэдээллийг бүгдийг нь бөглөнө үү.",
        orderConfirmed: "Захиалга баталгаажлаа! Худалдан авалтанд баярлалаа.",
        accountCreated: "Хэрэглэгчийн бүртгэл амжилттай үүслээ!",
        signedInSuccess: "Амжилттай нэвтэрлээ!",
        userNotFound: "Хэрэглэгч олдсонгүй. И-мэйлээ шалгах эсвэл эхлээд бүртгүүлнэ үү.",
        noAccountFound: "Бүртгэл байхгүй. Эхлээд холбоо барих хуудсанд бүртгүүлнэ үү.",
        signInFirstMessage: "Эхлээд нэвтэрнэ үү.",
        createOrderFirst: "Захиалга олдоогүй. Эхлээд захиалга үүсгэнэ үү."
      },
      
      // Common
      common: {
        loading: "Ачааллаж байна...",
        name: "Нэр",
        email: "И-мэйл",
        phone: "Утас"
      }
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    lng: 'en', // default language
    debug: false,
    
    interpolation: {
      escapeValue: false
    },
    
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage']
    }
  });

export default i18n;
