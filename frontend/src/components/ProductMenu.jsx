// import React, { useState, useEffect } from "react";
// import { API_URL } from "../api";
// import { useParams } from "react-router-dom";

// const ProductMenu = () => {
//   const [products, setProducts] = useState([]);

//   const { firmId, firmName } = useParams();

//   const productHandler = async () => {
//     try {
//       const response = await fetch(`${API_URL}/product/${firmId}/products`);
//       const newProductData = await response.json();
//       setProducts(newProductData.products);
//     } catch (error) {
//       console.error("product failed to fetch", error);
//     }
//   };

//   useEffect(() => {
//     productHandler();
//   }, []);

//   return (
//     <section className="flex flex-col px-4 sm:px-36 mt-24 space-y-6 mb-16">
//       <h3 className="text-center text-white text-2xl sm:text-3xl font-bold py-2 bg-gradient-to-r from-orange-400 to-yellow-500 rounded-lg shadow-md">
//         {firmName}
//       </h3>
//       {products.map((item) => {
//         return (
//           <div className="flex flex-col sm:flex-row justify-between px-4 sm:px-8 py-4 bg-white shadow-lg rounded-lg hover:scale-105 transform transition-all duration-300 ease-in-out relative border border-gray-200">
//             <div className="space-y-2 sm:space-y-4">
//               <div className="text-lg sm:text-xl font-semibold text-gray-800">{item.productName}</div>
//               <div className="text-md sm:text-lg text-gray-600">₹{item.price}</div>
//               <div className="text-sm sm:text-base text-gray-500">{item.description}</div>
//             </div>
//             <div className="flex flex-col items-center sm:items-start sm:ml-4">
//               <img
//                 src={`${API_URL}/uploads/${item.image}`}
//                 alt={item.productName}
//                 className="w-20 sm:w-28 h-20 sm:h-28 object-cover rounded-lg shadow-md mb-3"
//               />
//                <div className="bg-gradient-to-r from-green-400 to-teal-500 text-white text-center py-2 px-4 rounded-full cursor-pointer transform hover:scale-110 transition-all duration-300 ease-in-out absolute bottom-2 sm:static w-full max-w-[80px] ml-2">
//                 ADD
//               </div> 
              
//             </div>
//           </div>
//         );
//       })}
//     </section>
//   );
// };

// export default ProductMenu;


import React, { useState, useEffect, useContext } from "react";
import { API_URL } from "../api";
import { useParams } from "react-router-dom";
import { CartContext } from "../contexts/CartContext";

const ProductMenu = () => {
  const [products, setProducts] = useState([]);
  const { firmId, firmName } = useParams();
  const { addToCart } = useContext(CartContext);

  const productHandler = async () => {
    try {
      const response = await fetch(`${API_URL}/product/${firmId}/products`);
      const newProductData = await response.json();
      setProducts(newProductData.products);
    } catch (error) {
      console.error("product failed to fetch", error);
    }
  };

  useEffect(() => {
    productHandler();
  }, []);

  return (
    <section className="flex flex-col px-4 sm:px-8 lg:px-36 mt-24 space-y-6 mb-16">
    <h3 className="text-center text-white text-2xl sm:text-3xl font-bold py-2 bg-gradient-to-r from-orange-400 to-yellow-500 rounded-lg shadow-md">
      {firmName}
    </h3>
    {products.map((item) => (
      <div
        key={item._id}
        className="flex flex-col sm:flex-row justify-between px-4 sm:px-8 py-4 bg-white shadow-lg rounded-lg hover:scale-105 transform transition-all duration-300 ease-in-out relative border border-gray-200"
      >
        <div className="space-y-2 sm:space-y-4 flex-1">
          <div className="text-lg sm:text-xl font-semibold text-gray-800">
            {item.productName}
          </div>
          <div className="text-md sm:text-lg text-gray-600">₹{item.price}</div>
          <div className="text-sm sm:text-base text-gray-500">
            {item.description}
          </div>
        </div>
        <div className="flex flex-col items-center sm:items-start sm:ml-4 relative sm:static">
          <img
            src={`${API_URL}/uploads/${item.image}`}
            alt={item.productName}
            className="w-20 sm:w-28 h-20 sm:h-28 object-cover rounded-lg shadow-md mb-3"
          />
          <div
            onClick={() => addToCart(item, firmName)}
            className="bg-gradient-to-r from-green-400 to-teal-500 text-white text-center py-2 px-4 rounded-full cursor-pointer transform hover:scale-110 transition-all duration-300 ease-in-out absolute sm:static bottom-2 sm:bottom-auto w-full max-w-[80px] ml-2"
          >
            ADD
          </div>
        </div>
      </div>
    ))}
  </section>
  
  );
};

export default ProductMenu;
