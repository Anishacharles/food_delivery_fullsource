import React, { useState, useEffect } from 'react';
import { API_URL } from '../api';
import { FaRegArrowAltCircleRight, FaRegArrowAltCircleLeft } from "react-icons/fa";
import { CirclesWithBar } from 'react-loader-spinner';
import { Link } from 'react-router-dom'; // Import Link for routing

const FirmChain = () => {
  const [vendorData, setVendorData] = useState([]);
  const [loading, setLoading] = useState(true);

  const vendorFirmHandler = async () => {
    try {
      const response = await fetch(`${API_URL}/vendor/all-vendors`);
      const newData = await response.json();
      setVendorData(newData);
      setLoading(false);
    } catch (error) {
      alert("Failed to fetch data");
      console.error("Failed to fetch data", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    vendorFirmHandler();
  }, []);

  const handleScroll = (direction) => {
    const gallery = document.getElementById("chainGallery");
    const scrollAmount = 500;

    if (direction === "left") {
      gallery.scrollTo({
        left: gallery.scrollLeft - scrollAmount,
        behavior: "smooth"
      });
    } else if (direction === "right") {
      gallery.scrollTo({
        left: gallery.scrollLeft + scrollAmount,
        behavior: "smooth"
      });
    }
  };

  return (
    <>
      {/* Heading always visible */}
      <h3 className="text-3xl font-semibold mt-10 mb-6 max-w-screen-xl mx-auto ">
        Top 10 restaurant chains in Bangalore
      </h3>

      {/* Loader Section */}
      {loading ? (
        <div className="flex items-center justify-center max-w-screen-xl mx-auto my-10">
          <CirclesWithBar
            height="100"
            width="100"
            color="#4fa94d"
            outerCircleColor="#4fa94d"
            innerCircleColor="#4fa94d"
            barColor="#4fa94d"
            ariaLabel="circles-with-bar-loading"
            visible={true}
          />
          <div className="text-lg font-semibold mt-4">Loading...</div>
        </div>
      ) : (
        <>
          {/* Button Section */}
          <div className="btnSection max-w-screen-xl mx-auto relative w-full flex justify-end gap-4 mb-4">
            <button onClick={() => handleScroll("left")} className="text-4xl sm:text-3xl">
              <FaRegArrowAltCircleLeft className='btnIcons' />
            </button>
            <button onClick={() => handleScroll("right")} className="text-4xl sm:text-3xl">
              <FaRegArrowAltCircleRight className='btnIcons' />
            </button>
          </div>

          {/* Images container */}
          <section
            className="chainSection flex overflow-hidden gap-x-4 mt-6 mb-12 max-w-screen-xl mx-auto scrollbar-hide"
            id="chainGallery"
          >
            {vendorData.vendors && vendorData.vendors.map((vendor, index) => (
              <div className="vendorBox flex-shrink-0" key={index}>
                {vendor.firm.map((item, itemIndex) => (
                  <div key={itemIndex} className="text-center">
                    <Link to={`/products/${item._id}/${item.firmName}`} className="block"> {/* Linking to product menu */}
                      <div className="firmImage w-full">
                        <img
                          src={`${API_URL}/uploads/${item.image}`}
                          className="w-[300px] h-[200px] sm:w-[300px] sm:h-[200px] md:w-[320px] md:h-[220px] object-cover rounded-lg"
                          alt={item.firmName}
                        />
                      </div>
                      <div className="text-xl font-semibold text-gray-800 mt-2">
                        {item.firmName}
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            ))}
          </section>
        </>
      )}
    </>
  );
};

export default FirmChain;

