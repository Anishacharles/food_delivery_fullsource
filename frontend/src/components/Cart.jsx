

// import React, { useContext } from "react";
// import { CartContext } from "../contexts/CartContext";
// import { API_URL } from "../api";

// const Cart = () => {
//   const { cartItems, removeFromCart, updateCartQuantity } = useContext(CartContext);

//   const calculateTotalPrice = () => {
//     return cartItems.reduce(
//       (total, item) => total + item.product.price * item.quantity,
//       0
//     );
//   };

//   return (
//     <section className="px-4 sm:px-36 mt-24 mb-16">
//       <h3 className="text-2xl sm:text-3xl font-bold text-center mb-6 text-gray-800">
//         Your Cart
//       </h3>
//       {cartItems.length === 0 ? (
//         <p className="text-center text-gray-600">Your cart is empty.</p>
//       ) : (
//         <div className="space-y-6">
//           {cartItems.map((item) => (
//             <div
//               key={item.product._id}
//               className="flex flex-col sm:flex-row justify-between items-center sm:items-start p-4 bg-white shadow-lg rounded-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300 ease-in-out"
//             >
//               <div className="space-y-2 sm:w-2/3">
//                 <h4 className="text-xl font-semibold text-gray-800">{item.product.productName}</h4>
//                 <p className="text-gray-500">Firm: <span className="font-medium">{item.firmName}</span></p>
//                 <p className="text-gray-500">Price: <span className="font-medium">₹{item.product.price}</span></p>
//                 <div className="flex items-center mt-2 space-x-2">
//                   <button
//                     onClick={() => updateCartQuantity(item.product._id, -1)}
//                     className="bg-red-500 text-white px-3 py-1 rounded-full hover:bg-red-600 focus:ring focus:ring-red-300 transition-all duration-300"
//                   >
//                     -
//                   </button>
//                   <span className="px-4 text-lg font-medium text-gray-700">{item.quantity}</span>
//                   <button
//                     onClick={() => updateCartQuantity(item.product._id, 1)}
//                     className="bg-green-500 text-white px-3 py-1 rounded-full hover:bg-green-600 focus:ring focus:ring-green-300 transition-all duration-300"
//                   >
//                     +
//                   </button>
//                 </div>
//                 <button
//                   onClick={() => removeFromCart(item.product._id)}
//                   className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-all duration-300 ease-in-out focus:ring focus:ring-red-300"
//                 >
//                   Remove
//                 </button>
//               </div>
//               <img
//                 src={`${API_URL}/uploads/${item.product.image}`}
//                 alt={item.product.productName}
//                 className="w-24 h-24 object-cover rounded-lg shadow-md mt-4 sm:mt-0 sm:ml-4"
//               />
//             </div>
//           ))}

//           <div className="flex justify-end text-lg font-bold text-gray-800">
//             <p>Total: ₹{calculateTotalPrice()}</p>
//           </div>

//           <div className="flex justify-end">
//             <button className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 focus:ring focus:ring-green-300 transition-all duration-300 ease-in-out mt-4">
//               Checkout
//             </button>
//           </div>
//         </div>
//       )}
//     </section>
//   );
// };

// export default Cart;

import React, { useContext } from "react";
import { CartContext } from "../contexts/CartContext";
import { API_URL } from "../api";

