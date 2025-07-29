// src/components/OtherImagesManagement.js
import React, { useState, useRef } from 'react';
import { FaPlus, FaTrash, FaEdit, FaUpload, FaTimes } from 'react-icons/fa';

const OtherImagesManagement = () => {
  const [sections, setSections] = useState([
    {
      id: 1,
      name: "Homepage Featured",
      images: [
        { id: 101, name: "Banner 1", url: "home-banner1.jpg" },
        { id: 102, name: "Banner 2", url: "home-banner2.jpg" }
      ]
    },
    {
      id: 2,
      name: "Category Banners",
      images: [
        { id: 201, name: "Men's Collection", url: "men-banner.jpg" },
        { id: 202, name: "Women's Collection", url: "women-banner.jpg" }
      ]
    },
    {
      id: 3,
      name: "About Us Page",
      images: [
        { id: 301, name: "Our Story", url: "about-story.jpg" },
        { id: 302, name: "Our Process", url: "about-process.jpg" }
      ]
    }
  ]);
  
  const [newSection, setNewSection] = useState({
    name: '',
    images: []
  });
  
  const [isAddingSection, setIsAddingSection] = useState(false);
  const [isAddingImage, setIsAddingImage] = useState(null);
  const [newImage, setNewImage] = useState({ name: '', file: null, previewUrl: null });
  
  // For editing sections and images
  const [editingSectionId, setEditingSectionId] = useState(null);
  const [editingImage, setEditingImage] = useState({ sectionId: null, imageId: null });
  const [editImageData, setEditImageData] = useState({ name: '', file: null, previewUrl: null });
  
  const fileInputRef = useRef(null);
  const editFileInputRef = useRef(null);

  // Add a new section
  const handleAddSection = (e) => {
    e.preventDefault();
    if (!newSection.name.trim()) return;
    
    const newSectionWithId = { 
      ...newSection, 
      id: Date.now(),
      images: [] 
    };
    
    setSections([...sections, newSectionWithId]);
    setNewSection({ name: '', images: [] });
    setIsAddingSection(false);
  };

  // Start adding an image to a section
  const startAddingImage = (sectionId) => {
    setIsAddingImage(sectionId);
    setNewImage({ name: '', file: null, previewUrl: null });
  };

  // Handle file upload for new images
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setNewImage({ ...newImage, file, previewUrl });
    }
  };

  // Handle file upload for editing existing images
  const handleEditFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setEditImageData({ ...editImageData, file, previewUrl });
    }
  };

  // Add a new image to a section
  const handleAddImage = (e, sectionId) => {
    e.preventDefault();
    
    if (!newImage.name.trim() || !newImage.file) {
      alert('Please provide both an image name and file');
      return;
    }
    
    // In a real app, here you would upload the file to your backend
    // and get back a permanent URL. For now, we'll use the object URL
    const newImageWithId = { 
      id: Date.now(), 
      name: newImage.name, 
      url: newImage.previewUrl 
    };
    
    const updatedSections = sections.map(section => {
      if (section.id === sectionId) {
        return { ...section, images: [...section.images, newImageWithId] };
      }
      return section;
    });
    
    setSections(updatedSections);
    setNewImage({ name: '', file: null, previewUrl: null });
    setIsAddingImage(null);
  };

  // Delete a section
  const deleteSection = (id) => {
    if (window.confirm('Are you sure you want to delete this section and all its images?')) {
      setSections(sections.filter(section => section.id !== id));
    }
  };

  // Delete an image
  const deleteImage = (sectionId, imageId) => {
    if (window.confirm('Are you sure you want to delete this image?')) {
      const updatedSections = sections.map(section => {
        if (section.id === sectionId) {
          return { ...section, images: section.images.filter(img => img.id !== imageId) };
        }
        return section;
      });
      setSections(updatedSections);
    }
  };

  // Start editing a section name
  const startEditingSection = (sectionId, currentName) => {
    setEditingSectionId(sectionId);
    setNewSection({ ...newSection, name: currentName });
  };

  // Save edited section name
  const saveSectionEdit = (e, sectionId) => {
    e.preventDefault();
    
    if (!newSection.name.trim()) {
      alert('Section name cannot be empty');
      return;
    }
    
    const updatedSections = sections.map(section => {
      if (section.id === sectionId) {
        return { ...section, name: newSection.name };
      }
      return section;
    });
    
    setSections(updatedSections);
    setEditingSectionId(null);
    setNewSection({ name: '', images: [] });
  };

  // Start editing an image
  const startEditingImage = (sectionId, imageId, currentName, currentUrl) => {
    setEditingImage({ sectionId, imageId });
    setEditImageData({ name: currentName, file: null, previewUrl: currentUrl });
  };

  // Save edited image
  const saveImageEdit = (e, sectionId, imageId) => {
    e.preventDefault();
    
    if (!editImageData.name.trim()) {
      alert('Image name cannot be empty');
      return;
    }
    
    const updatedSections = sections.map(section => {
      if (section.id === sectionId) {
        return {
          ...section,
          images: section.images.map(img => {
            if (img.id === imageId) {
              // If a new file was uploaded, use its preview URL
              // In a real app, you would upload and get a new URL
              const newUrl = editImageData.file ? editImageData.previewUrl : img.url;
              return { ...img, name: editImageData.name, url: newUrl };
            }
            return img;
          })
        };
      }
      return section;
    });
    
    setSections(updatedSections);
    setEditingImage({ sectionId: null, imageId: null });
    setEditImageData({ name: '', file: null, previewUrl: null });
  };

  // Cancel all operations
  const cancelOperation = () => {
    setIsAddingSection(false);
    setIsAddingImage(null);
    setEditingSectionId(null);
    setEditingImage({ sectionId: null, imageId: null });
    setNewSection({ name: '', images: [] });
    setNewImage({ name: '', file: null, previewUrl: null });
    setEditImageData({ name: '', file: null, previewUrl: null });
  };

  return (
    <div className="space-y-6">
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Manage Other Images</h2>
          <button
            onClick={() => setIsAddingSection(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
          >
            <FaPlus className="mr-2" /> Add Section
          </button>
        </div>
        
        {/* Add New Section Form */}
        {isAddingSection && (
          <div className="bg-gray-50 rounded-lg p-6 mb-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Add New Section</h3>
            <form onSubmit={handleAddSection} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Section Name</label>
                <input
                  type="text"
                  name="name"
                  value={newSection.name}
                  onChange={(e) => setNewSection({...newSection, name: e.target.value})}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  required
                  autoFocus
                />
              </div>
              
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={cancelOperation}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                >
                  Add Section
                </button>
              </div>
            </form>
          </div>
        )}
        
        {/* Sections List */}
        <div className="space-y-8">
          {sections.map(section => (
            <div key={section.id} className="border border-gray-200 rounded-lg p-6">
              <div className="flex justify-between items-center mb-4">
                {/* Section Header - Editable */}
                {editingSectionId === section.id ? (
                  <form onSubmit={(e) => saveSectionEdit(e, section.id)} className="flex items-center">
                    <input
                      type="text"
                      value={newSection.name}
                      onChange={(e) => setNewSection({...newSection, name: e.target.value})}
                      className="mr-2 px-3 py-1 border border-gray-300 rounded-md"
                      required
                      autoFocus
                    />
                    <button 
                      type="submit" 
                      className="text-green-600 hover:text-green-800 mr-2"
                      title="Save"
                    >
                      <FaEdit />
                    </button>
                    <button 
                      onClick={cancelOperation}
                      className="text-gray-600 hover:text-gray-800"
                      title="Cancel"
                    >
                      <FaTimes />
                    </button>
                  </form>
                ) : (
                  <h3 className="text-lg font-medium">{section.name}</h3>
                )}
                
                {/* Section Actions */}
                <div className="flex items-center">
                  <button
                    onClick={() => startAddingImage(section.id)}
                    className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 mr-2"
                  >
                    <FaPlus className="mr-1" /> Add Image
                  </button>
                  
                  {editingSectionId !== section.id && (
                    <button
                      onClick={() => startEditingSection(section.id, section.name)}
                      className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 mr-2"
                    >
                      <FaEdit className="mr-1" /> Edit
                    </button>
                  )}
                  
                  <button
                    onClick={() => deleteSection(section.id)}
                    className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
                  >
                    <FaTrash className="mr-1" /> Delete
                  </button>
                </div>
              </div>
              
              {/* Add Image Form */}
              {isAddingImage === section.id && (
                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <h4 className="text-md font-medium text-gray-900 mb-3">Add Image to {section.name}</h4>
                  <form onSubmit={(e) => handleAddImage(e, section.id)} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Image Name</label>
                      <input
                        type="text"
                        name="name"
                        value={newImage.name}
                        onChange={(e) => setNewImage({...newImage, name: e.target.value})}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                        required
                        autoFocus
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Image</label>
                      <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                        <div className="space-y-1 text-center">
                          {newImage.previewUrl ? (
                            <div className="relative">
                              <img src={newImage.previewUrl} alt="Preview" className="max-h-48 mx-auto" />
                              <button
                                type="button"
                                onClick={() => {
                                  setNewImage({...newImage, file: null, previewUrl: null});
                                  if (fileInputRef.current) fileInputRef.current.value = '';
                                }}
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
                                  <input 
                                    type="file" 
                                    className="sr-only" 
                                    onChange={handleFileUpload} 
                                    accept="image/*"
                                    ref={fileInputRef}
                                  />
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
                        onClick={cancelOperation}
                        className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                      >
                        Add Image
                      </button>
                    </div>
                  </form>
                </div>
              )}
              
              {/* Images Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {section.images.map(image => (
                  <div key={image.id} className="border border-gray-200 rounded-lg overflow-hidden">
                    {/* Image Preview */}
                    <div className="relative bg-gray-200 w-full h-40 flex items-center justify-center">
                      {editingImage.sectionId === section.id && editingImage.imageId === image.id ? (
                        <div className="p-2">
                          <form onSubmit={(e) => saveImageEdit(e, section.id, image.id)}>
                            <div className="mb-2">
                              <input
                                type="text"
                                value={editImageData.name}
                                onChange={(e) => setEditImageData({...editImageData, name: e.target.value})}
                                className="w-full p-1 border rounded"
                                required
                                autoFocus
                              />
                            </div>
                            
                            <div className="flex justify-center mb-2">
                              {editImageData.previewUrl ? (
                                <div className="relative">
                                  <img 
                                    src={editImageData.previewUrl} 
                                    alt="Preview" 
                                    className="max-h-32 mx-auto"
                                  />
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setEditImageData({...editImageData, file: null, previewUrl: image.url});
                                      if (editFileInputRef.current) editFileInputRef.current.value = '';
                                    }}
                                    className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                                  >
                                    <FaTrash size={10} />
                                  </button>
                                </div>
                              ) : (
                                <div className="text-center">
                                  <label className="cursor-pointer text-indigo-600 hover:text-indigo-500 text-sm">
                                    <FaUpload className="mx-auto mb-1" />
                                    <span>Replace</span>
                                    <input 
                                      type="file" 
                                      className="sr-only" 
                                      onChange={handleEditFileUpload}
                                      accept="image/*"
                                      ref={editFileInputRef}
                                    />
                                  </label>
                                </div>
                              )}
                            </div>
                            
                            <div className="flex justify-center space-x-2 mt-2">
                              <button 
                                type="submit"
                                className="text-green-600 hover:text-green-800"
                                title="Save"
                              >
                                <FaEdit />
                              </button>
                              <button 
                                onClick={cancelOperation}
                                className="text-gray-600 hover:text-gray-800"
                                title="Cancel"
                              >
                                <FaTimes />
                              </button>
                            </div>
                          </form>
                        </div>
                      ) : (
                        <>
                          {image.url ? (
                            <img 
                              src={image.url} 
                              alt={image.name} 
                              className="object-contain w-full h-full"
                            />
                          ) : (
                            <span className="text-gray-500">No Image</span>
                          )}
                        </>
                      )}
                    </div>
                    
                    {/* Image Info */}
                    <div className="p-3">
                      <div className="flex justify-between items-center">
                        <h4 className="text-sm font-medium truncate">
                          {editingImage.sectionId === section.id && editingImage.imageId === image.id 
                            ? "Editing..." 
                            : image.name
                          }
                        </h4>
                        
                        {!(editingImage.sectionId === section.id && editingImage.imageId === image.id) && (
                          <div className="flex space-x-2">
                            <button
                              onClick={() => startEditingImage(section.id, image.id, image.name, image.url)}
                              className="text-indigo-600 hover:text-indigo-900"
                            >
                              <FaEdit />
                            </button>
                            <button
                              onClick={() => deleteImage(section.id, image.id)}
                              className="text-red-600 hover:text-red-900"
                            >
                              <FaTrash />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OtherImagesManagement;