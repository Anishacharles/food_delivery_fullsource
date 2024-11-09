import React from 'react';
import facebookIcon from '../assets/facebook.jpeg';
import twitterIcon from '../assets/twitter.png';
import linkedinIcon from '../assets/linkedin.png';
import LogoImage from '../assets/logo_img.png';  // Import your logo image

const Footer = () => {
  return (
    <div className="text-gray-400 bg-gray-800 flex flex-col items-center gap-3 p-5 pt-20" id="footer">
      {/* Footer content */}
      <div className="w-full grid gap-10 md:grid-cols-[2fr_1fr_1fr] sm:grid-cols-1">
        
        {/* First column with logo and description */}
        <div className="flex flex-col items-start gap-5">
          {/* Logo */}
          <img src={LogoImage} alt="FoodDelivery Logo" className="h-12 w-auto" />
          {/* Footer description */}
          <p>
            At FoodDelivery, we are passionate about bringing delicious meals from your favorite restaurants right to your door. We prioritize speed, convenience, and quality.
          </p>
          {/* Social media icons */}
          <div className="flex gap-4">
            <img src={facebookIcon} alt="Facebook" className="w-8 h-8" />
            <img src={twitterIcon} alt="Twitter" className="w-8 h-8" />
            <img src={linkedinIcon} alt="LinkedIn" className="w-8 h-8" />
          </div>
        </div>

        {/* Company section */}
        <div className="flex flex-col items-start gap-5">
          <h2 className="text-white">COMPANY</h2>
          <ul>
            <li className="mb-2 cursor-pointer">Home</li>
            <li className="mb-2 cursor-pointer">About us</li>
            <li className="mb-2 cursor-pointer">Delivery</li>
            <li className="mb-2 cursor-pointer">Privacy policy</li>
          </ul>
        </div>

        {/* Get in touch section */}
        <div className="flex flex-col items-start gap-5">
          <h2 className="text-white">GET IN TOUCH</h2>
          <ul>
            <li className="mb-2">+1-212-456-7890</li>
            <li className="mb-2">contact@fooddelivery.com</li>
          </ul>
        </div>
      </div>

      {/* Divider */}
      <hr className="w-full h-0.5 bg-gray-600 my-5" />

      {/* Footer bottom text */}
      <p className="text-center">Copyright 2024 © FoodDelivery.com - All Rights Reserved.</p>
    </div>
  );
};

export default Footer;
