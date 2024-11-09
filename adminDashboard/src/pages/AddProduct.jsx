import React, { useState } from 'react';
import { API_URL } from '../route/Path';

const AddProduct = () => {
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState([]);
  const [bestSeller, setBestSeller] = useState(false);
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [nutrition, setNutrition] = useState({
    calories: "",
    protein: "",
    carbs: "",
    fat: "",
});

// Handle nutrition field changes
const handleNutritionChange = (e) => {
    const { name, value } = e.target;
    setNutrition((prevNutrition) => ({
        ...prevNutrition,
        [name]: value,
    }));
};


  const handleCategoryChange = (event) => {
    const value = event.target.value;
    if (category.includes(value)) {
      setCategory(category.filter((item) => item !== value));
    } else {
      setCategory([...category, value]);
    }
  };

  const handleBestSeller = (event) => {
    const value = event.target.value === 'true';
    setBestSeller(value);
  };

  const handleImageUpload = (event) => {
    const selectedImage = event.target.files[0];
    setImage(selectedImage);
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const loginToken = localStorage.getItem('loginToken');
      const firmId = localStorage.getItem('firmId');

      if (!loginToken || !firmId) {
        console.error('User not authenticated');
        return;
      }

      const formData = new FormData();
      formData.append('productName', productName);
      formData.append('price', price);
      formData.append('description', description);
      formData.append('bestSeller', bestSeller);
      formData.append('image', image);

      category.forEach((value) => {
        formData.append('category', value);
        formData.append('nutrition[calories]', nutrition.calories);
formData.append('nutrition[protein]', nutrition.protein);
formData.append('nutrition[carbs]', nutrition.carbs);
formData.append('nutrition[fat]', nutrition.fat);

      });

      const response = await fetch(`${API_URL}/product/add-product/${firmId}`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${loginToken}`,
            
        },
        body: formData,
    });

      const data = await response.json();

      if (response.ok) {
        alert('Product added successfully');
        setProductName('');
        setPrice('');
        setCategory([]);
        setBestSeller(false);
        setImage(null);
        setDescription('');
      } else {
        alert('Failed to add product');
      }
    } catch (error) {
      alert('Failed to add Product');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="firmSection p-6 max-w-lg mx-auto">
      {loading ? (
        <div className="loaderSection flex justify-center items-center">
          <p className="text-lg">Please wait, your product is being added...</p>
        </div>
      ) : (
        <form className="tableForm space-y-4" onSubmit={handleAddProduct}>
          <h3 className="text-2xl font-bold">Add Product</h3>
          
          <label className="block text-sm font-medium">Product Name</label>
          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded p-2 border border-gray-300 rounded"
          />
          
          <label className="block text-sm font-medium">Price</label>
          <input
            type="text"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
          
          <div className="checkInp">
            <label className="block text-sm font-medium">Category</label>
            <div className="inputsContainer flex space-x-4">
              <div className="checkboxContainer flex items-center space-x-2">
                <input
                  type="checkbox"
                  value="veg"
                  checked={category.includes('veg')}
                  onChange={handleCategoryChange}
                  className="w-4 h-4"
                />
                <label>Veg</label>
              </div>
              <div className="checkboxContainer flex items-center space-x-2">
                <input
                  type="checkbox"
                  value="non-veg"
                  checked={category.includes('non-veg')}
                  onChange={handleCategoryChange}
                  className="w-4 h-4"
                />
                <label>Non-Veg</label>
              </div>
            </div>
          </div>

          <div className="checkInp">
            <label className="block text-sm font-medium">Best Seller</label>
            <div className="inputsContainer flex space-x-4">
              <div className="checkboxContainer flex items-center space-x-2">
                <input
                  type="radio"
                  value="true"
                  checked={bestSeller === true}
                  onChange={handleBestSeller}
                  className="w-4 h-4"
                />
                <label>Yes</label>
              </div>
              <div className="checkboxContainer flex items-center space-x-2">
                <input
                  type="radio"
                  value="false"
                  checked={bestSeller === false}
                  onChange={handleBestSeller}
                  className="w-4 h-4"
                />
                <label>No</label>
              </div>
            </div>
          </div>

          <label className="block text-sm font-medium">Description</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
          <h3 className="text-lg font-bold mt-4">Nutrition Information</h3>
    <label className="block text-sm font-medium">Calories</label>
    <input
        type="text"
        name="calories"
        value={nutrition.calories}
        onChange={handleNutritionChange}
        className="w-full max-w-[85%] h-9 mb-2 border border-gray-300 rounded"
    />
    <label className="block text-sm font-medium">Protein</label>
    <input
        type="text"
        name="protein"
        value={nutrition.protein}
        onChange={handleNutritionChange}
        className="w-full max-w-[85%] h-9 mb-2 border border-gray-300 rounded"
    />
    <label className="block text-sm font-medium">Carbs</label>
    <input
        type="text"
        name="carbs"
        value={nutrition.carbs}
        onChange={handleNutritionChange}
        className="w-full max-w-[85%] h-9 mb-2 border border-gray-300 rounded"
    />
    <label className="block text-sm font-medium">Fat</label>
    <input
        type="text"
        name="fat"
        value={nutrition.fat}
        onChange={handleNutritionChange}
        className="w-full max-w-[85%] h-9 mb-2 border border-gray-300 rounded"
    />

          <label className="block text-sm font-medium">Product Image</label>
          <input
            type="file"
            onChange={handleImageUpload}
            className="w-full p-2 border border-gray-300 rounded"
          />
          
          <div className="btnSubmit mt-4">
            <button
              type="submit"
              className="w-full py-2 px-4 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Submit
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default AddProduct;
