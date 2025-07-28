// src/components/OtherImagesManagement.js
import React, { useState } from 'react';
import { FaPlus, FaTrash, FaEdit } from 'react-icons/fa';

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
  const [newImage, setNewImage] = useState({ name: '', url: null });

  const handleAddSection = (e) => {
    e.preventDefault();
    const newSectionWithId = { ...newSection, id: Date.now() };
    setSections([...sections, newSectionWithId]);
    setNewSection({ name: '', images: [] });
    setIsAddingSection(false);
  };

  const handleAddImage = (e, sectionId) => {
    e.preventDefault();
    const updatedSections = sections.map(section => {
      if (section.id === sectionId) {
        const newImageWithId = { ...newImage, id: Date.now() };
        return { ...section, images: [...section.images, newImageWithId] };
      }
      return section;
    });
    setSections(updatedSections);
    setNewImage({ name: '', url: null });
    setIsAddingImage(null);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewImage({ ...newImage, url: URL.createObjectURL(file) });
    }
  };

  const deleteSection = (id) => {
    setSections(sections.filter(section => section.id !== id));
  };

  const deleteImage = (sectionId, imageId) => {
    const updatedSections = sections.map(section => {
      if (section.id === sectionId) {
        return { ...section, images: section.images.filter(img => img.id !== imageId) };
      }
      return section;
    });
    setSections(updatedSections);
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
                />
              </div>
              
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsAddingSection(false)}
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
        
        <div className="space-y-8">
          {sections.map(section => (
            <div key={section.id} className="border border-gray-200 rounded-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">{section.name}</h3>
                <div>
                  <button
                    onClick={() => setIsAddingImage(section.id)}
                    className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 mr-2"
                  >
                    <FaPlus className="mr-1" /> Add Image
                  </button>
                  <button
                    onClick={() => deleteSection(section.id)}
                    className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
                  >
                    <FaTrash className="mr-1" /> Delete Section
                  </button>
                </div>
              </div>
              
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
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Image</label>
                      <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                        <div className="space-y-1 text-center">
                          {newImage.url ? (
                            <div className="relative">
                              <img src={newImage.url} alt="Preview" className="max-h-48 mx-auto" />
                              <button
                                type="button"
                                onClick={() => setNewImage({...newImage, url: null})}
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
                                  <input type="file" className="sr-only" onChange={handleImageUpload} accept="image/*" />
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
                        onClick={() => setIsAddingImage(null)}
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
              
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {section.images.map(image => (
                  <div key={image.id} className="border border-gray-200 rounded-lg overflow-hidden">
                    <div className="bg-gray-200 border-2 border-dashed w-full h-40" />
                    <div className="p-3">
                      <div className="flex justify-between items-center">
                        <h4 className="text-sm font-medium truncate">{image.name}</h4>
                        <button
                          onClick={() => deleteImage(section.id, image.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <FaTrash />
                        </button>
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