
import React, { useState, useEffect } from "react";
import { API_URL } from "../api";
import { FaHeart, FaRegHeart } from "react-icons/fa"; // For heart icons
import { Link } from "react-router-dom";

const FirmCollections = () => {
    const [firmData, setFirmData] = useState([]);
    const [selectedRegion, setSelectedRegion] = useState('All');
    const [activeCategory, setActiveCategory] = useState('all');
    const [favorites, setFavorites] = useState([]);
    const userId = localStorage.getItem("userId");  // Dynamically retrieve the userId from localStorage

    // Fetch the list of all vendors (firms)
    const firmDataHandler = async () => {
        try {
            const response = await fetch(`${API_URL}/vendor/all-vendors`);
            const newFirmData = await response.json();
            setFirmData(newFirmData.vendors);
        } catch (error) {
            alert("Firm data not fetched");
            console.error("Firm data not fetched", error);
        }
    };

    // Fetch the user's favorite firms from server or localStorage
    const fetchFavorites = async () => {
        const localFavorites = localStorage.getItem("favorites");
        if (localFavorites) {
            setFavorites(JSON.parse(localFavorites)); // Load from localStorage
        } else {
            try {
                const response = await fetch(`${API_URL}/favorites/${userId}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("token")}`, // If token-based authentication
                    },
                });
                const data = await response.json();
                setFavorites(data.firmIds); // Assuming the response contains a list of firmIds
                localStorage.setItem("favorites", JSON.stringify(data.firmIds)); // Save to localStorage
            } catch (error) {
                console.error("Error fetching favorites", error);
            }
        }
    };

    // Add or remove a firm from favorites
    const toggleFavorite = async (firmId) => {
        try {
            let updatedFavorites;
            if (favorites.includes(firmId)) {
                // Remove from favorites
                await fetch(`${API_URL}/favorites/remove`, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                    body: JSON.stringify({ userId, firmId }),  // Sending the userId and firmId to remove a favorite
                });
                updatedFavorites = favorites.filter(id => id !== firmId); // Update local state
            } else {
                // Add to favorites
                await fetch(`${API_URL}/favorites/add`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                    body: JSON.stringify({ userId, firmId }),  // Sending the firmId and userId to add a favorite
                });
                updatedFavorites = [...favorites, firmId]; // Update local state
            }
            setFavorites(updatedFavorites);
            localStorage.setItem("favorites", JSON.stringify(updatedFavorites)); // Update localStorage
        } catch (error) {
            console.error("Error updating favorite", error);
        }
    };

    useEffect(() => {
        firmDataHandler(); // Fetch all vendors on initial load
        if (userId) fetchFavorites(); // Fetch favorites from server or localStorage
    }, [userId]);

    const filterHandler = (region, category) => {
        setSelectedRegion(region);
        setActiveCategory(category);
    };

    return (
        <>
            <h3 className="text-3xl font-semibold mt-10 mb-6 max-w-screen-xl mx-auto">
                Restaurants with online food delivery in Bangalore
            </h3>
            <div className="mb-5 flex flex-wrap justify-center sm:justify-between max-w-screen-xl mx-auto space-y-2 sm:space-y-0">
    <button
        onClick={() => filterHandler("All", 'all')}
        className={`py-2 px-6 rounded-lg text-lg font-semibold transition-all duration-300 ease-in-out
            ${activeCategory === 'all' ? 'bg-blue-500 text-white shadow-lg' : 'bg-transparent text-blue-500 border-2 border-blue-500 hover:bg-blue-100 hover:text-blue-700'}`}
    >
        All
    </button>
    <button
        onClick={() => filterHandler("South-Indian", 'south-indian')}
        className={`py-2 px-6 rounded-lg text-lg font-semibold transition-all duration-300 ease-in-out
            ${activeCategory === 'south-indian' ? 'bg-blue-500 text-white shadow-lg' : 'bg-transparent text-blue-500 border-2 border-blue-500 hover:bg-blue-100 hover:text-blue-700'}`}
    >
        South-Indian
    </button>
    <button
        onClick={() => filterHandler("North-Indian", 'north-indian')}
        className={`py-2 px-6 rounded-lg text-lg font-semibold transition-all duration-300 ease-in-out
            ${activeCategory === 'north-indian' ? 'bg-blue-500 text-white shadow-lg' : 'bg-transparent text-blue-500 border-2 border-blue-500 hover:bg-blue-100 hover:text-blue-700'}`}
    >
        North-Indian
    </button>
    <button
        onClick={() => filterHandler("Chinese", 'chinese')}
        className={`py-2 px-6 rounded-lg text-lg font-semibold transition-all duration-300 ease-in-out
            ${activeCategory === 'chinese' ? 'bg-blue-500 text-white shadow-lg' : 'bg-transparent text-blue-500 border-2 border-blue-500 hover:bg-blue-100 hover:text-blue-700'}`}
    >
        Chinese
    </button>
    <button
        onClick={() => filterHandler("Bakery", 'bakery')}
        className={`py-2 px-6 rounded-lg text-lg font-semibold transition-all duration-300 ease-in-out
            ${activeCategory === 'bakery' ? 'bg-blue-500 text-white shadow-lg' : 'bg-transparent text-blue-500 border-2 border-blue-500 hover:bg-blue-100 hover:text-blue-700'}`}
    >
        Bakery
    </button>
</div>


            <section className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4 max-w-screen-xl mx-auto">
                {firmData.map((firms, firmIndex) => (
                    firms.firm.map((item, index) => (
                        (selectedRegion === "All" || item.region.includes(selectedRegion.toLowerCase())) && (
                            <div key={`${firmIndex}-${index}`} className="relative bg-white shadow-lg rounded-lg overflow-hidden">

                                <Link to={`/products/${item._id}/${item.firmName}`} className="block">
                                    <div className="relative w-full h-40 lg:h-48">
                                        <img
                                            src={`${API_URL}/uploads/${item.image}`}
                                            alt={item.firmName}
                                            className="w-full h-full object-cover"
                                        />
                                        <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black to-transparent text-white p-2">
                                            {item.offer}
                                        </div>
                                    </div>
                                    <div className="p-4">
                                        <strong className="text-lg font-bold">{item.firmName}</strong>
                                        <div className="text-sm text-gray-500">{item.region.join(", ")}</div>
                                        <div className="text-sm text-gray-500">{item.area}</div>
                                    </div>
                                </Link>

                                {/* Favorite Button above the image */}
                                <div className="absolute top-2 right-2 z-10">
                                    {favorites.includes(item._id) ? (
                                        <FaHeart
                                            onClick={(e) => { e.preventDefault(); toggleFavorite(item._id); }} 
                                            size={24}
                                            className="text-red-500 cursor-pointer"
                                        />
                                    ) : (
                                        <FaRegHeart
                                            onClick={(e) => { e.preventDefault(); toggleFavorite(item._id); }} // Prevent link click
                                            size={24}
                                            className="text-white cursor-pointer"
                                        />
                                    )}
                                </div>
                            </div>
                        )
                    ))
                ))}
            </section>
        </>
    );
};

export default FirmCollections;
