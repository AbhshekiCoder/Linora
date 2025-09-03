import React, { useEffect, useState } from 'react';

const slides = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1600&q=80',
    title: 'Latest Fashion',
    description: 'Discover the trendiest styles of the season.',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=1600&q=80',
    title: 'New Electronics',
    description: 'Shop the latest gadgets and devices now.',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1519744792095-2f2205e87b6f?auto=format&fit=crop&w=1600&q=80',
    title: 'Footwear Sale',
    description: 'Stylish shoes with up to 50% off.',
  },
];
const Carousel = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4000); // Change every 2 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-[400px] overflow-hidden rounded-lg shadow-lg">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-all duration-700 ease-in-out transform 
          ${index === current ? 'opacity-100 scale-100 z-10' : 'opacity-0 scale-95 z-0'}`}
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-center text-white text-center px-4">
            <h2 className="text-3xl md:text-4xl font-bold mb-2">{slide.title}</h2>
            <p className="text-lg md:text-xl">{slide.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Carousel;
