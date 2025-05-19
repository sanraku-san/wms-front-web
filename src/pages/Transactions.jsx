import React, { useEffect, useState } from 'react'
  import { Outlet } from 'react-router-dom'
  import { useNavigate } from 'react-router-dom'
  import withAuth from '../hoc/withAuth';
  import { getStores } from '../api/stores';
  import { getProducts } from '../api/products';
import { Loader2, Plus, ShoppingCart, Trash2 } from 'lucide-react';
import { createTransaction } from '../api/transactions';
import { ToastContainer ,toast} from 'react-toastify';


  function Transactions() {
    const [transaction, setTransaction] = useState({
        date: '',
        store_id: '', // Changed to store_id
        transaction_type_id: '2', // Changed to transaction_type_id
        total_transaction_price: 0, // Changed to total_transaction_price
      products: [], // Changed to products
  });

  const [stores, setStores] = useState([]); // Adjust type
  const [products, setProducts] = useState([]); // Add stock
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const authToken = sessionStorage.getItem('authToken');

  // --- Fetch Data ---
  useEffect(() => {
      if (!authToken) {
          navigate('/login'); // Redirect if no auth token
          return;
      }

      const fetchData = async () => {
          setLoading(true);
          setError(null);
          try {
              const storesData = await getStores(authToken);
              const productsData = await getProducts(authToken);
              setStores(storesData.data); // Adjust based on your actual response structure
              setProducts(productsData.data); // Adjust
          } catch (err) {
              setError(err.message || 'An error occurred');
          } finally {
              setLoading(false);
          }
      };

      fetchData();
  }, [authToken, navigate]);

  // --- Handle Changes ---
  const handleChange = (e) => {
      const { name, value } = e.target;
      setTransaction(prev => ({ ...prev, [name]: value }));
  };

  const handleProductQuantityChange = (productId, quantity) => {
      setTransaction(prev => {
          const existingProductIndex = prev.products.findIndex(p => p.product_id === productId);

          if (quantity <= 0) {
              // Remove the product if quantity is zero or negative
              const updatedProducts = prev.products.filter(p => p.product_id !== productId);
              return { ...prev, products: updatedProducts };
          }

          if (existingProductIndex > -1) {
              // Update existing product quantity
              const updatedProducts = [...prev.products];
              updatedProducts[existingProductIndex] = { product_id: productId, quantity };
              return { ...prev, products: updatedProducts };
          } else {
              // Add new product
              return { ...prev, products: [...prev.products, { product_id: productId, quantity }] };
          }
      });
  };

  const handleRemoveProduct = (productId) => {
      setTransaction(prev => ({
          ...prev,
          products: prev.products.filter(p => p.product_id !== productId),
      }));
  };

  // --- Calculate Total Price ---
  useEffect(() => {
      let total = 0;
      transaction.products.forEach(item => {
          const product = products.find(p => p.id === item.product_id);
          if (product) {
              total += product.price * item.quantity;
          }
      });
      setTransaction(prev => ({ ...prev, total_transaction_price: total }));
  }, [transaction.products, products]);

  // --- Handle Submit ---
  const handleSubmit = async (e) => {
      e.preventDefault();
      if (!authToken) return;

      setLoading(true);
      setError(null);

      // Validate store_id and transaction_type_id
      if (!transaction.store_id || !transaction.transaction_type_id) {
          setError("Please select a store and transaction type.");
          setLoading(false);
          return;
      }

      try {
          const responseData = await createTransaction(transaction, authToken);
          // Handle success (e.g., show message, redirect)
          console.log('Transaction created:', responseData);
          toast.success("Transaction created successfully!")
          
      } catch (err) {
          setError(err.message || 'An error occurred while creating the transaction.');
          toast.error("Transaction creation failed!")
      } finally {
          setLoading(false);
      }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-PH', {
        style: 'currency',
        currency: 'PHP' // Philippine Peso
    }).format(amount);
};

  return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
          {/* Page Header */}
          <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 border border-gray-100">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                      <h1 className="text-2xl font-bold text-gray-800">New Transaction</h1>
                      <p className="text-gray-500 mt-1">Record inventory movements</p>
                  </div>
              </div>
          </div>

          {/* Transaction Form */}
          <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 border border-gray-100">
              <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Date */}
                      <div className="space-y-2">
                          <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date</label>
                          <input
                              type="date"
                              id="date"
                              name="date"
                              value={transaction.date}
                              onChange={handleChange}
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                              required
                          />
                      </div>

                      {/* Store */}
                      <div className="space-y-2">
                          <label htmlFor="store_id" className="block text-sm font-medium text-gray-700">Store Name</label>
                          <select
                              id="store_id"
                              name="store_id"
                              value={transaction.store_id}
                              onChange={handleChange}
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                              required
                          >
                              <option value="">Select a store</option>
                              {stores.map(store => (
                                  <option key={store.id} value={store.id}>
                                      {store.name}
                                  </option>
                              ))}
                          </select>
                      </div>

                      {/* Transaction Type */}
                      <div className="space-y-2">
                          <label htmlFor="transaction_type_id" className="block text-sm font-medium text-gray-700">Transaction Type</label>
                          <select
                              id="transaction_type_id"
                              name="transaction_type_id"
                              value={transaction.transaction_type_id}
                              onChange={handleChange}
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                          >
                              <option value="1">Inbound</option>
                              <option value="2">Outbound</option>
                          </select>
                      </div>

                      {/* Total Amount (Read-only, calculated) */}
                      <div className="space-y-2">
                          <label htmlFor="total_transaction_price" className="block text-sm font-medium text-gray-700">Total Amount</label>
                          <div className="relative">
                              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">₱</span>
                              <input
                                  type="number"
                                  id="total_transaction_price"
                                  name="total_transaction_price"
                                  value={formatCurrency(transaction.total_transaction_price)}
                                  readOnly
                                  className="w-full pl-10 px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                                  placeholder="0.00"
                                  step="0.01"
                                  min="0"
                              />
                          </div>
                      </div>
                  </div>

                  {/* Products Section */}
                  <div className="space-y-4">
                      <h2 className="text-lg font-semibold text-gray-800">Products</h2>
                      {transaction.products.map((item) => {
                          const product = products.find((p) => p.id === item.product_id);
                          return (
                              <div key={item.product_id} className="flex items-center gap-4">
                                  <div className='flex-1 grid grid-cols-2 gap-4'>
                                      <div className="space-y-2">
                                          <label className="block text-sm font-medium text-gray-700">Product</label>
                                          <select
                                              value={item.product_id}
                                              onChange={(e) =>
                                                  handleProductQuantityChange(e.target.value, item.quantity)
                                              }
                                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                                          >
                                              <option value="">Select a product</option>
                                              {products.map((product) => (
                                                  <option key={product.id} value={product.id}>
                                                      {product.name}
                                                  </option>
                                              ))}
                                          </select>
                                      </div>

                                      <div className="space-y-2">
                                          <label className="block text-sm font-medium text-gray-700">Quantity</label>
                                          <input
                                              type="number"
                                              value={item.quantity}
                                              onChange={(e) =>
                                                  handleProductQuantityChange(item.product_id, parseInt(e.target.value, 10))
                                              }
                                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                                              min="1"
                                          />
                                      </div>
                                  </div>
                                  <button
                                      type="button"
                                      onClick={() => handleRemoveProduct(item.product_id)}
                                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-2 rounded h-9 w-9"

                                  >
                                      <Trash2 className="h-4 w-4" />
                                  </button>
                              </div>
                          );
                      })}
                      <button
                          type="button"
                          onClick={() => {
                              // Add a new product with an empty product_id and quantity of 1
                              setTransaction((prev) => ({
                                  ...prev,
                                  products: [...prev.products, { product_id: '', quantity: 1 }],
                              }));
                          }}
                          className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
                      >
                          <Plus className="mr-2 h-4 w-4" /> Add Product
                      </button>
                  </div>

                  {/* Submit Button */}
                  <div className="mt-8 flex justify-end">
                      <button
                          type="submit"
                          className={
                              "bg-indigo-600 text-white hover:bg-indigo-700 transition-colors font-medium shadow-sm px-6 py-2 rounded-lg" +
                              (loading ? " opacity-70 cursor-not-allowed" : "") // Conditional class
                          }
                          disabled={loading}
                      >
                          {loading ? (
                              <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...</>
                          ) : (
                              <><ShoppingCart className="mr-2 h-4 w-4" /> Save Transaction</>
                          )}
                      </button>
                  </div>
                  {error && <p className="text-red-500 text-sm">{error}</p>}
              </form>
          </div>
           <ToastContainer />
      </div>
  );
}

export default withAuth(Transactions);

