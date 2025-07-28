// src/components/OrdersManagement.js
import React, { useState } from 'react';
import { FaSearch, FaEye, FaEdit, FaTrash, FaCheck, FaTimes } from 'react-icons/fa';

const OrdersManagement = () => {
  const [orders] = useState([
    {
      id: 'ORD-001',
      customer: 'John Doe',
      date: '2023-07-15',
      total: 249.99,
      status: 'Processing',
      items: [
        { name: 'Cashmere Sweater', price: 149.99, quantity: 1 },
        { name: 'Wool Scarf', price: 99.99, quantity: 1 }
      ],
      address: '123 Main St, New York, NY 10001',
      payment: 'Credit Card (****1234)'
    },
    {
      id: 'ORD-002',
      customer: 'Jane Smith',
      date: '2023-07-14',
      total: 349.98,
      status: 'Shipped',
      items: [
        { name: 'Cashmere Cardigan', price: 199.99, quantity: 1 },
        { name: 'Cashmere Beanie', price: 49.99, quantity: 2 }
      ],
      address: '456 Park Ave, Boston, MA 02108',
      payment: 'PayPal (jane.smith@example.com)'
    },
    {
      id: 'ORD-003',
      customer: 'Robert Johnson',
      date: '2023-07-12',
      total: 149.99,
      status: 'Delivered',
      items: [
        { name: 'Cashmere Gloves', price: 79.99, quantity: 1 },
        { name: 'Cashmere Socks', price: 34.99, quantity: 2 }
      ],
      address: '789 Broadway, Chicago, IL 60601',
      payment: 'Credit Card (****5678)'
    }
  ]);
  
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         order.customer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredOrders.map(order => (
                <tr key={order.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.customer}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${order.total.toFixed(2)}</td>
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
                    <button
                      onClick={() => setSelectedOrder(order)}
                      className="text-indigo-600 hover:text-indigo-900 mr-3"
                    >
                      <FaEye />
                    </button>
                    <button className="text-yellow-600 hover:text-yellow-900">
                      <FaEdit />
                    </button>
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
              onClick={() => setSelectedOrder(null)}
              className="text-gray-500 hover:text-gray-700"
            >
              <FaTimes />
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Customer Information</h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-600"><span className="font-medium">Name:</span> {selectedOrder.customer}</p>
                <p className="text-sm text-gray-600 mt-2"><span className="font-medium">Shipping Address:</span> {selectedOrder.address}</p>
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
              </div>
            </div>
          </div>
          
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
        </div>
      )}
    </div>
  );
};

export default OrdersManagement;