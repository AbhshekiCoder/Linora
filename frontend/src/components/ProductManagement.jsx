// src/components/ProductManagement.js
import React, { useState } from 'react';
import { FaPlus, FaTrash, FaUpload, FaEdit, FaSave } from 'react-icons/fa';
import Papa from 'papaparse';

const ProductManagement = () => {
  // State for product form
  const [productForm, setProductForm] = useState({
    name: '',
    description: '',
    price: '',
    images: {
      front: [],
      back: [],
      side: [],
      closeup: []
    },
    colors: [{ name: '', images: [] }],
    sizes: ['S', 'M', 'L', 'XL'],
    category: '',
    subcategory: ''
  });

  // State for categories management
  const [categories, setCategories] = useState({
    Wool: ['Jumper', 'T-shirt', 'Capri', 'Cardigan'],
    Cotton: ['Shirt', 'T-shirt'],
    Denim: ['Jeans', 'Jacket']
  });

  // State for bulk products
  const [bulkProducts, setBulkProducts] = useState([]);
  
  // State for category editing
  const [isEditingCategory, setIsEditingCategory] = useState(false);
  const [newCategory, setNewCategory] = useState('');
  const [newSubcategory, setNewSubcategory] = useState('');
  const [selectedCategoryForSub, setSelectedCategoryForSub] = useState('');
  const [editCategory, setEditCategory] = useState({ name: '', original: '' });
  const [editSubcategory, setEditSubcategory] = useState({ name: '', original: '', category: '' });

  // Handle input changes in product form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductForm({ ...productForm, [name]: value });
  };

  // Handle image uploads
  const handleImageUpload = (e, type) => {
    const files = Array.from(e.target.files);
    const updated = { ...productForm.images };
    updated[type] = [...updated[type], ...files];
    setProductForm({ ...productForm, images: updated });
  };

  // Handle color variations
  const handleColorChange = (e, index) => {
    const { value } = e.target;
    const updatedColors = [...productForm.colors];
    updatedColors[index].name = value;
    setProductForm({ ...productForm, colors: updatedColors });
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
    setProductForm({ ...productForm, colors: updatedColors });
  };

  // Handle image removal
  const removeImage = (index, type) => {
    const updated = { ...productForm.images };
    updated[type].splice(index, 1);
    setProductForm({ ...productForm, images: updated });
  };

  // Handle bulk CSV upload
  const handleBulkUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        const parsed = results.data.map((row, i) => ({
          id: Date.now() + i,
          name: row.name || '',
          price: row.price || '0.00',
          status: 'draft',
          category: row.category || '',
          subcategory: row.subcategory || '',
          description: row.description || '',
          sizes: row.sizes ? row.sizes.split(',').map(s => s.trim()) : []
        }));
        setBulkProducts([...bulkProducts, ...parsed]);
      }
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Product added successfully!');
    setProductForm({
      name: '',
      description: '',
      price: '',
      images: { front: [], back: [], side: [], closeup: [] },
      colors: [{ name: '', images: [] }],
      sizes: ['S', 'M', 'L', 'XL'],
      category: '',
      subcategory: ''
    });
  };

  // Category management functions
  const addCategory = () => {
    if (newCategory && !categories[newCategory]) {
      setCategories({ ...categories, [newCategory]: [] });
      setNewCategory('');
    }
  };

  const deleteCategory = (category) => {
    const updated = { ...categories };
    delete updated[category];
    setCategories(updated);
    
    if (productForm.category === category) {
      setProductForm({ ...productForm, category: '', subcategory: '' });
    }
  };

  const startEditCategory = (category) => {
    setEditCategory({ name: category, original: category });
  };

  const saveEditCategory = () => {
    if (editCategory.name && editCategory.name !== editCategory.original) {
      const updated = { ...categories };
      updated[editCategory.name] = [...updated[editCategory.original]];
      delete updated[editCategory.original];
      setCategories(updated);
      
      if (productForm.category === editCategory.original) {
        setProductForm({ ...productForm, category: editCategory.name });
      }
    }
    setEditCategory({ name: '', original: '' });
  };

  // Subcategory management functions
  const addSubcategory = () => {
    if (selectedCategoryForSub && newSubcategory) {
      const updated = { ...categories };
      if (!updated[selectedCategoryForSub].includes(newSubcategory)) {
        updated[selectedCategoryForSub] = [...updated[selectedCategoryForSub], newSubcategory];
        setCategories(updated);
        setNewSubcategory('');
      }
    }
  };

  const deleteSubcategory = (category, subcategory) => {
    const updated = { ...categories };
    updated[category] = updated[category].filter(sub => sub !== subcategory);
    setCategories(updated);
    
    if (productForm.category === category && productForm.subcategory === subcategory) {
      setProductForm({ ...productForm, subcategory: '' });
    }
  };

  const startEditSubcategory = (category, subcategory) => {
    setEditSubcategory({ name: subcategory, original: subcategory, category });
  };

  const saveEditSubcategory = () => {
    if (editSubcategory.name && editSubcategory.name !== editSubcategory.original) {
      const updated = { ...categories };
      const index = updated[editSubcategory.category].indexOf(editSubcategory.original);
      if (index !== -1) {
        updated[editSubcategory.category][index] = editSubcategory.name;
        setCategories(updated);
        
        if (productForm.category === editSubcategory.category && 
            productForm.subcategory === editSubcategory.original) {
          setProductForm({ ...productForm, subcategory: editSubcategory.name });
        }
      }
    }
    setEditSubcategory({ name: '', original: '', category: '' });
  };

  return (
    <div className="space-y-6">
      {/* Category Management Section */}
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Category Management</h2>
          <button
            onClick={() => setIsEditingCategory(!isEditingCategory)}
            className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
          >
            {isEditingCategory ? 'Done Editing' : 'Edit Categories'}
          </button>
        </div>

        {isEditingCategory ? (
          <div className="space-y-6">
            {/* Add New Category */}
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-medium text-gray-700 mb-3">Add New Category</h3>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  placeholder="Category name"
                  className="flex-1 border border-gray-300 rounded-md p-2"
                />
                <button
                  onClick={addCategory}
                  className="px-3 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                >
                  Add
                </button>
              </div>
            </div>

            {/* Add New Subcategory */}
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-medium text-gray-700 mb-3">Add New Subcategory</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <select
                  value={selectedCategoryForSub}
                  onChange={(e) => setSelectedCategoryForSub(e.target.value)}
                  className="border border-gray-300 rounded-md p-2"
                >
                  <option value="">Select Category</option>
                  {Object.keys(categories).map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
                <input
                  type="text"
                  value={newSubcategory}
                  onChange={(e) => setNewSubcategory(e.target.value)}
                  placeholder="Subcategory name"
                  className="border border-gray-300 rounded-md p-2"
                />
                <button
                  onClick={addSubcategory}
                  disabled={!selectedCategoryForSub || !newSubcategory}
                  className="px-3 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:opacity-50"
                >
                  Add
                </button>
              </div>
            </div>

            {/* Edit Existing Categories */}
            <div className="space-y-4">
              <h3 className="font-medium text-gray-700">Edit Categories & Subcategories</h3>
              {Object.entries(categories).map(([category, subcategories]) => (
                <div key={category} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-3">
                    {editCategory.original === category ? (
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          value={editCategory.name}
                          onChange={(e) => setEditCategory({...editCategory, name: e.target.value})}
                          className="border border-gray-300 rounded-md p-2"
                        />
                        <button
                          onClick={saveEditCategory}
                          className="p-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                        >
                          <FaSave />
                        </button>
                      </div>
                    ) : (
                      <h4 className="font-medium">{category}</h4>
                    )}
                    <div className="flex gap-2">
                      {editCategory.original !== category && (
                        <button
                          onClick={() => startEditCategory(category)}
                          className="p-2 text-indigo-600 hover:text-indigo-900"
                        >
                          <FaEdit />
                        </button>
                      )}
                      <button
                        onClick={() => deleteCategory(category)}
                        className="p-2 text-red-600 hover:text-red-900"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                  
                  <div className="ml-4 space-y-2">
                    {subcategories.map((subcategory, index) => (
                      <div key={index} className="flex justify-between items-center">
                        {editSubcategory.original === subcategory && editSubcategory.category === category ? (
                          <div className="flex items-center gap-2">
                            <input
                              type="text"
                              value={editSubcategory.name}
                              onChange={(e) => setEditSubcategory({...editSubcategory, name: e.target.value})}
                              className="border border-gray-300 rounded-md p-2"
                            />
                            <button
                              onClick={saveEditSubcategory}
                              className="p-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                            >
                              <FaSave />
                            </button>
                          </div>
                        ) : (
                          <span>{subcategory}</span>
                        )}
                        <div className="flex gap-2">
                          {!(editSubcategory.original === subcategory && editSubcategory.category === category) && (
                            <button
                              onClick={() => startEditSubcategory(category, subcategory)}
                              className="p-1 text-indigo-600 hover:text-indigo-900"
                            >
                              <FaEdit />
                            </button>
                          )}
                          <button
                            onClick={() => deleteSubcategory(category, subcategory)}
                            className="p-1 text-red-600 hover:text-red-900"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {Object.entries(categories).map(([category, subcategories]) => (
              <div key={category} className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-medium mb-2">{category}</h3>
                <ul className="ml-4 space-y-1">
                  {subcategories.map((subcategory, index) => (
                    <li key={index} className="text-sm text-gray-600">{subcategory}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Product Form */}
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
                className="mt-1 block w-full border border-gray-300 rounded-md p-2" 
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
                className="mt-1 block w-full border border-gray-300 rounded-md p-2" 
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
              className="mt-1 block w-full border border-gray-300 rounded-md p-2" 
              required 
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Category</label>
              <select 
                value={productForm.category} 
                onChange={(e) => setProductForm({ ...productForm, category: e.target.value, subcategory: '' })} 
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                required
              >
                <option value="">Select Category</option>
                {Object.keys(categories).map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Subcategory</label>
              <select 
                value={productForm.subcategory} 
                onChange={(e) => setProductForm({ ...productForm, subcategory: e.target.value })} 
                disabled={!productForm.category} 
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                required
              >
                <option value="">Select Subcategory</option>
                {productForm.category && categories[productForm.category].map((subcat) => (
                  <option key={subcat} value={subcat}>{subcat}</option>
                ))}
              </select>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Available Sizes</label>
            <div className="flex flex-wrap gap-3">
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
                    className="border-b border-gray-300 p-1 focus:outline-none focus:border-indigo-500 w-full"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => removeColor(colorIndex)}
                    className="text-red-500 hover:text-red-700 ml-2"
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
                        onClick={() => {
                          const updatedColors = [...productForm.colors];
                          updatedColors[colorIndex].images.splice(imgIndex, 1);
                          setProductForm({ ...productForm, colors: updatedColors });
                        }}
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
                      onChange={(e) => {
                        const files = Array.from(e.target.files);
                        const updatedColors = [...productForm.colors];
                        updatedColors[colorIndex].images = [...updatedColors[colorIndex].images, ...files];
                        setProductForm({ ...productForm, colors: updatedColors });
                      }}
                      accept="image/*"
                    />
                  </label>
                </div>
              </div>
            ))}
          </div>
          
          <div className="space-y-4">
            <h3 className="font-medium text-gray-700">Product Images</h3>
            {Object.entries(productForm.images).map(([type, images]) => (
              <div key={type}>
                <label className="block text-sm font-medium text-gray-700 capitalize mb-2">{type} View</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-4">
                  {images.map((img, index) => (
                    <div key={index} className="relative group">
                      <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-32" />
                      <button
                        type="button"
                        onClick={() => removeImage(index, type)}
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <FaTrash size={12} />
                      </button>
                    </div>
                  ))}
                  <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-xl p-4 cursor-pointer hover:border-indigo-500">
                    <FaUpload className="text-gray-400 mb-2" />
                    <span className="text-sm text-gray-600">Upload {type}</span>
                    <input
                      type="file"
                      multiple
                      className="hidden"
                      onChange={(e) => handleImageUpload(e, type)}
                      accept="image/*"
                    />
                  </label>
                </div>
              </div>
            ))}
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

      {/* Bulk Upload Section */}
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Bulk Product Upload</h2>
          <label className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 cursor-pointer">
            <FaUpload className="mr-2" /> Upload CSV
            <input type="file" className="hidden" onChange={handleBulkUpload} accept=".csv" />
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
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subcategory</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {bulkProducts.map((product, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{product.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${product.price}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.category}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.subcategory}</td>
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
            <div className="mb-4">
              <FaUpload className="mx-auto h-12 w-12 text-gray-400" />
            </div>
            <h3 className="mt-2 text-sm font-medium text-gray-900">No products uploaded</h3>
            <p className="mt-1 text-sm text-gray-500">
              Upload a CSV file to add products in bulk. CSV should include columns: 
              name, price, category, subcategory, description, sizes (comma separated)
            </p>
            <div className="mt-6 overflow-x-auto">
              <table className="min-w-full border border-gray-200">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase border-b">name</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase border-b">price</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase border-b">category</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase border-b">subcategory</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase border-b">description</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase border-b">sizes</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="px-4 py-2 text-sm border-b">Cashmere Sweater</td>
                    <td className="px-4 py-2 text-sm border-b">149.99</td>
                    <td className="px-4 py-2 text-sm border-b">Wool</td>
                    <td className="px-4 py-2 text-sm border-b">Jumper</td>
                    <td className="px-4 py-2 text-sm border-b">Premium cashmere sweater</td>
                    <td className="px-4 py-2 text-sm border-b">S,M,L,XL</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductManagement;