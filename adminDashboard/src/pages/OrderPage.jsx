import React, { useEffect, useState } from 'react';
import { API_URL } from '../route/Path';


const OrderPage = () => {
  const [orders, setOrders] = useState([]);

  const ordersHandler = async () => {
    try {
      const response = await fetch(`${API_URL}/order/list`);
      const newOrdersData = await response.json();
      setOrders(newOrdersData.orders);
      console.log(newOrdersData);
    } catch (error) {
      console.error("Failed to fetch orders", error);
      alert('Failed to fetch orders');
    }
  };

  useEffect(() => {
    ordersHandler();
    console.log('Fetching orders in useEffect');
  }, []);

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      const response = await fetch(`${API_URL}/order/status`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ orderId, status: newStatus }),
      });
      if (response.ok) {
        setOrders(
          orders.map((order) =>
            order._id === orderId ? { ...order, status: newStatus } : order
          )
        );
        alert('Order status updated successfully');
      }
    } catch (error) {
      console.error('Failed to update order status', error);
      alert('Failed to update order status');
    }
  };

  

  return (
    <div className="orderSection p-4">
      {(!orders || orders.length === 0) && (
        <p className="text-gray-500 text-center">No orders available</p>
      )}

      {orders && orders.length > 0 && (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 shadow-md">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600 border-b">Order ID</th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600 border-b">Customer</th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600 border-b">Amount</th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600 border-b">Status</th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600 border-b">Update Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 text-gray-700">{order._id}</td>
                  <td className="px-4 py-2 text-gray-700">{order.customerName}</td>
                  <td className="px-4 py-2 text-gray-700">₹{order.amount}</td>
                  <td className="px-4 py-2 text-gray-700">{order.status}</td>
                  <td className="px-4 py-2">
                    <select
                      value={order.status}
                      onChange={(e) => updateOrderStatus(order._id, e.target.value)}
                      className="border rounded px-2 py-1"
                    >
                      <option value="pending">Pending</option>
                      <option value="processing">Processing</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default OrderPage;

// const OrderPage = () => {
//   const [orders, setOrders] = useState([]);

//   const ordersHandler = async () => {
//     try {
//       const response = await fetch(`${API_URL}/order/list`);
//       const newOrdersData = await response.json();
//       setOrders(newOrdersData.orders);
//       console.log(newOrdersData);
//     } catch (error) {
//       console.error("Failed to fetch orders", error);
//       alert('Failed to fetch orders');
//     }
//   };

//   useEffect(() => {
//     ordersHandler();
//     console.log('Fetching orders in useEffect');
//   }, []);

//   return (
//     <div className="orderSection p-4">
//       {(!orders || orders.length === 0) && (
//         <p className="text-gray-500 text-center">No orders available</p>
//       )}

//       {orders && orders.length > 0 && (
//         <div className="overflow-x-auto">
//           <table className="min-w-full bg-white border border-gray-200 shadow-md">
//             <thead>
//               <tr>
//                 <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600 border-b">Order ID</th>
//                 <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600 border-b">Customer</th>
//                 <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600 border-b">Amount</th>
//                 <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600 border-b">Status</th>
//               </tr>
//             </thead>
//             <tbody>
//               {orders.map((order) => (
//                 <tr key={order._id} className="hover:bg-gray-50">
//                   <td className="px-4 py-2 text-gray-700">{order._id}</td>
//                   <td className="px-4 py-2 text-gray-700">{order.customerName}</td>
//                   <td className="px-4 py-2 text-gray-700">₹{order.amount}</td>
//                   <td className="px-4 py-2 text-gray-700">{order.status}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// };

// export default OrderPage;
