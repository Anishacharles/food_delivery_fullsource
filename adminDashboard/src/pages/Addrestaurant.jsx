
import React, { useState, useEffect } from 'react';
import { API_URL } from '../route/Path';

const Addrestaurant = () => {
    const [firmName, setFirmName] = useState("");
    const [area, setArea] = useState("");
    const [category, setCategory] = useState([]);
    const [region, setRegion] = useState([]);
    const [offer, setOffer] = useState("");
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);

   

    const handleCategoryChange = (event) => {
        const value = event.target.value;
        if (category.includes(value)) {
            setCategory(category.filter((item) => item !== value));
        } else {
            setCategory([...category, value]);
        }
    };

    const handleRegionChange = (event) => {
        const value = event.target.value;
        if (region.includes(value)) {
            setRegion(region.filter((item) => item !== value));
        } else {
            setRegion([...region, value]);
        }
    };

    
    const handleImageUpload =(event)=>{
        const selectedImage = event.target.files[0];
        setFile(selectedImage)
    }
    
    const handleFirmSubmit = async (e) => {
        e.preventDefault();
    
        // Basic validation
        if (!firmName || !area || category.length === 0 || region.length === 0) {
            alert("Please fill in all required fields");
            return;
        }
    
        setLoading(true);
    
        try {
            const loginToken = localStorage.getItem('loginToken');
            if (!loginToken) {
                console.error("User not authenticated");
                return; // Uncommented to prevent further execution if the user is not authenticated
            }
    
            const formData = new FormData();
            formData.append('firmName', firmName); // Check that this matches the server's expectation
            formData.append('area', area);
            formData.append('offer', offer);
            if (file) {
                formData.append('image', file); // Ensure 'image' matches multer's expected field name
            }
    
            category.forEach((value) => {
                formData.append('category', value); // Ensure this matches your server's expectations
            });
            region.forEach((value) => {
                formData.append('region', value); // Ensure this matches your server's expectations
            });
    
            const response = await fetch(`${API_URL}/firm/add-firm`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${loginToken}`,
                    // Don't set 'Content-Type' when using FormData; let the browser handle it
                },
                body: formData,
            });
    
            if (!response.ok) {
                const errorData = await response.json();
                console.log("Server Error:", errorData);
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
    
            const data = await response.json(); // Moved up for better handling
            console.log("Success:", data);
    
            // Reset form fields if submission is successful
            setFirmName("");
            setArea("");
            setCategory([]);
            setRegion([]);
            setOffer("");
            setFile(null);
            alert("Firm added Successfully");
    
            // Store the returned data in localStorage
            localStorage.setItem('firmId', data.firmId);
            localStorage.setItem('firmName', data.vendorFirmName);
            window.location.reload();
    
        } catch (error) {
            console.error("Failed to add Firm", error);
            alert("Failed to add Firm");
        } finally {
            setLoading(false);
        }
    };
    
    return (
        
        <div className="firmSection w-full flex flex-col justify-center items-center mt-4">
            {!loading && (
                <form className="tableForm w-full max-w-2xl mt-[-100px] flex flex-col justify-start items-center border border-gray-400 shadow-lg rounded-lg"
                onSubmit={handleFirmSubmit}>
                    <h3 className="text-lg font-bold">Add Firm</h3>
                    <label className="w-full max-w-[85%] font-semibold">Firm Name</label>
                    <input 
                    type="text"
                    id="firmName"
                     name='firmName'
                      value={firmName} 
                      onChange={(e) => setFirmName(e.target.value)} className="w-full max-w-[85%] h-9 mb-2 border border-gray-300"
                     />
                    <label className="w-full max-w-[85%] font-semibold">Area</label>
                    <input 
                    type="text"
                    id="area" 
                    name='area' 
                    value={area} 
                    onChange={(e) => setArea(e.target.value)} className="w-full max-w-[85%] h-9 mb-2 border border-gray-300" 
                    />

                    <div className="checkInp w-full max-w-[85%] flex">
                        <label className="block text-lg font-medium">Category</label>
                        <div className="inputsContainer w-full flex ">
                            <div className="checboxContainer w-full max-w-[50%] flex justify-center items-center">
                                <label>Veg</label>
                                <input
                                 type="checkbox" 
                                 id="category-veg"
                                 checked={category.includes('veg')} value="veg" 
                                 onChange={handleCategoryChange} 
                                 className="w-4 h-4 ml-2" 
                                 />
                            </div>
                            <div className="checboxContainer w-full max-w-[50%] flex justify-center items-center">
                                <label>Non-Veg</label>
                                <input 
                                type="checkbox" 
                                id="category-nonveg"
                                checked={category.includes('non-veg')} 
                                value="non-veg" 
                                onChange={handleCategoryChange} 
                                className="w-4 h-4 ml-2" />
                            </div>
                        </div>
                    </div>

                    <label className="w-full max-w-[85%] font-semibold mt-2">Offer</label>
                    <input 
                    type="text" 
                    id='offer'
                    name='offer' 
                    value={offer} 
                    onChange={(e) => setOffer(e.target.value)} 
                    className="w-full max-w-[85%] h-9 mb-2 border border-gray-300" 
                    />

                    <div className="checkInp w-full max-w-[85%] flex">
                        <label className="w-1/5 font-semibold mt-2">Region</label>
                        <div className="inputsContainer w-full flex">
                            <div className="regBoxContainer w-full max-w-[50%] flex justify-center items-center">
                                <label>South Indian</label>
                                <input type="checkbox" 
                                id="region-south-indian"
                                value="south-indian" 
                                checked={region.includes('south-indian')}
                                 onChange={handleRegionChange} 
                                 className="w-4 h-4 ml-2"
                                  />
                            </div>
                            <div className="regBoxContainer w-full max-w-[50%] flex justify-center items-center">
                                <label>North Indian</label>
                                <input 
                                type="checkbox" 
                                id="region-north-indian"
                                value="north-indian" 
                                checked={region.includes('north-indian')} 
                                onChange={handleRegionChange} 
                                className="w-4 h-4 ml-2" 
                                />
                            </div>
                            <div className="regBoxContainer w-full max-w-[50%] flex justify-center items-center">
                                <label>Chinese</label>
                                <input 
                                type="checkbox" 
                                id="region-chinese"
                                value="chinese" 
                                checked={region.includes('chinese')} 
                                onChange={handleRegionChange} 
                                className="w-4 h-4 ml-2" 
                                />
                            </div>
                            <div className="regBoxContainer w-full max-w-[50%] flex justify-center items-center">
                                <label>Bakery</label>
                                <input 
                                type="checkbox" 
                                id="region-bakery"
                                value="bakery" 
                                checked={region.includes('bakery')} 
                                onChange={handleRegionChange} 
                                className="w-4 h-4 ml-2" 
                                />
                            </div>
                        </div>
                    </div>

                    <label className="w-full max-w-[85%] font-semibold mt-2">Firm Image</label>
                    <input 
                    type="file"
                    id="file-image"
                     onChange={handleImageUpload} 
                     className="mb-2" 
                     />
                    <div className="btnSubmit mt-4">
                        <button type='submit' className="w-full py-2 px-4 bg-green-500 text-white rounded hover:bg-green-600">Submit</button>
                    </div>
                </form>
            )}
        </div>

    );
};

export default Addrestaurant;
