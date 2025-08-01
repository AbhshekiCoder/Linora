// src/components/CouponManagement.js
import React, { useState } from 'react';
import { FaPlus, FaTrash, FaEdit, FaSearch, FaSave, FaTimes } from 'react-icons/fa';

const CouponManagement = () => {
  const [coupons, setCoupons] = useState([
    { id: 1, code: 'SUMMER20', discount: '20', type: 'Percentage', minOrder: 50, expires: '2023-08-31', status: 'Active' },
    { id: 2, code: 'FREESHIP', discount: 'Free Shipping', type: 'Shipping', minOrder: 100, expires: '2023-09-15', status: 'Active' },
    { id: 3, code: 'WELCOME10', discount: '10', type: 'Fixed', minOrder: 30, expires: '2023-07-31', status: 'Expired' }
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
  const [editingCouponId, setEditingCouponId] = useState(null);
  const [editFormData, setEditFormData] = useState({
    code: '',
    discount: '',
    type: 'Percentage',
    minOrder: '',
    expires: '',
    status: 'Active'
  });
  
  // Discount types state with editing capability
  const [discountTypes, setDiscountTypes] = useState([
    { id: 1, name: 'Percentage', label: 'Percentage', editing: false },
    { id: 2, name: 'Fixed', label: 'Fixed Amount', editing: false },
    { id: 3, name: 'Shipping', label: 'Free Shipping', editing: false }
  ]);
  
  const [newDiscountType, setNewDiscountType] = useState({
    name: '',
    label: ''
  });
  
  const [isAddingDiscountType, setIsAddingDiscountType] = useState(false);

  const handleInputChange = (e, isEditing = false) => {
    const { name, value } = e.target;
    
    if (isEditing) {
      setEditFormData(prev => {
        const updated = { ...prev, [name]: value };
        if (name === 'type') {
          if (value === 'Shipping') {
            updated.discount = 'Free Shipping';
          } else if (prev.type === 'Shipping') {
            updated.discount = '';
          }
        }
        return updated;
      });
    } else {
      setNewCoupon(prev => {
        const updated = { ...prev, [name]: value };
        if (name === 'type') {
          if (value === 'Shipping') {
            updated.discount = 'Free Shipping';
          } else if (prev.type === 'Shipping') {
            updated.discount = '';
          }
        }
        return updated;
      });
    }
  };

  const handleAddCoupon = (e) => {
    e.preventDefault();
    const newCouponWithId = { 
      ...newCoupon, 
      id: Date.now(),
      discount: newCoupon.type === 'Shipping' ? 'Free Shipping' : newCoupon.discount
    };
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

  const handleEditClick = (coupon) => {
    setEditingCouponId(coupon.id);
    setEditFormData(coupon);
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    
    const updatedCoupons = coupons.map(coupon => 
      coupon.id === editingCouponId ? { 
        ...editFormData,
        discount: editFormData.type === 'Shipping' ? 'Free Shipping' : editFormData.discount
      } : coupon
    );
    
    setCoupons(updatedCoupons);
    setEditingCouponId(null);
  };

  const handleCancelEdit = () => {
    setEditingCouponId(null);
  };

  const deleteCoupon = (id) => {
    setCoupons(coupons.filter(coupon => coupon.id !== id));
    if (id === editingCouponId) {
      setEditingCouponId(null);
    }
  };

  // Discount type management functions
  const handleDiscountTypeChange = (e, id) => {
    const { name, value } = e.target;
    setDiscountTypes(prev => 
      prev.map(type => 
        type.id === id ? { ...type, [name]: value } : type
      )
    );
  };

  const saveDiscountTypeEdit = (id) => {
    setDiscountTypes(prev => 
      prev.map(type => 
        type.id === id ? { ...type, editing: false } : type
      )
    );
  };

  const startDiscountTypeEdit = (id) => {
    setDiscountTypes(prev => 
      prev.map(type => 
        type.id === id ? { ...type, editing: true } : type
      )
    );
  };

  const cancelDiscountTypeEdit = (id) => {
    setDiscountTypes(prev => 
      prev.map(type => 
        type.id === id ? { ...type, editing: false } : type
      )
    );
  };

  const deleteDiscountType = (id) => {
    const typeToDelete = discountTypes.find(type => type.id === id);
    if (!typeToDelete) return;
    
    // Delete all coupons of this discount type
    setCoupons(coupons.filter(coupon => coupon.type !== typeToDelete.name));
    
    // Reset forms if they were using this type
    if (newCoupon.type === typeToDelete.name) {
      setNewCoupon(prev => ({ ...prev, type: 'Percentage' }));
    }
    if (editFormData.type === typeToDelete.name) {
      setEditingCouponId(null);
    }
    
    // Remove discount type
    setDiscountTypes(discountTypes.filter(type => type.id !== id));
  };

  const addNewDiscountType = () => {
    if (!newDiscountType.name || !newDiscountType.label) return;
    
    const newType = {
      id: Date.now(),
      name: newDiscountType.name,
      label: newDiscountType.label,
      editing: false
    };
    
    setDiscountTypes([...discountTypes, newType]);
    setNewDiscountType({ name: '', label: '' });
    setIsAddingDiscountType(false);
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
          
          <div className="flex flex-wrap gap-4">
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
        
        {/* Discount Type Management */}
        <div className="mb-8 p-6 bg-gray-50 rounded-lg border border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-gray-900">Discount Types</h3>
            <button
              onClick={() => setIsAddingDiscountType(!isAddingDiscountType)}
              className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
            >
              {isAddingDiscountType ? 'Cancel' : 'Add New Type'}
            </button>
          </div>
          
          {isAddingDiscountType && (
            <div className="mb-6 p-4 bg-white rounded-md shadow-sm border border-gray-200">
              <h4 className="font-medium text-gray-800 mb-3">Add New Discount Type</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Internal Name</label>
                  <input
                    type="text"
                    value={newDiscountType.name}
                    onChange={(e) => setNewDiscountType({...newDiscountType, name: e.target.value})}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    placeholder="e.g., Bundle"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Display Label</label>
                  <input
                    type="text"
                    value={newDiscountType.label}
                    onChange={(e) => setNewDiscountType({...newDiscountType, label: e.target.value})}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    placeholder="e.g., Bundle Discount"
                  />
                </div>
              </div>
              <div className="mt-4 flex justify-end">
                <button
                  onClick={addNewDiscountType}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                >
                  Add Discount Type
                </button>
              </div>
            </div>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {discountTypes.map(type => (
              <div key={type.id} className="bg-white p-4 rounded-md shadow-sm border border-gray-200">
                {type.editing ? (
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Internal Name</label>
                      <input
                        type="text"
                        name="name"
                        value={type.name}
                        onChange={(e) => handleDiscountTypeChange(e, type.id)}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Display Label</label>
                      <input
                        type="text"
                        name="label"
                        value={type.label}
                        onChange={(e) => handleDiscountTypeChange(e, type.id)}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                      />
                    </div>
                    <div className="flex justify-end space-x-2">
                      <button
                        onClick={() => cancelDiscountTypeEdit(type.id)}
                        className="px-3 py-1 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => saveDiscountTypeEdit(type.id)}
                        className="px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700"
                      >
                        Save
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-medium text-gray-800">{type.label}</h4>
                      <p className="text-sm text-gray-500">{type.name}</p>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => startDiscountTypeEdit(type.id)}
                        className="text-indigo-600 hover:text-indigo-900"
                        title="Edit"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => deleteDiscountType(type.id)}
                        className="text-red-600 hover:text-red-900"
                        title="Delete"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
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
                  onChange={(e) => handleInputChange(e)}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Discount Type</label>
                <select
                  name="type"
                  value={newCoupon.type}
                  onChange={(e) => handleInputChange(e)}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                >
                  {discountTypes.map(type => (
                    <option key={type.name} value={type.name}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  {newCoupon.type === 'Shipping' ? 'Shipping Discount' : 
                   discountTypes.find(t => t.name === newCoupon.type)?.label || 'Discount Value'}
                </label>
                {newCoupon.type === 'Shipping' ? (
                  <div className="flex items-center">
                    <input
                      type="text"
                      name="discount"
                      value="Free Shipping"
                      disabled
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 bg-gray-100"
                    />
                  </div>
                ) : (
                  <input
                    type="number"
                    name="discount"
                    value={newCoupon.discount}
                    onChange={(e) => handleInputChange(e)}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    required
                    min="0"
                    placeholder={newCoupon.type === 'Percentage' ? 'e.g., 20' : 'e.g., 10'}
                  />
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Minimum Order Amount ($)</label>
                <input
                  type="number"
                  name="minOrder"
                  value={newCoupon.minOrder}
                  onChange={(e) => handleInputChange(e)}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  required
                  min="0"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Expiration Date</label>
                <input
                  type="date"
                  name="expires"
                  value={newCoupon.expires}
                  onChange={(e) => handleInputChange(e)}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Status</label>
                <select
                  name="status"
                  value={newCoupon.status}
                  onChange={(e) => handleInputChange(e)}
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
                <React.Fragment key={coupon.id}>
                  {editingCouponId === coupon.id ? (
                    // Editable row
                    <tr className="bg-blue-50">
                      <td className="px-6 py-4">
                        <input
                          type="text"
                          name="code"
                          value={editFormData.code}
                          onChange={(e) => handleInputChange(e, true)}
                          className="w-full p-2 border rounded"
                          required
                        />
                      </td>
                      <td className="px-6 py-4">
                        {editFormData.type === 'Shipping' ? (
                          <div className="flex items-center">
                            <input
                              type="text"
                              name="discount"
                              value="Free Shipping"
                              disabled
                              className="w-full p-2 border rounded bg-gray-100"
                            />
                          </div>
                        ) : (
                          <input
                            type="number"
                            name="discount"
                            value={editFormData.discount}
                            onChange={(e) => handleInputChange(e, true)}
                            className="w-full p-2 border rounded"
                            required
                            min="0"
                          />
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <select
                          name="type"
                          value={editFormData.type}
                          onChange={(e) => handleInputChange(e, true)}
                          className="w-full p-2 border rounded"
                        >
                          {discountTypes.map(type => (
                            <option key={type.name} value={type.name}>
                              {type.label}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className="px-6 py-4">
                        <input
                          type="number"
                          name="minOrder"
                          value={editFormData.minOrder}
                          onChange={(e) => handleInputChange(e, true)}
                          className="w-full p-2 border rounded"
                          required
                          min="0"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <input
                          type="date"
                          name="expires"
                          value={editFormData.expires}
                          onChange={(e) => handleInputChange(e, true)}
                          className="w-full p-2 border rounded"
                          required
                        />
                      </td>
                      <td className="px-6 py-4">
                        <select
                          name="status"
                          value={editFormData.status}
                          onChange={(e) => handleInputChange(e, true)}
                          className="w-full p-2 border rounded"
                        >
                          <option value="Active">Active</option>
                          <option value="Inactive">Inactive</option>
                          <option value="Expired">Expired</option>
                        </select>
                      </td>
                      <td className="px-6 py-4 flex space-x-2">
                        <button
                          onClick={handleSaveEdit}
                          className="text-green-600 hover:text-green-800"
                          title="Save"
                        >
                          <FaSave />
                        </button>
                        <button
                          onClick={handleCancelEdit}
                          className="text-gray-600 hover:text-gray-800"
                          title="Cancel"
                        >
                          <FaTimes />
                        </button>
                      </td>
                    </tr>
                  ) : (
                    // Normal display row
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{coupon.code}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {coupon.type === 'Percentage' ? `${coupon.discount}%` : 
                         coupon.type === 'Fixed' ? `$${coupon.discount}` : 
                         coupon.discount}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {discountTypes.find(t => t.name === coupon.type)?.label || coupon.type}
                      </td>
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
                        <button 
                          onClick={() => handleEditClick(coupon)}
                          className="text-indigo-600 hover:text-indigo-900 mr-3"
                        >
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
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CouponManagement;