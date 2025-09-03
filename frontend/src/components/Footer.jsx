// src/components/Footer.jsx
import React from 'react';
import { 
  FaPhone, 
  FaEnvelope, 
  FaTruck, 
  FaHeadset, 
  FaTag, 
  FaLock, 
  FaArrowRight,
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaPinterestP
} from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="font-sans bg-gray-900 text-white">
      {/* Top Section */}
      <div className="bg-gray-900 py-12 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-0">
          {/* Need Help */}
          <div className="text-center  ">
            <h3 className="text-xl font-bold mb-4 flex items-center justify-center">
                <div className='flex justify-center  w-full items-center'>

              
              <FaHeadset className="mr-2 text-amber-500 " /> NEED HELPS
                </div>
            </h3>
            <p className="text-gray-400 mb-4 text-sm md:text-base text-center">
              We're here to help you with any questions about our products.
            </p>
          </div>
          
          {/* Call Us */}
          <div className="text-center  ">

            <h3 className="text-xl font-bold mb-4 flex items-center justify-center">
              <FaPhone className="mr-2 text-amber-500" /> CALL US
            </h3>
            <p className="text-gray-400 text-sm md:text-base text-center">Men-Aric Team-edition</p>
          </div>
          
          {/* Email Us */}
          <div className="text-center ">
        
            <h3 className=" w-full text-xl font-bold mb-4 flex items-center justify-center ">
              <FaEnvelope className="mr-2 text-amber-500" /> EMAIL US
            </h3>
            <p className="text-gray-400 text-sm md:text-base w-full flex justify-center ">Men-Aric Team-edition</p>
          </div>
        </div>
      </div>
      
      {/* Middle Section */}
      <div className="bg-gray-800 py-12 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* SHOP Column */}
            <div>
              <h4 className="text-lg font-bold mb-4">SHOP</h4>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <p className="text-gray-400 text-sm hover:text-amber-400 cursor-pointer transition-colors">Speedth Prices</p>
                  <p className="text-gray-400 text-sm hover:text-amber-400 cursor-pointer transition-colors">Stats</p>
                  <p className="text-gray-400 text-sm hover:text-amber-400 cursor-pointer transition-colors">Poles</p>
                  <p className="text-gray-400 text-sm hover:text-amber-400 cursor-pointer transition-colors">Best</p>
                </div>
                <div className="space-y-2">
                  <p className="text-gray-400 text-sm hover:text-amber-400 cursor-pointer transition-colors">About Us</p>
                  <p className="text-gray-400 text-sm hover:text-amber-400 cursor-pointer transition-colors">Contact Us</p>
                  <p className="text-gray-400 text-sm hover:text-amber-400 cursor-pointer transition-colors">Items & Conditions</p>
                </div>
                <div className="space-y-2">
                  <p className="text-gray-400 text-sm hover:text-amber-400 cursor-pointer transition-colors">Track Order</p>
                  <p className="text-gray-400 text-sm hover:text-amber-400 cursor-pointer transition-colors">Return/Before age</p>
                  <p className="text-gray-400 text-sm hover:text-amber-400 cursor-pointer transition-colors">Free Shipping & Returns</p>
                </div>
              </div>
            </div>
            
            {/* Bottom View */}
            <div className="col-span-2">
              <h4 className="text-lg font-bold mb-4">BOTTOM VIEW</h4>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <p className="text-gray-400 mb-4 text-sm md:text-base">Winterwear</p>
                  <p className="text-gray-400 text-sm md:text-base">Frequently Asked Questions</p>
                  <div className="mt-6 flex space-x-4">
                    <a href="#" className="bg-gray-700 p-2 rounded-full hover:bg-amber-500 transition-colors">
                      <FaFacebookF className="text-white" />
                    </a>
                    <a href="#" className="bg-gray-700 p-2 rounded-full hover:bg-amber-500 transition-colors">
                      <FaTwitter className="text-white" />
                    </a>
                    <a href="#" className="bg-gray-700 p-2 rounded-full hover:bg-amber-500 transition-colors">
                      <FaInstagram className="text-white" />
                    </a>
                    <a href="#" className="bg-gray-700 p-2 rounded-full hover:bg-amber-500 transition-colors">
                      <FaPinterestP className="text-white" />
                    </a>
                  </div>
                </div>
                <div>
                  <h5 className="font-bold mb-2 text-sm md:text-base">Sign up & Save 10% on your order</h5>
                  <p className="text-gray-400 mb-4 text-sm">
                    We'll send you updates on new board use, products and events, any good stuff.
                  </p>
                  <div className="flex border">
                    <input 
                      type="email" 
                      placeholder="Enter your email" 
                      className="bg-gray-700 text-white px-4 py-2 rounded-l flex-grow focus:outline-none text-sm w-full"
                    />
                    <button className="bg-amber-600 px-4 py-2 rounded-r hover:bg-amber-700 transition-colors w-full">
                      <FaArrowRight />
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Bracket */}
            <div>
              <h4 className="text-lg font-bold mb-4">BRACKET</h4>
              <p className="text-gray-400 text-sm md:text-base">Pure Grain</p>
              <div className="mt-6">
                <p className="text-sm text-gray-400 mb-2">Payment Methods:</p>
                <div className="flex space-x-2">
                  <div className="bg-gray-700 w-10 h-6 rounded flex items-center justify-center">
                    <span className="text-xs">VISA</span>
                  </div>
                  <div className="bg-gray-700 w-10 h-6 rounded flex items-center justify-center">
                    <span className="text-xs">MC</span>
                  </div>
                  <div className="bg-gray-700 w-10 h-6 rounded flex items-center justify-center">
                    <span className="text-xs">PP</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Services Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 pt-8 border-t border-gray-700">
            <div className="flex items-center">
              <FaTruck className="text-amber-500 text-2xl mr-3" />
              <div>
                <p className="font-bold text-sm md:text-base">Free Shipping</p>
                <p className="text-gray-400 text-xs md:text-sm">On orders over $50</p>
              </div>
            </div>
            <div className="flex items-center">
              <FaTag className="text-amber-500 text-2xl mr-3" />
              <div>
                <p className="font-bold text-sm md:text-base">Special Offers</p>
                <p className="text-gray-400 text-xs md:text-sm">Members get 20% off</p>
              </div>
            </div>
            <div className="flex items-center">
              <FaLock className="text-amber-500 text-2xl mr-3" />
              <div>
                <p className="font-bold text-sm md:text-base">Secure Payments</p>
                <p className="text-gray-400 text-xs md:text-sm">SSL encrypted</p>
              </div>
            </div>
            <div className="flex items-center">
              <FaHeadset className="text-amber-500 text-2xl mr-3" />
              <div>
                <p className="font-bold text-sm md:text-base">24/7 Support</p>
                <p className="text-gray-400 text-xs md:text-sm">Dedicated customer service</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom Section */}
      <div className="bg-gray-900 py-6 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <button className="flex items-center font-bold hover:text-amber-400 transition-colors text-sm md:text-base">
              BECOME A MEMBER <FaArrowRight className="ml-2" />
            </button>
          </div>
          <div className="text-center mb-4 md:mb-0">
            <p className="text-gray-400 text-sm md:text-base">© 2023. Andaman - All rights reserved.</p>
          </div>
          <div>
            <p className="text-gray-400 text-sm md:text-base">
              <span className="hover:text-amber-400 cursor-pointer transition-colors">Terms & Conditions</span> | 
              <span className="hover:text-amber-400 cursor-pointer transition-colors ml-1">Privacy Policy</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;