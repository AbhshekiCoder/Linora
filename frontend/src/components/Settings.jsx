// src/components/Settings.js
import React, { useState } from 'react';
import { FaSave, FaLock, FaUser, FaBell, FaGlobe } from 'react-icons/fa';

const Settings = () => {
  const [adminDetails, setAdminDetails] = useState({
    name: 'Admin Name',
    email: 'admin@naadam.co',
    notifications: true,
    language: 'en'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAdminDetails({ ...adminDetails, [name]: value });
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setAdminDetails({ ...adminDetails, [name]: checked });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Settings saved successfully!');
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-6">Admin Settings</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="border-b border-gray-200 pb-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
            <FaUser className="mr-2 text-indigo-600" /> Profile Information
          </h3>
          
          <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-6 gap-x-4">
            <div className="sm:col-span-3">
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                name="name"
                value={adminDetails.name}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            </div>
            
            <div className="sm:col-span-4">
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={adminDetails.email}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            </div>
          </div>
        </div>
        
        <div className="border-b border-gray-200 pb-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
            <FaLock className="mr-2 text-indigo-600" /> Security
          </h3>
          
          <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-6 gap-x-4">
            <div className="sm:col-span-3">
              <label className="block text-sm font-medium text-gray-700">Current Password</label>
              <input
                type="password"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            </div>
            
            <div className="sm:col-span-3">
              <label className="block text-sm font-medium text-gray-700">New Password</label>
              <input
                type="password"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            </div>
            
            <div className="sm:col-span-3">
              <label className="block text-sm font-medium text-gray-700">Confirm New Password</label>
              <input
                type="password"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            </div>
          </div>
        </div>
        
        <div className="border-b border-gray-200 pb-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
            <FaBell className="mr-2 text-indigo-600" /> Notifications
          </h3>
          
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  type="checkbox"
                  name="notifications"
                  checked={adminDetails.notifications}
                  onChange={handleCheckboxChange}
                  className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
                />
              </div>
              <div className="ml-3 text-sm">
                <label className="font-medium text-gray-700">Email Notifications</label>
                <p className="text-gray-500">Receive email notifications for important events</p>
              </div>
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
            <FaGlobe className="mr-2 text-indigo-600" /> Preferences
          </h3>
          
          <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-6 gap-x-4">
            <div className="sm:col-span-3">
              <label className="block text-sm font-medium text-gray-700">Language</label>
              <select
                name="language"
                value={adminDetails.language}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              >
                <option value="en">English</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
                <option value="de">German</option>
              </select>
            </div>
          </div>
        </div>
        
        <div className="flex justify-end">
          <button
            type="submit"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
          >
            <FaSave className="mr-2" /> Save Settings
          </button>
        </div>
      </form>
    </div>
  );
};

export default Settings;