const Cart = () => {
  const { cartItems, removeFromCart, updateCartQuantity } = useContext(CartContext);

  const calculateTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  };

  // const handleCheckout = async () => {
  //   // Get the total amount in rupees (e.g., 710)
  //   const amount = calculateTotalPrice();
  //   console.log("Frontend Total Amount in INR:", amount);
  //   // Convert the amount to paise (Razorpay expects the amount in paise)
  //   const amountInPaise = amount * 100;
  //   console.log("Frontend Amount in Paise:", amountInPaise);
    
  
  //   try {
  //     // Send a POST request to create an order, passing the amount in the URL as a parameter
  //     const response = await fetch(`${API_URL}/order/create-order`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ amount: amountInPaise }),
  //     });
  
  //     // Check if the response is successful
  //     if (!response.ok) {
  //       throw new Error("Failed to create order");
  //     }
  
  //     // Parse the response JSON
  //     const order = await response.json();
  //     console.log("Order from Backend:", order);
  
  //     // Initialize Razorpay payment
  //     const options = {
  //       key: "rzp_test_Qy2enDn8znal1s", // Replace with your Razorpay key ID
  //       amount: order.amount, // The amount should be returned by the backend in paise
  //       currency: order.currency,
  //       name: "Your Store Name",
  //       description: "Test Transaction",
  //       image: "/your-logo.png",
  //       order_id: order.id, // Razorpay order ID returned from backend
  //       handler: function (response) {
  //         // Handle successful payment here
  //         console.log(response);
  //         // Navigate to tracking page or any success page
  //         window.location.href = "/tracking";
  //       },
  //       prefill: {
  //         name: "Your Customer Name",
  //         email: "customer@example.com",
  //         contact: "9999999999",
  //       },
  //       theme: {
  //         color: "#3399cc",
  //       },
  //     };
  
  //     const rzp = new window.Razorpay(options);
  //     rzp.open();
  //   } catch (error) {
  //     console.error("Payment failed", error);
  //   }
  // };
  

  const handleCheckout = async () => {
    const amountInINR = calculateTotalPrice(); // This gives you the total in INR
    
  
    const amountInPaise = amountInINR * 100; // Convert INR to paise
    
  
    // Call backend to create Razorpay order
    const response = await fetch(`${API_URL}/order/create-order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ amount: amountInPaise }) // Send amount in paise to the backend
    });
  
    const order = await response.json();
    console.log("Order from Backend:", order);
  
    if (order.success) {
      const options = {
        key: "rzp_test_Qy2enDn8znal1s", // Razorpay key
        amount: order.order.amount, // Amount in paise
        currency: order.order.currency, // Currency in INR
        order_id: order.order.id, // Razorpay order ID
        handler: function (response) {
          console.log("Payment Response:", response);
          // After successful payment, redirect to order status page with order_id
        window.location.href = `/order-status?order_id=${order.order.id}`; 
        },
        prefill: {
          name: "Your Customer Name",
          email: "customer@example.com",
          contact: "9999999999"
        },
        theme: {
          color: "#3399cc"
        }
      };
  
      const rzp = new window.Razorpay(options);
      rzp.open();
    } else {
      console.error("Order creation failed");
    }
  };
  
  
  return (
    <section className="px-4 sm:px-36 mt-24 mb-16">
    <h3 className="text-2xl sm:text-3xl font-bold text-center mb-6 text-gray-800">
      Your Cart
    </h3>
    {cartItems.length === 0 ? (
      <p className="text-center text-gray-600">Your cart is empty.</p>
    ) : (
      <div className="space-y-6">
        {cartItems.map((item) => (
          <div
            key={item.product._id}
            className="flex flex-col sm:flex-row justify-between items-center sm:items-start p-4 bg-white shadow-lg rounded-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300 ease-in-out"
          >
            <div className="space-y-2 sm:w-2/3">
              <h4 className="text-xl font-semibold text-gray-800">{item.product.productName}</h4>
              <p className="text-gray-500">
                Firm: <span className="font-medium">{item.firmName}</span>
              </p>
              <p className="text-gray-500">
                Price: <span className="font-medium">₹{item.product.price}</span>
              </p>
              <div className="flex items-center mt-2 space-x-2">
                <button
                  onClick={() => updateCartQuantity(item.product._id, -1)}
                  className="bg-red-500 text-white px-3 py-1 rounded-full hover:bg-red-600 focus:ring focus:ring-red-300 transition-all duration-300"
                >
                  -
                </button>
                <span className="px-4 text-lg font-medium text-gray-700">
                  {item.quantity}
                </span>
                <button
                  onClick={() => updateCartQuantity(item.product._id, 1)}
                  className="bg-green-500 text-white px-3 py-1 rounded-full hover:bg-green-600 focus:ring focus:ring-green-300 transition-all duration-300"
                >
                  +
                </button>
              </div>
              <button
                onClick={() => removeFromCart(item.product._id)}
                className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-all duration-300 ease-in-out focus:ring focus:ring-red-300"
              >
                Remove
              </button>
            </div>
            <img
              src={`${API_URL}/uploads/${item.product.image}`}
              alt={item.product.productName}
              className="w-24 h-24 object-cover rounded-lg shadow-md mt-4 sm:mt-0 sm:ml-4"
            />
          </div>
        ))}
  
        <div className="flex justify-end text-lg font-bold text-gray-800">
          <p>Total: ₹{calculateTotalPrice()}</p>
        </div>
  
        <div className="flex justify-end">
          <button
            className="bg-gradient-to-r from-green-400 to-teal-500 text-white px-6 py-2 rounded-lg hover:bg-teal-600 focus:ring focus:ring-teal-300 transition-all duration-300 ease-in-out mt-4"
            onClick={handleCheckout}
          >
            Checkout
          </button>
        </div>
      </div>
    )}
  </section>
  
  );
};

export default Cart;
