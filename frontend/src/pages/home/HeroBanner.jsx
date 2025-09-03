import React, { useRef } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const HeroBanner = () => {
  const sliderRef = useRef(null);
  const categories = [
    { 
      name: "POLO SHIRTS", 
      imageUrl: "https://images.unsplash.com/photo-1523381294911-8d3cead13475?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80" 
    },
    { 
      name: "CASUAL SHIRTS", 
      imageUrl: "https://images.unsplash.com/photo-1598032895397-b9472444bf93?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80" 
    },
    { 
      name: "HOODIES & SWEATSHIRTS", 
      imageUrl: "https://images.unsplash.com/photo-1588117305388-c2631a279f82?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80" 
    },
    { 
      name: "TROUSERS", 
      imageUrl: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80" 
    },
    { 
      name: "SHORTS", 
      imageUrl: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80" 
    },
    { 
      name: "JACKETS", 
      imageUrl: "https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80" 
    },
    { 
      name: "ACCESSORIES", 
      imageUrl: "https://images.unsplash.com/photo-1605733513597-a8f8341084e6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80" 
    },
  ];

  const scroll = (scrollOffset) => {
    sliderRef.current.scrollLeft += scrollOffset;
  };

  return (
    <div className="w-full mt-10 relative px-4 pb-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-light mb-1 text-gray-800">Men: Shop by Category</h2>
        <div className="w-16 h-0.5 bg-gray-800 mb-6"></div>
        
        {/* Arrows */}
        <button
          onClick={() => scroll(-400)}
          className="absolute left-24 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-3 shadow-lg z-10 hover:bg-gray-100 transition-all max-sm:hidden"
          style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
        >
          <FaChevronLeft className="text-gray-700" />
        </button>
        <button
          onClick={() => scroll(400)}
          className="absolute right-24 top-1/2 transform -translate-y-1/2  max-sm:hidden bg-white rounded-full p-3 shadow-lg z-10 hover:bg-gray-100 transition-all"
          style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
        >
          <FaChevronRight className="text-gray-700" />
        </button>

        {/* Slider */}
        <div
          ref={sliderRef}
          className="category-slider flex overflow-x-auto gap-6 scroll-smooth pb-6 px-1"
        >
          {categories.map((category, index) => (
            <div 
              key={index} 
              className="min-w-[250px] flex flex-col group cursor-pointer transition-all duration-300 hover:scale-[1.02]"
            >
              <div className="overflow-hidden rounded-md mb-3">
                <img 
                  src={category.imageUrl} 
                  alt={category.name} 
                  className="w-full h-[300px] object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <h3 className="text-lg font-medium text-gray-800 text-center">{category.name}</h3>
            </div>
          ))}
        </div>
      </div>
      
    
    </div>
  );
};

export default HeroBanner;