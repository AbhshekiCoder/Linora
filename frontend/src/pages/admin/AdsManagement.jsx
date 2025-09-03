// src/components/AdsManagement.js
import React, { useState } from 'react';
import { FaPlus, FaTrash, FaEdit, FaCalendarAlt, FaEye } from 'react-icons/fa';

const AdsManagement = () => {
  const [ads, setAds] = useState([
    {
      id: 1,
      title: 'Summer Sale',
      image: 'summer-sale.jpg',
      status: 'Active',
      startDate: '2023-07-01',
      endDate: '2023-08-31',
      url: '/summer-sale',
      position: 'Homepage Banner'
    },
    {
      id: 2,
      title: 'New Collection',
      image: 'new-collection.jpg',
      status: 'Active',
      startDate: '2023-07-15',
      endDate: '2023-09-15',
      url: '/new-arrivals',
      position: 'Sidebar'
    },
    {
      id: 3,
      title: 'Cashmere Special',
      image: 'cashmere-special.jpg',
      status: 'Expired',
      startDate: '2023-06-01',
      endDate: '2023-06-30',
      url: '/cashmere',
      position: 'Homepage Banner'
    }
  ]);
  
  const [newAd, setNewAd] = useState({
    title: '',
    image: null,
    status: 'Active',
    startDate: '',
    endDate: '',
    url: '',
    position: 'Homepage Banner'
  });
  
  const [isAdding, setIsAdding] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAd({ ...newAd, [name]: value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewAd({ ...newAd, image: URL.createObjectURL(file) });
    }
  };

  const handleAddAd = (e) => {
    e.preventDefault();
    const newAdWithId = { ...newAd, id: Date.now() };
    setAds([...ads, newAdWithId]);
    setNewAd({
      title: '',
      image: null,
      status: 'Active',
      startDate: '',
      endDate: '',
      url: '',
      position: 'Homepage Banner'
    });
    setIsAdding(false);
  };

  const deleteAd = (id) => {
    setAds(ads.filter(ad => ad.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Sales Ads</h2>
          <button
            onClick={() => setIsAdding(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
          >
            <FaPlus className="mr-2" /> Create Ad
          </button>
        </div>
        
        {isAdding && (
          <div className="bg-gray-50 rounded-lg p-6 mb-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Create New Ad</h3>
            <form onSubmit={handleAddAd} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Ad Title</label>
                  <input
                    type="text"
                    name="title"
                    value={newAd.title}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Position</label>
                  <select
                    name="position"
                    value={newAd.position}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  >
                    <option value="Homepage Banner">Homepage Banner</option>
                    <option value="Sidebar">Sidebar</option>
                    <option value="Product Page">Product Page</option>
                    <option value="Checkout">Checkout</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Status</label>
                  <select
                    name="status"
                    value={newAd.status}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  >
                    <option value="Active">Active</option>
                    <option value="Scheduled">Scheduled</option>
                    <option value="Inactive">Inactive</option>
                    <option value="Expired">Expired</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">URL</label>
                  <input
                    type="text"
                    name="url"
                    value={newAd.url}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    required
                    placeholder="e.g., /summer-sale"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Start Date</label>
                  <input
                    type="date"
                    name="startDate"
                    value={newAd.startDate}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">End Date</label>
                  <input
                    type="date"
                    name="endDate"
                    value={newAd.endDate}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Ad Image</label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                  <div className="space-y-1 text-center">
                    {newAd.image ? (
                      <div className="relative">
                        <img src={newAd.image} alt="Ad preview" className="max-h-48 mx-auto" />
                        <button
                          type="button"
                          onClick={() => setNewAd({...newAd, image: null})}
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
                  Create Ad
                </button>
              </div>
            </form>
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ads.map(ad => (
            <div key={ad.id} className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
              <div className="bg-gray-200 border-2 border-dashed w-full h-48" />
              <div className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">{ad.title}</h3>
                    <p className="text-sm text-gray-500">{ad.position}</p>
                  </div>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    ad.status === 'Active' ? 'bg-green-100 text-green-800' :
                    ad.status === 'Scheduled' ? 'bg-blue-100 text-blue-800' :
                    ad.status === 'Inactive' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {ad.status}
                  </span>
                </div>
                
                <div className="mt-4 flex items-center text-sm text-gray-500">
                  <FaCalendarAlt className="mr-2" />
                  <span>{ad.startDate} to {ad.endDate}</span>
                </div>
                
                <div className="mt-4">
                  <a href={ad.url} className="text-sm text-indigo-600 hover:text-indigo-900">
                    {ad.url}
                  </a>
                </div>
                
                <div className="mt-4 flex justify-between">
                  <button className="text-indigo-600 hover:text-indigo-900 flex items-center">
                    <FaEye className="mr-1" /> Preview
                  </button>
                  <div>
                    <button className="text-indigo-600 hover:text-indigo-900 mr-3">
                      <FaEdit />
                    </button>
                    <button 
                      onClick={() => deleteAd(ad.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdsManagement;