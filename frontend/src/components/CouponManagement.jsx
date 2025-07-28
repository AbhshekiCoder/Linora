// src/components/CouponManagement.js
import React, { useState } from 'react';
import { FaPlus, FaTrash, FaEdit, FaSearch } from 'react-icons/fa';

const CouponManagement = () => {
  const [coupons, setCoupons] = useState([
    { id: 1, code: 'SUMMER20', discount: '20%', type: 'Percentage', minOrder: 50, expires: '2023-08-31', status: 'Active' },
    { id: 2, code: 'FREESHIP', discount: 'Free Shipping', type: 'Fixed', minOrder: 100, expires: '2023-09-15', status: 'Active' },
    { id: 3, code: 'WELCOME10', discount: '$10', type: 'Fixed', minOrder: 30, expires: '2023-07-31', status: 'Expired' }
  ]);
  
  const [newCoupon, setNewCoupon] = useState({
    code: '',
    discount: '',
    type: 'Percentage',
    minOrder: '',
    expires: '',
    status: 'Active'
  });
  
  const [isAdding, setIsAdding] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCoupon({ ...newCoupon, [name]: value });
  };

  const handleAddCoupon = (e) => {
    e.preventDefault();
    const newCouponWithId = { ...newCoupon, id: Date.now() };
    setCoupons([...coupons, newCouponWithId]);
    setNewCoupon({
      code: '',
      discount: '',
      type: 'Percentage',
      minOrder: '',
      expires: '',
      status: 'Active'
    });
    setIsAdding(false);
  };

  const deleteCoupon = (id) => {
    setCoupons(coupons.filter(coupon => coupon.id !== id));
  };

  const filteredCoupons = coupons.filter(coupon => 
    coupon.code.toLowerCase().includes(searchTerm.toLowerCase()) || 
    coupon.discount.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <h2 className="text-xl font-semibold">Coupon Codes</h2>
          
          <div className="flex gap-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search coupons..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full md:w-64"
              />
              <FaSearch className="absolute left-3 top-3 text-gray-400" />
            </div>
            
            <button
              onClick={() => setIsAdding(true)}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
            >
              <FaPlus className="mr-2" /> Add Coupon
            </button>
          </div>
        </div>
        
        {isAdding ? (
          <div className="bg-gray-50 rounded-lg p-6 mb-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Add New Coupon</h3>
            <form onSubmit={handleAddCoupon} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">Coupon Code</label>
                <input
                  type="text"
                  name="code"
                  value={newCoupon.code}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Discount Type</label>
                <select
                  name="type"
                  value={newCoupon.type}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                >
                  <option value="Percentage">Percentage</option>
                  <option value="Fixed">Fixed Amount</option>
                  <option value="Shipping">Free Shipping</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  {newCoupon.type === 'Percentage' ? 'Discount Percentage' : 
                   newCoupon.type === 'Fixed' ? 'Discount Amount ($)' : 
                   'Shipping Discount'}
                </label>
                <input
                  type={newCoupon.type === 'Percentage' ? 'number' : 'text'}
                  name="discount"
                  value={newCoupon.discount}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  required
                  placeholder={newCoupon.type === 'Percentage' ? 'e.g., 20' : 
                               newCoupon.type === 'Fixed' ? 'e.g., 10' : 
                               'Free Shipping'}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Minimum Order Amount ($)</label>
                <input
                  type="number"
                  name="minOrder"
                  value={newCoupon.minOrder}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Expiration Date</label>
                <input
                  type="date"
                  name="expires"
                  value={newCoupon.expires}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Status</label>
                <select
                  name="status"
                  value={newCoupon.status}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                  <option value="Expired">Expired</option>
                </select>
              </div>
              
              <div className="md:col-span-2 flex justify-end space-x-3">
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
                  Add Coupon
                </button>
              </div>
            </form>
          </div>
        ) : null}
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Code</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Discount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Min Order</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Expires</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredCoupons.map(coupon => (
                <tr key={coupon.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{coupon.code}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {coupon.type === 'Percentage' ? `${coupon.discount}%` : 
                     coupon.type === 'Fixed' ? `$${coupon.discount}` : 
                     coupon.discount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{coupon.type}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${coupon.minOrder}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{coupon.expires}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      coupon.status === 'Active' ? 'bg-green-100 text-green-800' :
                      coupon.status === 'Inactive' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {coupon.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button className="text-indigo-600 hover:text-indigo-900 mr-3">
                      <FaEdit />
                    </button>
                    <button 
                      onClick={() => deleteCoupon(coupon.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CouponManagement;