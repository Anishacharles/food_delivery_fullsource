// import React, {useState} from 'react';
// import { productData } from '../data';

// const ProductDisplay = () => {
//     const [displayItem, setDisplayItem] = useState(productData )


//   return (
//     <div className="explore-menu flex flex-col gap-5" id="explore-menu">
//   <h1 className="text-[#262626] font-bold text-4xl">Explore our menu</h1>
//  <p className="mt-2 text-gray-600 text-[max(1.4vw,16px)] cursor-pointer">
//     Choose from a diverse menu featuring a delectable array of dishes. Our mission is to satisfy your cravings and elevate your dining experience, one delicious meal at a time.
//   </p>
//   <div className="itemSection flex w-full mt-12 gap-6">
//     {displayItem.map((item, index) => {
//       return (
//         <div className="gallery w-36 h-36 flex justify-center items-center" key={index}>
//           <img 
//             src={item.product_img} 
//             alt={item.product_img} 
//             className="w-full h-full object-cover rounded-full"
//           />
//         </div>
//       );
//     })}
//   </div>
// </div>

//   )
// }

// export default ProductDisplay

import React, { useState } from 'react';
import { productData } from '../data';

const ProductDisplay = () => {
  const [displayItem, setDisplayItem] = useState(productData);

  return (
    <div className="explore-menu flex flex-col gap-5 px-4 sm:px-8 md:px-12 max-w-screen-xl mx-auto" id="explore-menu">
    <h1 className="text-[#262626] font-bold text-2xl sm:text-2xl md:text-3xl">
      Explore our menu
    </h1>
    <p className="mt-2 text-gray-600 text-[max(1.4vw,16px)] cursor-pointer sm:text-lg md:text-xl">
      Choose from a diverse menu featuring a delectable array of dishes. Our mission is to satisfy your cravings and elevate your dining experience, one delicious meal at a time.
    </p>
    <div className="itemSection flex w-full mt-12 gap-14 flex-wrap justify-center">
      {displayItem.map((item, index) => {
        return (
          <div key={item.id || index} className="text-center">
            <div className="gallery w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 flex justify-center items-center mx-auto mb-2">
              <img 
                src={item.product_img} 
                alt={item.name} 
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <div className="text-lg font-semibold text-gray-800 mt-2">
              {item.name}
            </div>
          </div>
        );
      })}
    </div>
  </div>
  
  );
};

export default ProductDisplay;
