// import { Link } from 'react-router-dom';
// import LogoImage from '../assets/logo_img.png';

// const Navbar = ({ isLoggedIn, onLogout }) => {
//   return (
//     <nav className="bg-white shadow-lg p-4 flex flex-col sm:flex-row sm:justify-between sm:items-center sticky top-0 z-50">
//       <div className="flex justify-between items-center w-full sm:w-auto">
//         {/* Logo */}
//         <Link to="/" className="flex items-center space-x-2">
//           <img src={LogoImage} alt="FoodDelivery Logo" className="h-12 w-auto" />
//           <span className="text-2xl font-bold text-orange-600">FoodDelivery</span>
//         </Link>
//       </div>

//       {/* Search Bar */}
//       <div className="relative w-full mt-4 sm:mt-0 sm:w-1/2 md:w-1/3 lg:w-80">
//         <input
//           type="text"
//           placeholder="Search for food..."
//           className="border border-gray-300 rounded-full px-4 py-2 w-full"
//         />
//       </div>

//       {/* Cart and Auth */}
//       <div className="flex items-center gap-4 mt-4 sm:mt-0">
//         <Link to="/cart" className="text-lg text-gray-700 hover:text-orange-600">
//           🛒 Cart
//         </Link>

//         {isLoggedIn ? (
//           <button
//             onClick={onLogout}
//             className="bg-orange-500 text-white px-4 py-2 rounded-full"
//           >
//             Logout
//           </button>
//         ) : (
//           <Link to="/login">
//             <button className="bg-orange-500 text-white px-4 py-2 rounded-full">
//               Sign In
//             </button>
//           </Link>
//         )}
//       </div>
//     </nav>
//   );
// };

// export default Navbar;
import React, { useContext } from 'react';  // Missing useContext import
import { Link } from 'react-router-dom';
import LogoImage from '../assets/logo_img.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { CartContext } from '../contexts/CartContext';


const Navbar = ({ isLoggedIn, onLogout }) => {
  const { cartItems} = useContext(CartContext);  // Correctly using useContext to get cartItems
  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);


  return (
    <nav className="bg-white shadow-lg p-4 flex justify-between items-center sticky top-0 z-50">
      {/* Logo */}
      <Link to="/" className="flex items-center space-x-2">
        <img src={LogoImage} alt="FoodDelivery Logo" className="h-10 w-auto sm:h-12" />
        <span className="text-xl sm:text-2xl font-bold text-orange-600">FoodDelivery</span>
      </Link>

      {/* Search Bar - Centered */}
      <div className="flex-1 max-w-lg mx-auto mt-2 sm:mt-0">
        <input
          type="text"
          placeholder="Search for food..."
          className="border border-gray-300 rounded-full px-4 py-2 w-full focus:outline-none"
        />
      </div>

      {/* Cart and Auth */}
      <div className="space-x-6 flex items-center">
        {/* Cart Icon with Badge */}
        <Link to="/cart" className="relative">

  <FontAwesomeIcon icon={faShoppingCart} className="h-6 w-6 text-gray-700" />
 
  <span className="bg-red-500 text-white rounded-full px-2 absolute -top-2 -right-2">
          {cartItemCount}
        </span>
</Link>


        {/* Auth Buttons */}
        {isLoggedIn ? (
          <button
            onClick={onLogout}
            className="bg-orange-500 text-white text-sm sm:text-base px-4 py-2 rounded-full hover:bg-orange-600 transition duration-300"
          >
            Logout
          </button>
        ) : (
          <Link to="/login">
            <button className="bg-orange-500 text-white text-sm sm:text-base px-4 py-2 rounded-full hover:bg-orange-600 transition duration-300">
              Sign In
            </button>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
