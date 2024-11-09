import { useEffect, useState } from 'react';
import { API_URL } from '../api';
import { useParams } from 'react-router-dom';

const OrderStatusPage = () => {
  const { orderId } = useParams();  // Get the orderId from the URL
  const [orderDetails, setOrderDetails] = useState(null);


  useEffect(() => {
    // Fetch order details using the orderId
    const fetchOrderDetails = async () => {
      const response = await fetch(`${API_URL}/order/${orderId}`);
      const data = await response.json();
      setOrderDetails(data);
    };

    fetchOrderDetails();
  }, [orderId]);

  if (!orderDetails) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-lg w-full space-y-6">
        <h2 className="text-3xl font-bold text-center text-green-600">Order Status</h2>
        
        <div className="bg-yellow-100 p-4 rounded-xl text-yellow-800">
          <h3 className="text-2xl font-semibold text-center">Order Placed Successfully</h3>
          <p className="text-xl mt-6 text-center">Your order has been placed and is being processed.</p>
        </div>
      </div>
    </div>
  );
  
};
export default OrderStatusPage;




// import React, { useState, useEffect } from "react";
// import { API_URL } from "../api"; // Replace with your actual API URL

// const OrderStatusPage = () => {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchUserOrders = async () => {
//       try {
//         const response = await fetch(`${API_URL}/order/userorders`, {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json", // Optional, depending on your API
//           },
//         });

//         if (!response.ok) {
//           throw new Error("Failed to fetch orders");
//         }

//         const data = await response.json();
//         console.log("Fetched Orders:", data); // Log the response for inspection

//         // Assuming the orders are in a field like "orders"
//         setOrders(Array.isArray(data.orders) ? data.orders : []);
//         setLoading(false); // Set loading to false once data is fetched
//       } catch (error) {
//         setError(error.message); // Handle errors
//         setLoading(false);
//       }
//     };

//     fetchUserOrders(); // Call the function to fetch user orders
//   }, []);

//   if (loading) {
//     return <p>Loading your orders...</p>;
//   }

//   if (error) {
//     return <p>Error: {error}</p>;
//   }

//   return (
//     <section className="px-4 sm:px-36 mt-24 mb-16">
//       <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 text-gray-800">
//         Your Orders
//       </h2>

//       {orders.length === 0 ? (
//         <p className="text-center text-gray-600">You have no orders yet.</p>
//       ) : (
//         <div className="space-y-4">
//           {orders.map((order) => (
//             <div key={order._id} className="bg-white p-4 shadow-lg rounded-lg border border-gray-200">
//               <h3 className="text-xl font-semibold">{order._id}</h3> {/* Assuming it's _id */}
//               <p>Status: {order.status}</p>
//               <p>Amount: ₹{order.amount}</p> {/* Assuming the amount is stored in paise */}
//               <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
//             </div>
//           ))}
//         </div>
//       )}
//     </section>
//   );
// };

// export default OrderStatusPage;
