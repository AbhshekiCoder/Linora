// src/components/ProductManagement.js
import React, { useState } from 'react';
import { FaPlus, FaTrash, FaUpload } from 'react-icons/fa';

const ProductManagement = () => {
  const [productForm, setProductForm] = useState({
    name: '',
    description: '',
    price: '',
    images: [],
    colors: [{ name: '', images: [] }],
    sizes: ['S', 'M', 'L', 'XL']
  });
  
  const [bulkProducts, setBulkProducts] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductForm({ ...productForm, [name]: value });
  };

  const handleImageUpload = (e, colorIndex = null) => {
    const files = Array.from(e.target.files);
    
    if (colorIndex !== null) {
      const updatedColors = [...productForm.colors];
      updatedColors[colorIndex].images = [...updatedColors[colorIndex].images, ...files];
      
      setProductForm({
        ...productForm,
        colors: updatedColors
      });
    } else {
      setProductForm({
        ...productForm,
        images: [...productForm.images, ...files]
      });
    }
  };

  const handleColorChange = (e, index) => {
    const { value } = e.target;
    const updatedColors = [...productForm.colors];
    updatedColors[index].name = value;
    
    setProductForm({
      ...productForm,
      colors: updatedColors
    });
  };

  const addColor = () => {
    setProductForm({
      ...productForm,
      colors: [...productForm.colors, { name: '', images: [] }]
    });
  };

  const removeColor = (index) => {
    const updatedColors = [...productForm.colors];
    updatedColors.splice(index, 1);
    
    setProductForm({
      ...productForm,
      colors: updatedColors
    });
  };

  const removeImage = (index, colorIndex = null) => {
    if (colorIndex !== null) {
      const updatedColors = [...productForm.colors];
      updatedColors[colorIndex].images.splice(index, 1);
      
      setProductForm({
        ...productForm,
        colors: updatedColors
      });
    } else {
      const updatedImages = [...productForm.images];
      updatedImages.splice(index, 1);
      
      setProductForm({
        ...productForm,
        images: updatedImages
      });
    }
  };

  const handleBulkUpload = (e) => {
    // In a real app, this would process a CSV or JSON file
    // For demo purposes, we'll simulate adding products
    const newProducts = Array(5).fill().map((_, i) => ({
      id: Date.now() + i,
      name: `Product ${i + 1}`,
      price: (Math.random() * 100).toFixed(2),
      status: 'draft'
    }));
    
    setBulkProducts([...bulkProducts, ...newProducts]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit logic would go here
    alert('Product added successfully!');
    // Reset form
    setProductForm({
      name: '',
      description: '',
      price: '',
      images: [],
      colors: [{ name: '', images: [] }],
      sizes: ['S', 'M', 'L', 'XL']
    });
  };

  return (
    <div className="space-y-6">
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Add New Product</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Product Name</label>
              <input
                type="text"
                name="name"
                value={productForm.name}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Price ($)</label>
              <input
                type="number"
                name="price"
                value={productForm.price}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                required
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              name="description"
              value={productForm.description}
              onChange={handleInputChange}
              rows={4}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Product Images</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {productForm.images.map((img, index) => (
                <div key={index} className="relative group">
                  <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-32" />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <FaTrash size={12} />
                  </button>
                </div>
              ))}
              <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-xl p-4 cursor-pointer hover:border-indigo-500">
                <FaUpload className="text-gray-400 mb-2" />
                <span className="text-sm text-gray-600">Upload Image</span>
                <input
                  type="file"
                  multiple
                  className="hidden"
                  onChange={(e) => handleImageUpload(e)}
                  accept="image/*"
                />
              </label>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-medium text-gray-700">Color Variations</h3>
              <button
                type="button"
                onClick={addColor}
                className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
              >
                <FaPlus className="mr-1" size={12} /> Add Color
              </button>
            </div>
            
            {productForm.colors.map((color, colorIndex) => (
              <div key={colorIndex} className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-center mb-4">
                  <input
                    type="text"
                    value={color.name}
                    onChange={(e) => handleColorChange(e, colorIndex)}
                    placeholder="Color name"
                    className="border-b border-gray-300 p-1 focus:outline-none focus:border-indigo-500"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => removeColor(colorIndex)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <FaTrash />
                  </button>
                </div>
                
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {color.images.map((img, imgIndex) => (
                    <div key={imgIndex} className="relative group">
                      <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-32" />
                      <button
                        type="button"
                        onClick={() => removeImage(imgIndex, colorIndex)}
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <FaTrash size={12} />
                      </button>
                    </div>
                  ))}
                  <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-xl p-4 cursor-pointer hover:border-indigo-500">
                    <FaUpload className="text-gray-400 mb-2" />
                    <span className="text-sm text-gray-600">Upload Images</span>
                    <input
                      type="file"
                      multiple
                      className="hidden"
                      onChange={(e) => handleImageUpload(e, colorIndex)}
                      accept="image/*"
                    />
                  </label>
                </div>
              </div>
            ))}
          </div>
          
          <div>
            <h3 className="font-medium text-gray-700 mb-2">Available Sizes</h3>
            <div className="flex flex-wrap gap-2">
              {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map(size => (
                <label key={size} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={productForm.sizes.includes(size)}
                    onChange={(e) => {
                      const updatedSizes = e.target.checked
                        ? [...productForm.sizes, size]
                        : productForm.sizes.filter(s => s !== size);
                      setProductForm({ ...productForm, sizes: updatedSizes });
                    }}
                    className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
                  />
                  <span className="ml-2 text-sm text-gray-700">{size}</span>
                </label>
              ))}
            </div>
          </div>
          
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              Add Product
            </button>
          </div>
        </form>
      </div>
      
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Bulk Product Upload</h2>
          <label className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 cursor-pointer">
            <FaUpload className="mr-2" />
            Upload CSV
            <input
              type="file"
              className="hidden"
              onChange={handleBulkUpload}
              accept=".csv"
            />
          </label>
        </div>
        
        {bulkProducts.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {bulkProducts.map((product, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{product.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${product.price}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                        {product.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-12">
            <FaUpload className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No products uploaded</h3>
            <p className="mt-1 text-sm text-gray-500">Upload a CSV file to add products in bulk.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductManagement;