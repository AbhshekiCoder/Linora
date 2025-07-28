// src/App.js
import React, { useState } from 'react';
import { FaBox, FaTags, FaImage, FaQuoteRight, FaTicketAlt, FaAd, FaShoppingBag, FaCog, FaSignOutAlt, FaBars } from 'react-icons/fa';
import ProductManagement from '../components/ProductManagement';
import OrdersManagement from '../components/OrdersManagement';
import CouponManagement from '../components/CouponManagement';
import AdsManagement from '../components/AdsManagement';
import CarouselManagement from '../components/CarouselManagement';
import QuotesManagement from '../components/QuotesManagement';
import OtherImagesManagement from '../components/OtherImagesManagement';
import Settings from '../components/Settings';

function Admin() {
  const [activeTab, setActiveTab] = useState('products');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  const renderContent = () => {
    switch(activeTab) {
      case 'products': return <ProductManagement />;
      case 'orders': return <OrdersManagement />;
      case 'coupons': return <CouponManagement />;
      case 'ads': return <AdsManagement />;
      case 'carousel': return <CarouselManagement />;
      case 'quotes': return <QuotesManagement />;
      case 'images': return <OtherImagesManagement/>;
      case 'settings': return <Settings/>;
      default: return <ProductManagement />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Mobile sidebar toggle */}
      <button 
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-indigo-600 text-white rounded-lg"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        <FaBars />
      </button>

      {/* Sidebar */}
      <div 
        className={`fixed inset-y-0 left-0 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 transition-transform duration-300 ease-in-out bg-indigo-800 text-white w-64 z-40`}
      >
        <div className="flex items-center justify-center h-16 border-b border-indigo-700">
          <h1 className="text-2xl font-bold"> Admin</h1>
        </div>
        <div className="p-4">
          <div className="flex items-center space-x-4 p-4 bg-indigo-700 rounded-lg">
            <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16" />
            <div>
              <h2 className="font-semibold">Admin Name</h2>
              <p className="text-indigo-200 text-sm">admin@.com</p>
            </div>
          </div>
        </div>
        <nav className="mt-6">
          {[
            { id: 'products', icon: <FaBox />, label: 'Products' },
            { id: 'orders', icon: <FaShoppingBag />, label: 'Orders' },
            { id: 'coupons', icon: <FaTicketAlt />, label: 'Coupons' },
            { id: 'ads', icon: <FaAd />, label: 'Ads' },
            { id: 'carousel', icon: <FaImage />, label: 'Carousel' },
            { id: 'quotes', icon: <FaQuoteRight />, label: 'Quotes' },
            { id: 'images', icon: <FaImage />, label: 'Other Images' },
            { id: 'settings', icon: <FaCog />, label: 'Settings' }
          ].map((item) => (
            <button
              key={item.id}
              className={`flex items-center w-full px-6 py-3 text-left ${activeTab === item.id ? 'bg-indigo-700' : 'hover:bg-indigo-700'}`}
              onClick={() => {
                setActiveTab(item.id);
                setSidebarOpen(false);
              }}
            >
              <span className="mr-3">{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
          <button className="flex items-center w-full px-6 py-3 text-left hover:bg-indigo-700 mt-4">
            <span className="mr-3"><FaSignOutAlt /></span>
            <span>Logout</span>
          </button>
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden md:ml-64">
        <header className="flex items-center justify-between p-4 bg-white shadow-sm">
          <div>
            <h1 className="text-xl font-semibold capitalize">{activeTab}</h1>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <button className="p-2 rounded-full hover:bg-gray-100">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
              </button>
            </div>
            <div className="flex items-center">
              <div className="bg-gray-200 border-2 border-dashed rounded-xl w-8 h-8" />
              <span className="ml-2 font-medium">Admin</span>
            </div>
          </div>
        </header>
        
        <main className="flex-1 overflow-y-auto p-4 bg-gray-50">
          {renderContent()}
        </main>
        
        <footer className="bg-white p-4 border-t">
          <p className="text-center text-gray-500 text-sm">© {new Date().getFullYear()}  E-commerce Admin Panel</p>
        </footer>
      </div>
    </div>
  );
}

export default Admin