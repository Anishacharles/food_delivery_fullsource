// // import React, { useState } from 'react'
// // import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// // import Navbar from './components/Navbar';
// // import Footer from './components/Footer';
// // import Home from './pages/Home';
// // import { ToastContainer } from 'react-toastify';
// // import 'react-toastify/dist/ReactToastify.css';
// // import Login from './components/Login';


// // function App() {
// //   const [isLoggedIn, setIsLoggedIn] = useState(false);
// //   const loginHandler = () => setIsLoggedIn(true);
// //   const logoutHandler = () => setIsLoggedIn(false);  
// //   return (
// //         <>
// //           {/* <ToastContainer/>
// //           {showLogin?<Login setShowLogin={setShowLogin}/>:<></>} */}
// //             <Navbar isLoggedIn={isLoggedIn} onLogout={logoutHandler} />
// //             <Routes>
// //                 <Route path="/" element={<Home />} />
// //                 <Route path="/login" element={<Login />} />


// //             </Routes>
// //             <Footer />
// //         </>
// //     );
// // }

// // export default App;

// // import React, { useState } from 'react';
// // import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// // import Navbar from './components/Navbar';
// // import Footer from './components/Footer';
// // import Home from './pages/Home';
// // import { ToastContainer } from 'react-toastify';
// // import 'react-toastify/dist/ReactToastify.css';
// // import Login from './components/Login';

// // function App() {
// //   const [isLoggedIn, setIsLoggedIn] = useState(false);

// //   // Handlers for login and logout
// //   const loginHandler = () => setIsLoggedIn(true);
// //   const logoutHandler = () => setIsLoggedIn(false);

// //   return (
// //     <Router> {/* Make sure Router is wrapping your app */}
// //       <ToastContainer /> {/* This will display toast notifications */}

// //       <Navbar isLoggedIn={isLoggedIn} onLogout={logoutHandler} />

// //       <Routes>
// //         {/* Render the Home component when visiting "/" */}
// //         <Route path="/" element={<Home />} />

// //         {/* Pass loginHandler as a prop if needed */}
// //         <Route path="/login" element={<Login onLogin={loginHandler} />} />
// //       </Routes>

// //       <Footer />
// //     </Router>
// //   );
// // }

// // export default App;
import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './components/Login';
import ProductMenu from './components/ProductMenu';
import Cart from './components/Cart'; // Cart Page
import { CartProvider } from './contexts/CartContext'; // Import CartProvider
import OrderStatusPage from './components/OrderStatusPage';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const loginHandler = () => setIsLoggedIn(true);
  const logoutHandler = () => setIsLoggedIn(false);

  return (
    <CartProvider>
      <ToastContainer /> 

      <Navbar isLoggedIn={isLoggedIn} onLogout={logoutHandler} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login onLogin={loginHandler} />} />
        <Route path="/products/:firmId/:firmName" element={<ProductMenu />} />
        <Route path="/cart" element={<Cart />} /> {/* Ensure Cart Page Route */}
        <Route path="/order-status" element={<OrderStatusPage />} />

      </Routes>

      <Footer />
    </CartProvider>
  );
}

export default App;
