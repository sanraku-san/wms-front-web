import React, { useState, useEffect, useRef } from 'react';
import { Outlet } from 'react-router-dom';
import { FaPlus, FaSearch, FaFilter, FaSortAmountDown, FaSortAmountUp, FaImage, } from 'react-icons/fa';
import { getProducts, addProducts } from '../api/products';
import AddEditProductModal from '../components/modals/addEditProductModal';
import DeleteProductModal from '../components/modals/deleteProductModal';
import ProductDetailsModal from '../components/modals/productDetailsModal';
import withAuth from '../hoc/withAuth';

  function Inventory() {
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
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    useEffect(() => {
      setLoading(true);
      getProducts()
        .then((res) => {
          setProducts(res.data);
          setFilteredProducts(res.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching products:', error);
          setLoading(false);
        });
    }, []);

    useEffect(() => {
      let result = [...products];
    
      // Search filtering
      if (searchTerm) {
        result = result.filter(
          (product) =>
            (product.name && product.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (product.barcode && product.barcode.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (product.description && product.description.toLowerCase().includes(searchTerm.toLowerCase()))
        );
      }
    
      // Category filtering
      if (selectedCategory) {
        result = result.filter((product) => product.category?.name === selectedCategory);
      }
    
      // Sorting
      result.sort((a, b) => {
        let comparison = 0;
        if (sortField === 'name') {
          comparison = (a.name || "").localeCompare(b.name || ""); // ✅ Ensuring name is never undefined
        } else if (sortField === 'price') {
          comparison = (a.price || 0) - (b.price || 0);
        } else if (sortField === 'stock') {
          comparison = (a.stock || 0) - (b.stock || 0);
        }
        return sortDirection === 'asc' ? comparison : -comparison;
      });
    
      setFilteredProducts(result);
    }, [products, searchTerm, selectedCategory, sortField, sortDirection]);
    

    const handleViewDetails = (product) => {
      setSelectedProduct(product);
      setShowDetailsModal(true);
    };

    const handleDeleteProduct = (id) => {
      setProducts(products.filter((product) => product.id !== id));
      setShowDeleteModal(false);
      setProductToDelete(null);
    };

    const handleSaveProduct = async (product) => {
      // Ensure price and stock are numbers before saving
      const formattedProduct = {
        ...product,
        price: typeof product.price === 'number' ? product.price : parseInt(product.price, 10) || 0,
        stock: typeof product.stock === 'number' ? product.stock : parseInt(product.stock, 10) || 0,
      };
    
      if (product.id) {
        setProducts(products.map((p) => (p.id === product.id ? formattedProduct : p)));
      } else {
        try {
          const res = await addProducts(formattedProduct);
          // Adjust to handle the 'data' object in the response
          const newProduct = {
            ...res.data, // Extract product data from res.data
            price: typeof res.data.price === 'number' ? res.data.price : parseInt(res.data.price, 10) || 0,
            stock: typeof res.data.stock === 'number' ? res.data.stock : parseInt(res.data.stock, 10) || 0,
          };
          setProducts([...products, newProduct]);
          alert("Successfully added");
        } catch (error) {
          console.error("Error adding product", error);
          alert("Error adding product");
        }
      }
      setShowAddEditModal(false);
      setCurrentProduct(null);
    };
    

    const formatCurrency = (value) => {
      return new Intl.NumberFormat('en-PH', {
        style: 'currency',
        currency: 'PHP',
        minimumFractionDigits: 2,
      }).format(value);
    };

    return (
      <div className="max-w-full mx-auto px-2 sm:px-4 lg:px-6 py-6 space-y-6 bg-gray-50 min-h-screen">
        {/* Page Header */}
        <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 border border-gray-100">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-800">Inventory Management</h1>
              <p className="text-gray-500 mt-1">Manage your products and stock levels</p>
              </div>
            <button
              onClick={() => {
                setCurrentProduct({
                  name: '',
                  barcode: '',
                  category: '',
                  price: 0,
                  stock: 0,
                  image: '',
                  description: '',
                });
                setShowAddEditModal(true);
              }}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2 shadow-sm"
            >
              <FaPlus /> Add New Product
            </button>
          </div>
        </div>
            {/* Search and Filters */}
<div className="bg-white rounded-xl shadow-md p-4 sm:p-6 border border-gray-100">
  <div className="flex flex-col md:flex-row gap-4">
    <div className="flex-1 relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <FaSearch className="text-gray-400" />
      </div>
      <input
        type="text"
        placeholder="Search products by name, barcode, or description..."
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
        onClick={() => setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')}
        className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2"
      >
        {sortDirection === 'asc' ? <FaSortAmountUp /> : <FaSortAmountDown />}
        Sort
      </button>
    </div>
  </div>

  {showFilters && (
  <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
    {/* Category Filter */}
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">Filter by Category</label>
      <select
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
      >
        <option value="">All Categories</option>
        {products.map(product => product.category?.name)
          .filter((value, index, self) => value && self.indexOf(value) === index)
          .map(categoryName => (
            <option key={categoryName} value={categoryName}>{categoryName}</option>
          ))}
      </select>
    </div>

    {/* Sort Field Selection */}
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

    {/* Stock Level Filter - Optional */}
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">Stock Level</label>
      <select
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
        onChange={(e) => setFilteredProducts(products.filter(p => p.stock >= parseInt(e.target.value)))}
      >
        <option value="">All Stock Levels</option>
        <option value="10">Above 10</option>
        <option value="50">Above 50</option>
        <option value="100">Above 100</option>
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
        ) : products.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64">
            <FaSearch className="text-gray-400 text-4xl mb-4" />
            <h3 className="text-lg font-medium text-gray-900">No products found</h3>
            <p className="text-gray-500 mt-1">Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
  {filteredProducts.map((product) => (
    <div 
      key={product.id} 
      className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
      onClick={() => handleViewDetails(product)}
    >
      {/* Image Section */}
      <div className="h-48 bg-gray-100 flex items-center justify-center">
        {product.image ? (
          <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
        ) : (
          <FaImage className="text-gray-400 text-4xl" />
        )}
      </div>

      {/* Name Section - Always Visible */}
      <div className="p-4">
        <h3 className="font-medium text-gray-800 text-center">{product.name}</h3>
      </div>
    </div>
  ))}
</div>
        )}
      </div>

      {/* Modals */}
      <AddEditProductModal
        isOpen={showAddEditModal}
        onClose={() => setShowAddEditModal(false)}
        onSave={handleSaveProduct}
        currentProduct={currentProduct}
      />

      <DeleteProductModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDeleteProduct}
        product={productToDelete}
      />

      <ProductDetailsModal
        isOpen={showDetailsModal}
        onClose={() => setShowDetailsModal(false)}
        product={selectedProduct}
        formatCurrency={formatCurrency}
      />

      <Outlet />
    </div>
  );
}
export default withAuth(Inventory);
