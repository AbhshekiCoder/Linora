// src/components/QuotesManagement.js
import React, { useState } from 'react';
import { FaPlus, FaTrash, FaEdit } from 'react-icons/fa';

const QuotesManagement = () => {
  const [quotes, setQuotes] = useState([
    {
      id: 1,
      text: "Luxury is in each detail. Discover our premium cashmere collection.",
      author: "Design Team",
      location: "Homepage Hero",
      isActive: true
    },
    {
      id: 2,
      text: "Timeless elegance crafted for the modern individual.",
      author: "Marketing Team",
      location: "About Page",
      isActive: true
    },
    {
      id: 3,
      text: "Sustainable luxury that feels as good as it looks.",
      author: "CEO",
      location: "Product Pages",
      isActive: false
    }
  ]);
  
  const [newQuote, setNewQuote] = useState({
    text: '',
    author: '',
    location: 'Homepage',
    isActive: true
  });
  
  const [isAdding, setIsAdding] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewQuote({ ...newQuote, [name]: value });
  };

  const handleAddQuote = (e) => {
    e.preventDefault();
    const newQuoteWithId = { ...newQuote, id: Date.now() };
    setQuotes([...quotes, newQuoteWithId]);
    setNewQuote({
      text: '',
      author: '',
      location: 'Homepage',
      isActive: true
    });
    setIsAdding(false);
  };

  const deleteQuote = (id) => {
    setQuotes(quotes.filter(quote => quote.id !== id));
  };

  const toggleActive = (id) => {
    setQuotes(quotes.map(quote => 
      quote.id === id ? { ...quote, isActive: !quote.isActive } : quote
    ));
  };

  return (
    <div className="space-y-6">
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Manage Quotes</h2>
          <button
            onClick={() => setIsAdding(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
          >
            <FaPlus className="mr-2" /> Add Quote
          </button>
        </div>
        
        {isAdding && (
          <div className="bg-gray-50 rounded-lg p-6 mb-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Add New Quote</h3>
            <form onSubmit={handleAddQuote} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Quote Text</label>
                <textarea
                  name="text"
                  value={newQuote.text}
                  onChange={handleInputChange}
                  rows={3}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  required
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Author/Credit</label>
                  <input
                    type="text"
                    name="author"
                    value={newQuote.author}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Location</label>
                  <select
                    name="location"
                    value={newQuote.location}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  >
                    <option value="Homepage">Homepage</option>
                    <option value="About Page">About Page</option>
                    <option value="Product Pages">Product Pages</option>
                    <option value="Checkout">Checkout</option>
                    <option value="Blog">Blog</option>
                  </select>
                </div>
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="isActive"
                  checked={newQuote.isActive}
                  onChange={(e) => setNewQuote({...newQuote, isActive: e.target.checked})}
                  className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
                />
                <label className="ml-2 block text-sm text-gray-700">Active</label>
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
                  Add Quote
                </button>
              </div>
            </form>
          </div>
        )}
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quote</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Author</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {quotes.map(quote => (
                <tr key={quote.id}>
                  <td className="px-6 py-4 whitespace-normal max-w-md">
                    <p className="text-sm text-gray-900 italic">"{quote.text}"</p>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{quote.author}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{quote.location}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => toggleActive(quote.id)}
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full cursor-pointer ${
                        quote.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {quote.isActive ? 'Active' : 'Inactive'}
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button className="text-indigo-600 hover:text-indigo-900 mr-3">
                      <FaEdit />
                    </button>
                    <button 
                      onClick={() => deleteQuote(quote.id)}
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

export default QuotesManagement;