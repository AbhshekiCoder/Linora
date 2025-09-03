import React from "react";

const galleryItems = [
  {
    id: 1,
    title: "Mountain Adventure",
    description: "Explore breathtaking mountain landscapes and trails",
    buttonText: "Discover",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4"
  },
  {
    id: 2,
    title: "Beach Paradise",
    description: "Relax on pristine beaches with crystal clear waters",
    buttonText: "Visit",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e"
  },
  {
    id: 3,
    title: "Urban Exploration",
    description: "Discover vibrant city life and modern architecture",
    buttonText: "Explore",
    image: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df"
  },
  {
    id: 4,
    title: "Forest Retreat",
    description: "Immerse yourself in lush green forests and wildlife",
    buttonText: "Hike",
    image: "https://images.unsplash.com/photo-1448375240586-882707db888b"
  }
];

const ImageGallery = () => {
  return (
    <div className="w-full px-4 py-8 flex flex-col md:flex-row gap-4">
  {/* Left Panel */}
  <div className="flex  justify-between bg-[#D4CAC0] w-full md:w-1/2 p-6 md:p-10 min-h-[400px]">
    <div className="flex flex-col justify-center h-full">
      <div className="text-lg font-medium">Linora</div>
      <div className="mt-4 text-md text-gray-700 space-y-6">
        <p>
          10+ years of premium fashion.<br />
          Over 2 lakh happy customers.<br />
          1500+ unique styles.
        </p>
        <p>
          And a relentless vision of setting<br />
          a new benchmark for<br />
          premium Indian fashion.
        </p>
        <button className="underline transition-all duration-300 hover:text-gray-800 hover:pl-2">
          Read Review
        </button>
      </div>
    </div>
    <div className="w-full mt-8 md:mt-0 flex justify-center items-center">
      <img 
        src="https://cdn.pixabay.com/photo/2023/08/17/05/55/ai-generated-8195533_1280.png" 
        className="w-full max-w-[400px] object-contain"
        alt="Fashion showcase"
      />
    </div>
  </div>

  {/* Right Gallery Grid */}
  <div className="w-full md:w-1/2 grid grid-cols-2 gap-2 min-h-[400px]">
    {galleryItems.map(item => (
      <div 
        key={item.id}
        className="relative p-6 flex items-end overflow-hidden group"
        style={{ 
          backgroundImage: `url(${item.image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-90"></div>
        
        {/* Content */}
        <div className="relative z-10 text-white transition-all duration-700 transform translate-y-0 group-hover:-translate-y-3">
          <p className="text-sm md:text-base">{item.description}</p>
          <button className="mt-3 underline transition-all duration-300 hover:pl-2">
            {item.buttonText}
          </button>
        </div>
        
        {/* Hover Animation Element */}
        <div className="absolute inset-0 bg-white opacity-0 transition-all duration-1000 transform translate-y-full group-hover:translate-y-0 group-hover:opacity-10"></div>
      </div>
    ))}
  </div>
</div>

  );
};

export default ImageGallery;
