import React from 'react';
import headerImage from '../assets/header_img.jpeg';

const Header = () => {
  return (
    <div 
      className="relative h-[30vw] sm:h-[40vh] md:h-[45vh] my-8 bg-cover bg-center max-w-screen-xl mx-auto" 
      style={{ backgroundImage: `url(${headerImage})` }}
    >
      <div className="absolute flex flex-col items-start gap-[1.5vw] max-w-[50%] bottom-[10%] left-[6vw] animate-fadeIn 
      sm:max-w-[60%] sm:left-[8vw] md:max-w-[50%] md:left-[10vw]">
        <h2 className="font-medium text-white text-[max(4.5vw,22px)] sm:text-[max(3.5vw,18px)] md:text-[max(2.5vw,20px)]">
          Order your favourite food here
        </h2>
       
        <button className="border-none text-gray-500 font-medium py-[0.7vw] px-[1.5vw] bg-white text-[max(0.8vw,12px)] rounded-full sm:text-[max(1vw,14px)] sm:py-[1vw] sm:px-[2vw] md:text-[max(1.2vw,14px)] md:py-[1.2vw] md:px-[2.5vw]">
  View Menu
</button>

      </div>
    </div>
  );
};

export default Header;
