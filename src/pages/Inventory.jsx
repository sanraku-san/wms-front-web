import React, { useState, useEffect, useRef } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { FaPlus, FaEdit, FaTrash, FaSearch, FaFilter, FaSortAmountDown, FaSortAmountUp, FaImage, FaUpload } from 'react-icons/fa';

<<<<<<< Updated upstream
export default function Inventory() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortField, setSortField] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [showAddEditModal, setShowAddEditModal] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  
  // Handle image file selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Create a preview URL for the selected image
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
      
      // In a real app, you would upload the file to a server and get a URL back
      // For now, we'll just use the local preview URL
      setCurrentProduct({...currentProduct, image: previewUrl});
    }
  };

  // Reset image preview when modal closes
  useEffect(() => {
    if (!showAddEditModal) {
      setImagePreview(null);
    } else if (currentProduct?.image && !imagePreview) {
      setImagePreview(currentProduct.image);
    }
  }, [showAddEditModal, currentProduct]);

  // Clean up object URLs to avoid memory leaks
  useEffect(() => {
    return () => {
      if (imagePreview && imagePreview.startsWith('blob:')) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);
  
  const handleViewDetails = (product) => {
    setSelectedProduct(product);
    setShowDetailsModal(true);
  };

  // Sample categories
  const categories = ['Electronics', 'Furniture', 'Office Supplies', 'Clothing', 'Other'];

  // Sample product data - in a real app, this would come from an API
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const sampleProducts = [
        { id: 1, name: 'Wireless Headphones', sku: 'SKU-1234', category: 'Electronics', price: 89.99, stock: 145, image: 'https://via.placeholder.com/150', description: 'High-quality wireless headphones with noise cancellation' },
        { id: 2, name: 'Ergonomic Chair', sku: 'SKU-5678', category: 'Furniture', price: 249.99, stock: 78, image: 'https://via.placeholder.com/150', description: 'Comfortable ergonomic office chair with lumbar support' },
        { id: 3, name: 'Laptop Stand', sku: 'SKU-9012', category: 'Office Supplies', price: 39.99, stock: 124, image: 'https://via.placeholder.com/150', description: 'Adjustable laptop stand for better posture' },
        { id: 4, name: 'USB-C Hub', sku: 'SKU-3456', category: 'Electronics', price: 59.99, stock: 89, image: 'https://via.placeholder.com/150', description: '7-in-1 USB-C hub with HDMI, USB-A, and SD card reader' },
        { id: 5, name: 'Desk Lamp', sku: 'SKU-7890', category: 'Office Supplies', price: 34.99, stock: 56, image: 'https://via.placeholder.com/150', description: 'LED desk lamp with adjustable brightness and color temperature' },
        { id: 6, name: 'Wireless Mouse', sku: 'SKU-2345', category: 'Electronics', price: 29.99, stock: 210, image: 'https://via.placeholder.com/150', description: 'Ergonomic wireless mouse with long battery life' },
        { id: 7, name: 'Notebook Set', sku: 'SKU-6789', category: 'Office Supplies', price: 19.99, stock: 320, image: 'https://via.placeholder.com/150', description: 'Set of 3 premium notebooks with different page styles' },
        { id: 8, name: 'Standing Desk', sku: 'SKU-0123', category: 'Furniture', price: 399.99, stock: 42, image: 'https://via.placeholder.com/150', description: 'Electric standing desk with memory settings' },
      ];
      setProducts(sampleProducts);
      setFilteredProducts(sampleProducts);
      setLoading(false);
    }, 1000);
  }, []);

  // Filter and sort products
  useEffect(() => {
    let result = [...products];
    
    // Apply search filter
    if (searchTerm) {
      result = result.filter(product => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply category filter
    if (selectedCategory) {
      result = result.filter(product => product.category === selectedCategory);
    }
    
    // Apply sorting
    result.sort((a, b) => {
      let comparison = 0;
      if (sortField === 'name') {
        comparison = a.name.localeCompare(b.name);
      } else if (sortField === 'price') {
        comparison = a.price - b.price;
      } else if (sortField === 'stock') {
        comparison = a.stock - b.stock;
      }
      
      return sortDirection === 'asc' ? comparison : -comparison;
    });
    
    setFilteredProducts(result);
  }, [products, searchTerm, selectedCategory, sortField, sortDirection]);

  // Handle product deletion
  const handleDelete = (id) => {
    setProducts(products.filter(product => product.id !== id));
    setShowDeleteModal(false);
    setProductToDelete(null);
  };

  // Handle add/edit product
  const handleSaveProduct = (product) => {
    if (product.id) {
      // Edit existing product
      setProducts(products.map(p => p.id === product.id ? product : p));
    } else {
      // Add new product
      const newProduct = {
        ...product,
        id: Math.max(...products.map(p => p.id), 0) + 1
      };
      setProducts([...products, newProduct]);
    }
    setShowAddEditModal(false);
    setCurrentProduct(null);
  };

  // Format currency
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-PH', {
      style: 'currency',
      currency: 'PHP',
      minimumFractionDigits: 2
    }).format(value);
  };
