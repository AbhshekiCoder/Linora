// src/components/CarouselManagement.js
import React, { useState } from 'react';
import { FaPlus, FaTrash, FaArrowUp, FaArrowDown, FaEdit } from 'react-icons/fa';

const CarouselManagement = () => {
  const [carouselItems, setCarouselItems] = useState([
    {
      id: 1,
      title: "Summer Collection",
      subtitle: "Discover our new cashmere line",
      buttonText: "Shop Now",
      url: "/summer-collection",
      image: "carousel1.jpg",
      order: 1
    },
    {
      id: 2,
      title: "Limited Edition",
      subtitle: "Exclusive designs for the season",
      buttonText: "View Collection",
      url: "/limited-edition",
      image: "carousel2.jpg",
      order: 2
    },
    {
      id: 3,
      title: "Special Offers",
      subtitle: "Up to 30% off selected items",
      buttonText: "Shop Sale",
      url: "/sale",
      image: "carousel3.jpg",
      order: 3
    }
  ]);
  
  const [newItem, setNewItem] = useState({
    title: '',
    subtitle: '',
    buttonText: 'Shop Now',
    url: '',
    image: null,
    order: carouselItems.length + 1
  });
  
  const [isAdding, setIsAdding] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewItem({ ...newItem, [name]: value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewItem({ ...newItem, image: URL.createObjectURL(file) });
    }
  };

  const handleAddItem = (e) => {
    e.preventDefault();
    const newItemWithId = { ...newItem, id: Date.now() };
    setCarouselItems([...carouselItems, newItemWithId]);
    setNewItem({
      title: '',
      subtitle: '',
      buttonText: 'Shop Now',
      url: '',
      image: null,
      order: carouselItems.length + 2
    });
    setIsAdding(false);
  };

  const deleteItem = (id) => {
    setCarouselItems(carouselItems.filter(item => item.id !== id));
  };

  const moveItem = (id, direction) => {
    const index = carouselItems.findIndex(item => item.id === id);
    if ((direction === 'up' && index === 0) || (direction === 'down' && index === carouselItems.length - 1)) {
      return;
    }
    
    const newItems = [...carouselItems];
    const swapIndex = direction === 'up' ? index - 1 : index + 1;
    
    // Swap the order values
    const tempOrder = newItems[index].order;
    newItems[index].order = newItems[swapIndex].order;
    newItems[swapIndex].order = tempOrder;
    
    // Swap the array positions
    [newItems[index], newItems[swapIndex]] = [newItems[swapIndex], newItems[index]];
    
    setCarouselItems(newItems);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Homepage Carousel</h2>
          <button
            onClick={() => setIsAdding(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
          >
            <FaPlus className="mr-2" /> Add Slide
          </button>
        </div>
        
        {isAdding && (
          <div className="bg-gray-50 rounded-lg p-6 mb-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Add New Carousel Slide</h3>
            <form onSubmit={handleAddItem} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Title</label>
                  <input
                    type="text"
                    name="title"
                    value={newItem.title}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Subtitle</label>
                  <input
                    type="text"
                    name="subtitle"
                    value={newItem.subtitle}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Button Text</label>
                  <input
                    type="text"
                    name="buttonText"
                    value={newItem.buttonText}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">URL</label>
                  <input
                    type="text"
                    name="url"
                    value={newItem.url}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    required
                    placeholder="e.g., /new-collection"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Slide Image</label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                  <div className="space-y-1 text-center">
                    {newItem.image ? (
                      <div className="relative">
                        <img src={newItem.image} alt="Slide preview" className="max-h-48 mx-auto" />
                        <button
                          type="button"
                          onClick={() => setNewItem({...newItem, image: null})}
                          className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                        >
                          <FaTrash size={12} />
                        </button>
                      </div>
                    ) : (
                      <>
                        <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                          <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <div className="flex text-sm text-gray-600">
                          <label className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500">
                            <span>Upload an image</span>
                            <input type="file" className="sr-only" onChange={handleImageUpload} accept="image/*" />
                          </label>
                          <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                      </>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsAdding(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                >
                  Add Slide
                </button>
              </div>
            </form>
          </div>
        )}
        
        <div className="space-y-4">
          {carouselItems
            .sort((a, b) => a.order - b.order)
            .map((item) => (
              <div key={item.id} className="border border-gray-200 rounded-lg p-4 flex flex-col md:flex-row">
                <div className="md:w-1/3 mb-4 md:mb-0">
                  <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-48" />
                </div>
                
                <div className="md:w-2/3 md:pl-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-medium">{item.title}</h3>
                      <p className="text-gray-600 mt-1">{item.subtitle}</p>
                      <div className="mt-2">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          Order: {item.order}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex space-x-2">
                      <button
                        onClick={() => moveItem(item.id, 'up')}
                        disabled={item.order === 1}
                        className={`p-1 rounded ${item.order === 1 ? 'text-gray-300' : 'text-gray-600 hover:bg-gray-100'}`}
                      >
                        <FaArrowUp />
                      </button>
                      <button
                        onClick={() => moveItem(item.id, 'down')}
                        disabled={item.order === carouselItems.length}
                        className={`p-1 rounded ${item.order === carouselItems.length ? 'text-gray-300' : 'text-gray-600 hover:bg-gray-100'}`}
                      >
                        <FaArrowDown />
                      </button>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <a href={item.url} className="text-indigo-600 hover:text-indigo-900 text-sm">
                      {item.url}
                    </a>
                  </div>
                  
                  <div className="mt-4 flex items-center">
                    <button className="inline-flex items-center px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 mr-3">
                      <FaEdit className="mr-1" /> Edit
                    </button>
                    <button 
                      onClick={() => deleteItem(item.id)}
                      className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
                    >
                      <FaTrash className="mr-1" /> Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default CarouselManagement;