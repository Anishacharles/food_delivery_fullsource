import React, { useState, useEffect } from 'react';
import { API_URL } from '../route/Path';

const AllProducts = () => {
  const [products, setProducts] = useState([]);

  const productsHandler = async () => {
    const firmId = localStorage.getItem('firmId');
    try {
      const response = await fetch(`${API_URL}/product/${firmId}/products`);
      const newProductsData = await response.json();
      setProducts(newProductsData.products);
      console.log(newProductsData);
    } catch (error) {
      console.error("failed to fetch products", error);
      alert('Failed to fetch products');
    }
  };

  useEffect(() => {
    productsHandler();
    console.log('this is useEffect');
  }, []);

  const deleteProductById = async (productId) => {
    try {
      const response = await fetch(`${API_URL}/product/${productId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setProducts(products.filter((product) => product._id !== productId));
        confirm("Are you sure you want to delete?");
        alert("Product deleted successfully");
      }
    } catch (error) {
      console.error('Failed to delete product');
      alert('Failed to delete product');
    }
  };

  return (
    <div className="productSection p-4">
      {!products || products.length === 0 ? (
        <p className="text-gray-500 text-center">No products added</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 shadow-md">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600 border-b">Product Name</th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600 border-b">Price</th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600 border-b">Image</th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600 border-b">Delete</th>
              </tr>
            </thead>
            <tbody>
              {products.map((item) => (
                <tr key={item._id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 text-gray-700">{item.productName}</td>
                  <td className="px-4 py-2 text-gray-700">₹{item.price}</td>
                  <td className="px-4 py-2">
                    {item.image && (
                      <img
                        src={`${API_URL}/uploads/${item.image}`}
                        alt={item.productName}
                        className="w-12 h-12 object-cover rounded"
                      />
                    )}
                  </td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => deleteProductById(item._id)}
                      className="deleteBtn text-red-500 hover:text-red-600 focus:outline-none"
                    >
                      Delete
                    </button>
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

export default AllProducts;
