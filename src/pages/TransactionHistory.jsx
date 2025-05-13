import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import withAuth from '../hoc/withAuth';
import { getTransactions } from '../api/transactions';
import { TransactionDetailsModal } from '../components/modals/TransactDetails';

// Helper function (adjust as needed) - using the function from the other component
const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-PH', {
        style: 'currency',
        currency: 'PHP' // Philippine Peso
    }).format(amount);
};

function TransactionHistory() {
  const location = useLocation();
  const [transactions, setTransactions] = useState([]);
  const [filterType, setFilterType] = useState('all');
  const [dateFilter, setDateFilter] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const authToken = localStorage.getItem('authToken');


  useEffect(() => {
      if (!authToken) {
          return;
      }

      const fetchTransactions = async () => {
          setLoading(true);
          setError(null);
          try {
              const data = await getTransactions();
              setTransactions(data.data);
          } catch (err) {
              if (err instanceof Error) {
                  setError(err.message);
              } else {
                  setError("An unexpected error occurred");
              }
          } finally {
              setLoading(false);
          }
      };

      fetchTransactions();
  }, [authToken]);


  useEffect(() => {
      if (location.state?.newTransaction) {
          setTransactions(prev => {
              const exists = prev.some(t => t.id === location.state.newTransaction.id);
              if (!exists) {
                  const newTransactions = [...prev, location.state.newTransaction];
                  return newTransactions;
              }
              return prev;
          });
      }
  }, [location.state]);

  const filteredTransactions = transactions.filter(txn => {
      const matchesType = filterType === 'all' || txn.transaction_type_id === (filterType === 'inbound' ? 1 : 2);
      const matchesDate = !dateFilter || txn.date === dateFilter;
      return matchesType && matchesDate;
  });

  const handleDelete = (id) => {
      const updatedTransactions = transactions.filter(txn => txn.id !== id);
      setTransactions(updatedTransactions);
      setSelectedTransaction(null); // Close modal after deleting
  };

  if (loading) {
      return (
        <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
      );
  }

  if (error) {
      return (
          <div className="flex justify-center items-center h-screen">
              <p className="text-red-500">Error: {error}</p>
          </div>
      );
  }


  return (
      <div className="max-w-full mx-auto px-2 sm:px-4 lg:px-6 py-8 space-y-8">
          <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 border border-gray-100">
              <h1 className="text-2xl font-bold text-gray-800">Transaction History</h1>

              {/* Filter Controls */}
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Transaction Type</label>
                      <select
                          value={filterType}
                          onChange={(e) => setFilterType(e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                      >
                          <option value="all">All Types</option>
                          <option value="inbound">Inbound</option>
                          <option value="outbound">Outbound</option>
                      </select>
                  </div>
                  <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Date</label>
                      <input
                          type="date"
                          value={dateFilter}
                          onChange={(e) => setDateFilter(e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                      />
                  </div>
              </div>

              {/* Transaction List */}
              {filteredTransactions.length > 0 ? (
                  <div className="mt-8 space-y-4">
                      {filteredTransactions.map((txn) => (
                          <div
                              key={txn.id}
                              className="border border-gray-200 rounded-lg p-4 cursor-pointer hover:bg-gray-50 transition-colors"
                              onClick={() => setSelectedTransaction(txn)}
                          >
                              <div className="grid grid-cols-2 gap-4">
                                  <div>
                                      <p className="text-sm text-gray-500">Date</p>
                                      <p className="font-medium">{txn.date}</p>
                                  </div>
                                  <div>
                                      <p className="text-sm text-gray-500">Store</p>
                                      <p className="font-medium">{txn.store?.name}</p>
                                  </div>
                                  <div>
                                      <p className="text-sm text-gray-500">Type</p>
                                      <p className="font-medium capitalize">{txn.transaction_type_id === 1 ? 'Inbound' : 'Outbound'}</p>
                                  </div>
                                  <div>
                                      <p className="text-sm text-gray-500">Amount</p>
                                      <p className="font-medium">{formatCurrency(txn.total_transaction_price)}</p>
                                  </div>
                              </div>
                          </div>
                      ))}
                  </div>
              ) : (
                  <p className="mt-4 text-gray-500">No transactions found matching your filters</p>
              )}
          </div>
          {selectedTransaction && (
              <TransactionDetailsModal
                  transaction={selectedTransaction}
                  onClose={() => setSelectedTransaction(null)}
                  onDelete={handleDelete}
              />
          )}
      </div>
  );
}

export default withAuth(TransactionHistory);