=======
function Inventory() {
>>>>>>> Stashed changes

  return (
    <div className="max-w-full mx-auto px-2 sm:px-4 lg:px-6 py-6 space-y-6 bg-gray-50 min-h-screen">
      {/* Page Header */}
      <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 border border-gray-100">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-800">Inventory Management</h1>
            <p className="text-gray-500 mt-1">Manage your products and stock levels</p>
          </div>
<<<<<<< Updated upstream
          <button 
            onClick={() => {
              setCurrentProduct({
                name: '',
                sku: '',
                category: '',
                price: 0,
                stock: 0,
                image: '',
                description: ''
              });
              setShowAddEditModal(true);
            }}
=======
          <button
>>>>>>> Stashed changes
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2 shadow-sm"
          >
            <FaPlus /> Add New Product
          </button>
        </div>
      </div>

<<<<<<< Updated upstream
      {/* Search and Filters */}
      <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 border border-gray-100">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search products by name, SKU, or description..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2"
            >
              <FaFilter /> Filters
            </button>
            <button
              onClick={() => {
                setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
              }}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2"
            >
              {sortDirection === 'asc' ? <FaSortAmountUp /> : <FaSortAmountDown />}
              Sort
            </button>
          </div>
        </div>
        
        {showFilters && (
          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Sort By</label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                value={sortField}
                onChange={(e) => setSortField(e.target.value)}
              >
                <option value="name">Name</option>
                <option value="price">Price</option>
                <option value="stock">Stock</option>
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Product Grid */}
      <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 border border-gray-100">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64">
            <FaSearch className="text-gray-400 text-4xl mb-4" />
            <h3 className="text-lg font-medium text-gray-900">No products found</h3>
            <p className="text-gray-500 mt-1">Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map(product => (
              <div 
                key={product.id} 
                className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => handleViewDetails(product)}
              >
                <div className="h-48 bg-gray-100 relative">
                  {product.image ? (
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <FaImage className="text-gray-400 text-4xl" />
                    </div>
                  )}
                  <div 
                    className="absolute top-2 right-2 flex gap-1"
                    onClick={(e) => e.stopPropagation()} // Prevent triggering the card click
                  >
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setCurrentProduct(product);
                        setShowAddEditModal(true);
                      }}
                      className="p-2 bg-white rounded-full shadow-sm hover:bg-gray-100 text-indigo-600"
                    >
                      <FaEdit />
                    </button>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setProductToDelete(product);
                        setShowDeleteModal(true);
                      }}
                      className="p-2 bg-white rounded-full shadow-sm hover:bg-gray-100 text-red-600"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-start">
                    <h3 className="font-medium text-gray-800">{product.name}</h3>
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                      {product.category}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">{product.sku}</p>
                  <div className="mt-2 flex justify-between items-center">
                    <p className="font-bold text-indigo-600">{formatCurrency(product.price)}</p>
                    <p className={`text-sm ${
                      product.stock > 100 ? 'text-green-600' : 
                      product.stock > 20 ? 'text-amber-600' : 
                      'text-red-600'
                    }`}>
                      {product.stock} in stock
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && productToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Confirm Deletion</h3>
            <p className="text-gray-500 mb-4">
              Are you sure you want to delete <span className="font-medium">{productToDelete.name}</span>? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(productToDelete.id)}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add/Edit Product Modal */}
      {showAddEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              {currentProduct.id ? 'Edit Product' : 'Add New Product'}
            </h3>
            <form onSubmit={(e) => {
              e.preventDefault();
              handleSaveProduct(currentProduct);
            }}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
                  <input
                    type="text"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                    value={currentProduct.name}
                    onChange={(e) => setCurrentProduct({...currentProduct, name: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">SKU</label>
                  <input
                    type="text"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                    value={currentProduct.sku}
                    onChange={(e) => setCurrentProduct({...currentProduct, sku: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <select
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                    value={currentProduct.category}
                    onChange={(e) => setCurrentProduct({...currentProduct, category: e.target.value})}
                  >
                    <option value="">Select a category</option>
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                  <input
                    type="number"
                    required
                    min="0"
                    step="0.01"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                    value={currentProduct.price}
                    onChange={(e) => setCurrentProduct({...currentProduct, price: parseFloat(e.target.value)})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Stock Quantity</label>
                  <input
                    type="number"
                    required
                    min="0"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                    value={currentProduct.stock}
                    onChange={(e) => setCurrentProduct({...currentProduct, stock: parseInt(e.target.value)})}
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Product Image</label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="md:col-span-1 flex justify-center">
                      <div className="h-40 w-40 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-gray-50 overflow-hidden">
                        {imagePreview ? (
                          <img 
                            src={imagePreview} 
                            alt="Product preview" 
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <FaImage className="text-gray-400 text-4xl" />
                        )}
                      </div>
                    </div>
                    <div className="md:col-span-2 flex flex-col justify-center">
                      <input
                        type="file"
                        accept="image/*"
                        ref={fileInputRef}
                        onChange={handleImageChange}
                        className="hidden"
                      />
                      <button
                        type="button"
                        onClick={() => fileInputRef.current.click()}
                        className="px-4 py-2 bg-indigo-100 text-indigo-700 rounded-lg hover:bg-indigo-200 transition-colors flex items-center justify-center gap-2 mb-2"
                      >
                        <FaUpload /> Choose Image File
                      </button>
                      <p className="text-xs text-gray-500">
                        Supported formats: JPG, PNG, GIF. Max size: 5MB
                      </p>
                      {imagePreview && (
                        <button
                          type="button"
                          onClick={() => {
                            setImagePreview(null);
                            setCurrentProduct({...currentProduct, image: ''});
                            if (fileInputRef.current) {
                              fileInputRef.current.value = '';
                            }
                          }}
                          className="px-4 py-2 mt-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors flex items-center justify-center gap-2"
                        >
                          <FaTrash /> Remove Image
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                  rows="3"
                  value={currentProduct.description}
                  onChange={(e) => setCurrentProduct({...currentProduct, description: e.target.value})}
                ></textarea>
              </div>
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowAddEditModal(false)}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  {currentProduct.id ? 'Update Product' : 'Add Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Product Details Modal */}
      {showDetailsModal && selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-lg max-w-3xl w-full p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-medium text-gray-900">Product Details</h3>
              <button
                onClick={() => setShowDetailsModal(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-100 rounded-lg overflow-hidden h-64 flex items-center justify-center">
                {selectedProduct.image ? (
                  <img 
                    src={selectedProduct.image} 
                    alt={selectedProduct.name} 
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <FaImage className="text-gray-400 text-6xl" />
                )}
              </div>
              
              <div className="space-y-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">{selectedProduct.name}</h2>
                  <div className="flex items-center mt-1">
                    <span className="bg-indigo-100 text-indigo-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                      {selectedProduct.category}
                    </span>
                    <span className="ml-2 text-sm text-gray-500">SKU: {selectedProduct.sku}</span>
                  </div>
                </div>
                
                <div>
                  <p className="text-3xl font-bold text-indigo-600">{formatCurrency(selectedProduct.price)}</p>
                  <p className={`text-sm mt-1 ${
                    selectedProduct.stock > 100 ? 'text-green-600' : 
                    selectedProduct.stock > 20 ? 'text-amber-600' : 
                    'text-red-600'
                  }`}>
                    {selectedProduct.stock} units in stock
                  </p>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-700">Description</h3>
                  <p className="mt-1 text-gray-600">{selectedProduct.description}</p>
                </div>
              </div>
            </div>
            
            <div className="border-t border-gray-200 mt-6 pt-4">
              <h3 className="text-sm font-medium text-gray-700 mb-2">Product Information</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-xs text-gray-500">Product ID</p>
                  <p className="font-medium">{selectedProduct.id}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-xs text-gray-500">Category</p>
                  <p className="font-medium">{selectedProduct.category}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-xs text-gray-500">SKU</p>
                  <p className="font-medium">{selectedProduct.sku}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-xs text-gray-500">Stock Level</p>
                  <p className="font-medium">{selectedProduct.stock} units</p>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => {
                  setShowDetailsModal(false);
                  setCurrentProduct(selectedProduct);
                  setShowAddEditModal(true);
                }}
                className="px-4 py-2 bg-indigo-100 text-indigo-700 rounded-lg hover:bg-indigo-200 transition-colors flex items-center gap-2"
              >
                <FaEdit /> Edit Product
              </button>
              <button
                onClick={() => {
                  setShowDetailsModal(false);
                  setProductToDelete(selectedProduct);
                  setShowDeleteModal(true);
                }}
                className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors flex items-center gap-2"
              >
                <FaTrash /> Delete Product
              </button>
            </div>
          </div>
        </div>
      )}
=======


      {/* Product Grid */}
      <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 border border-gray-100">
        
      </div>

>>>>>>> Stashed changes

      <Outlet />
    </div>
  );
}
