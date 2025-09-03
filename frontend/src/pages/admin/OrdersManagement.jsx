// src/components/OrdersManagement.js
import React, { useState } from 'react';
import { FaSearch, FaEye, FaEdit, FaTrash, FaCheck, FaTimes, FaGift, FaBox } from 'react-icons/fa';

const OrdersManagement = () => {
  const [orders, setOrders] = useState([
    {
      id: 'ORD-001',
      customer: 'John Doe',
      email: 'john@example.com',
      phone: '+1 123-456-7890',
      date: '2023-07-15',
      total: 249.99,
      status: 'Processing',
      orderType: 'gift',
      giftMessage: 'Happy Birthday!',
      giftWrap: true,
      items: [
        { name: 'Cashmere Sweater', price: 149.99, quantity: 1 },
        { name: 'Wool Scarf', price: 99.99, quantity: 1 }
      ],
      address: '123 Main St, New York, NY 10001',
      payment: 'Credit Card (****1234)',
      deliveryInstructions: 'Leave at front door if not home'
    },
    {
      id: 'ORD-002',
      customer: 'Jane Smith',
      email: 'jane@example.com',
      phone: '+1 987-654-3210',
      date: '2023-07-14',
      total: 349.98,
      status: 'Shipped',
      orderType: 'regular',
      giftMessage: '',
      giftWrap: false,
      items: [
        { name: 'Cashmere Cardigan', price: 199.99, quantity: 1 },
        { name: 'Cashmere Beanie', price: 49.99, quantity: 2 }
      ],
      address: '456 Park Ave, Boston, MA 02108',
      payment: 'PayPal (jane.smith@example.com)',
      deliveryInstructions: 'Call upon arrival'
    },
    {
      id: 'ORD-003',
      customer: 'Robert Johnson',
      email: 'robert@example.com',
      phone: '+1 555-123-4567',
      date: '2023-07-12',
      total: 149.99,
      status: 'Delivered',
      orderType: 'gift',
      giftMessage: 'Congratulations on your promotion!',
      giftWrap: true,
      items: [
        { name: 'Cashmere Gloves', price: 79.99, quantity: 1 },
        { name: 'Cashmere Socks', price: 34.99, quantity: 2 }
      ],
      address: '789 Broadway, Chicago, IL 60601',
      payment: 'Credit Card (****5678)',
      deliveryInstructions: 'Deliver to reception desk'
    }
  ]);
  
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [editingOrder, setEditingOrder] = useState(null);
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [editMode, setEditMode] = useState(false);

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleEditOrder = (order) => {
    setSelectedOrder(order);
    setEditingOrder({...order});
    setEditMode(true);
  };

  const handleSaveOrder = () => {
    if (editingOrder) {
      const updatedOrders = orders.map(order => 
        order.id === editingOrder.id ? editingOrder : order
      );
      setOrders(updatedOrders);
      setSelectedOrder(editingOrder);
      setEditMode(false);
      alert('Order updated successfully!');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditingOrder({...editingOrder, [name]: value});
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setEditingOrder({...editingOrder, [name]: checked});
  };

  const updateStatus = (status) => {
    if (editingOrder) {
      setEditingOrder({...editingOrder, status});
      alert(`Order status updated to: ${status}`);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Manage Orders</h2>
        
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Search orders..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full md:w-64"
            />
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
          </div>
          
          <div className="flex gap-2">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2"
            >
              <option value="all">All Statuses</option>
              <option value="Processing">Processing</option>
              <option value="Shipped">Shipped</option>
              <option value="Delivered">Delivered</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredOrders.map(order => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{order.customer}</div>
                    <div className="text-sm text-gray-500">{order.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${order.total.toFixed(2)}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex items-center text-xs font-medium rounded-full ${
                      order.orderType === 'gift' 
                        ? 'bg-purple-100 text-purple-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {order.orderType === 'gift' && <FaGift className="mr-1" />}
                      {order.orderType === 'gift' ? 'Gift' : 'Regular'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      order.status === 'Processing' ? 'bg-yellow-100 text-yellow-800' :
                      order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' :
                      order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => setSelectedOrder(order)}
                        className="text-indigo-600 hover:text-indigo-900"
                        title="View Details"
                      >
                        <FaEye />
                      </button>
                      <button 
                        onClick={() => handleEditOrder(order)}
                        className="text-yellow-600 hover:text-yellow-900"
                        title="Edit Order"
                      >
                        <FaEdit />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {selectedOrder && (
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Order Details: {selectedOrder.id}</h2>
            <button 
              onClick={() => {
                setSelectedOrder(null);
                setEditMode(false);
              }}
              className="text-gray-500 hover:text-gray-700"
            >
              <FaTimes />
            </button>
          </div>
          
          {editMode ? (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Customer Information</h3>
                  <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Name</label>
                      <input
                        type="text"
                        name="customer"
                        value={editingOrder.customer}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={editingOrder.email}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Phone</label>
                      <input
                        type="text"
                        name="phone"
                        value={editingOrder.phone}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Shipping Address</label>
                      <textarea
                        name="address"
                        value={editingOrder.address}
                        onChange={handleInputChange}
                        rows={2}
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Delivery Instructions</label>
                      <textarea
                        name="deliveryInstructions"
                        value={editingOrder.deliveryInstructions}
                        onChange={handleInputChange}
                        rows={2}
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                        placeholder="Special instructions for delivery"
                      />
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Order Summary</h3>
                  <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Order Date</label>
                      <input
                        type="text"
                        value={editingOrder.date}
                        disabled
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2 bg-gray-100"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Payment Method</label>
                      <input
                        type="text"
                        name="payment"
                        value={editingOrder.payment}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Total</label>
                      <input
                        type="text"
                        value={`$${editingOrder.total.toFixed(2)}`}
                        disabled
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2 bg-gray-100"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Order Type</label>
                      <div className="mt-2 space-y-2">
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="orderType"
                            value="regular"
                            checked={editingOrder.orderType === 'regular'}
                            onChange={() => setEditingOrder({...editingOrder, orderType: 'regular'})}
                            className="h-4 w-4 text-indigo-600 border-gray-300"
                          />
                          <span className="ml-2 text-sm text-gray-700">Regular Order</span>
                        </label>
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="orderType"
                            value="gift"
                            checked={editingOrder.orderType === 'gift'}
                            onChange={() => setEditingOrder({...editingOrder, orderType: 'gift'})}
                            className="h-4 w-4 text-indigo-600 border-gray-300"
                          />
                          <span className="ml-2 text-sm text-gray-700">Gift Order</span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {editingOrder.orderType === 'gift' && (
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Gift Details</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Gift Message</label>
                      <textarea
                        name="giftMessage"
                        value={editingOrder.giftMessage}
                        onChange={handleInputChange}
                        rows={3}
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                        placeholder="Personal message for the recipient"
                      />
                    </div>
                    <div>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          name="giftWrap"
                          checked={editingOrder.giftWrap}
                          onChange={handleCheckboxChange}
                          className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
                        />
                        <span className="ml-2 text-sm text-gray-700">Gift Wrap Required</span>
                      </label>
                    </div>
                    <div className="p-3 bg-yellow-50 border-l-4 border-yellow-400">
                      <p className="text-sm text-yellow-700">
                        <span className="font-medium">Note to Delivery Partner:</span> This is a gift order. 
                        Please ensure no sender details are included with the package. 
                        {editingOrder.giftWrap && " Package should be gift-wrapped."}
                      </p>
                    </div>
                  </div>
                </div>
              )}
              
              <div className="mt-6">
                <h3 className="text-lg font-medium text-gray-900 mb-2">Order Items</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subtotal</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {editingOrder.items.map((item, index) => (
                        <tr key={index}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.name}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${item.price.toFixed(2)}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.quantity}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${(item.price * item.quantity).toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              
              <div className="mt-6">
                <h3 className="text-lg font-medium text-gray-900 mb-2">Update Status</h3>
                <div className="flex flex-wrap gap-2">
                  {['Processing', 'Shipped', 'Delivered', 'Cancelled'].map(status => (
                    <button
                      key={status}
                      onClick={() => updateStatus(status)}
                      className={`px-4 py-2 rounded-md ${
                        editingOrder.status === status 
                          ? 'bg-indigo-600 text-white' 
                          : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                      }`}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setEditMode(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveOrder}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                >
                  Save Changes
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Customer Information</h3>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm text-gray-600"><span className="font-medium">Name:</span> {selectedOrder.customer}</p>
                    <p className="text-sm text-gray-600 mt-2"><span className="font-medium">Email:</span> {selectedOrder.email}</p>
                    <p className="text-sm text-gray-600 mt-2"><span className="font-medium">Phone:</span> {selectedOrder.phone}</p>
                    <p className="text-sm text-gray-600 mt-2"><span className="font-medium">Shipping Address:</span> {selectedOrder.address}</p>
                    <p className="text-sm text-gray-600 mt-2"><span className="font-medium">Delivery Instructions:</span> {selectedOrder.deliveryInstructions || 'None'}</p>
                    <p className="text-sm text-gray-600 mt-2"><span className="font-medium">Payment Method:</span> {selectedOrder.payment}</p>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Order Summary</h3>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm text-gray-600"><span className="font-medium">Order Date:</span> {selectedOrder.date}</p>
                    <p className="text-sm text-gray-600 mt-2"><span className="font-medium">Status:</span> 
                      <span className={`ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        selectedOrder.status === 'Processing' ? 'bg-yellow-100 text-yellow-800' :
                        selectedOrder.status === 'Shipped' ? 'bg-blue-100 text-blue-800' :
                        selectedOrder.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {selectedOrder.status}
                      </span>
                    </p>
                    <p className="text-sm text-gray-600 mt-2"><span className="font-medium">Total:</span> ${selectedOrder.total.toFixed(2)}</p>
                    <p className="text-sm text-gray-600 mt-2"><span className="font-medium">Order Type:</span> 
                      <span className={`ml-2 px-2 inline-flex items-center text-xs font-medium rounded-full ${
                        selectedOrder.orderType === 'gift' 
                          ? 'bg-purple-100 text-purple-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {selectedOrder.orderType === 'gift' && <FaGift className="mr-1" />}
                        {selectedOrder.orderType === 'gift' ? 'Gift' : 'Regular'}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
              
              {selectedOrder.orderType === 'gift' && (
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Gift Details</h3>
                  <div className="space-y-2">
                    <p className="text-sm text-gray-600"><span className="font-medium">Gift Message:</span> {selectedOrder.giftMessage}</p>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Gift Wrap:</span> 
                      {selectedOrder.giftWrap ? (
                        <span className="ml-2 text-green-600">Yes</span>
                      ) : (
                        <span className="ml-2 text-gray-500">No</span>
                      )}
                    </p>
                    <div className="mt-3 p-3 bg-yellow-50 border-l-4 border-yellow-400">
                      <p className="text-sm text-yellow-700">
                        <span className="font-medium">Note to Delivery Partner:</span> This is a gift order. 
                        Please ensure no sender details are included with the package. 
                        {selectedOrder.giftWrap && " Package should be gift-wrapped."}
                      </p>
                    </div>
                  </div>
                </div>
              )}
              
              <div className="mt-6">
                <h3 className="text-lg font-medium text-gray-900 mb-2">Order Items</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subtotal</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {selectedOrder.items.map((item, index) => (
                        <tr key={index}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.name}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${item.price.toFixed(2)}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.quantity}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${(item.price * item.quantity).toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              
              <div className="mt-6">
                <h3 className="text-lg font-medium text-gray-900 mb-2">Update Status</h3>
                <div className="flex flex-wrap gap-2">
                  {['Processing', 'Shipped', 'Delivered', 'Cancelled'].map(status => (
                    <button
                      key={status}
                      onClick={() => {
                        // In a real app, this would update the order status in the backend
                        alert(`Order status updated to: ${status}`);
                        const updatedOrders = orders.map(order => 
                          order.id === selectedOrder.id ? {...order, status} : order
                        );
                        setOrders(updatedOrders);
                        setSelectedOrder({...selectedOrder, status});
                      }}
                      className={`px-4 py-2 rounded-md ${
                        selectedOrder.status === status 
                          ? 'bg-indigo-600 text-white' 
                          : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                      }`}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="flex justify-end mt-6">
                <button
                  onClick={() => handleEditOrder(selectedOrder)}
                  className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                >
                  <FaEdit className="mr-2" /> Edit Order Details
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default OrdersManagement;