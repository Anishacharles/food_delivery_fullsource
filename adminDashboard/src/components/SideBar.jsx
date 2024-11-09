
import React, { useState, useEffect } from 'react';

const SideBar = ({
  showFirmHandler,
  showProductHandler,
  showAllProductsHandler,
  showFirmTitle,
  showOrderPage 
}) => {
  return (
  //   <div className="w-50 bg-gray-800 text-white h-full p-4">
  //     <ul className="space-y-4">
  //       {showFirmTitle && (
  //         <li
  //           onClick={showFirmHandler}
  //           className="cursor-pointer hover:bg-gray-700 p-2 rounded"
  //         >
  //           Add Restaurant
  //         </li>
  //       )}
  //       <li
  //         onClick={showProductHandler}
  //         className="cursor-pointer hover:bg-gray-700 p-2 rounded"
  //       >
  //         Add Product
  //       </li>
  //       <li
  //         onClick={showAllProductsHandler}
  //         className="cursor-pointer hover:bg-gray-700 p-2 rounded"
  //       >
  //         All List
  //       </li>
  //       <li className="cursor-pointer hover:bg-gray-700 p-2 rounded">
  //         User Details
  //       </li>
  //     </ul>
  //   </div>
  // );

    <div className="w-full max-w-[15%] h-[95vh] pt-2 bg-[#2E294E] text-white">
      <ul>
        {showFirmTitle ? (
          <li
            onClick={showFirmHandler}
            className="list-none mb-5 font-medium text-xl text-center cursor-pointer"
          >
            Add Restaurant
          </li>
        ) : (
          ""
        )}
        <li
          onClick={showProductHandler}
          className="list-none mb-5 font-medium text-xl text-center cursor-pointer"
        >
          Add Product
        </li>
        <li
          onClick={showAllProductsHandler}
          className="list-none mb-5 font-medium text-xl text-center cursor-pointer"
        >
          All Products
        </li>
        <li className="list-none mb-5 font-medium cursor-pointer text-xl text-center"
        onClick={showOrderPage }
        >
          order
        </li>
      </ul>
    </div>
  );
  
};

export default SideBar;
