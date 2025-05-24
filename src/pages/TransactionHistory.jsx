import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

<<<<<<< Updated upstream
export default function TransactionHistory() {
  const location = useLocation();
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem('transactions');
    return saved ? JSON.parse(saved) : [];
  });
  const [filterType, setFilterType] = useState('all');
  const [dateFilter, setDateFilter] = useState('');

  useEffect(() => {
    if (location.state?.newTransaction) {
      setTransactions(prev => {
        const exists = prev.some(t => t.id === location.state.newTransaction.id);
        if (!exists) {
          const newTransactions = [...prev, location.state.newTransaction];
          localStorage.setItem('transactions', JSON.stringify(newTransactions));
          return newTransactions;
        }
        return prev;
      });
    }
  }, [location.state]);

  const filteredTransactions = transactions.filter(txn => {
    const matchesType = filterType === 'all' || txn.transactionType === filterType;
    const matchesDate = !dateFilter || txn.date === dateFilter;
    return matchesType && matchesDate;
  });

  const handleDelete = (id) => {
    const updatedTransactions = transactions.filter(txn => txn.id !== id);
    setTransactions(updatedTransactions);
    localStorage.setItem('transactions', JSON.stringify(updatedTransactions));
  };

  return (
    <div className="max-w-full mx-auto px-2 sm:px-4 lg:px-6 py-6 space-y-6 bg-gray-50 min-h-screen">
      <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 border border-gray-100">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-800">Transaction History</h1>
        
        {/* Filter Controls */}
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Transaction Type</label>
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
            <label className="block text-sm font-medium text-gray-700 mb-1">Filter by Date</label>
            <input
              type="date"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
        </div>

        {filteredTransactions.length > 0 ? (
          <div className="mt-6 space-y-4">
            {filteredTransactions.map((txn) => (
              <div key={txn.id} className="border border-gray-200 rounded-lg p-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Date</p>
                    <p className="font-medium">{txn.date}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Store</p>
                    <p className="font-medium">{txn.storeName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Type</p>
                    <p className="font-medium capitalize">{txn.transactionType}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Amount</p>
                    <p className="font-medium">₱{txn.totalPrice}</p>
                  </div>
                </div>
                <div className="mt-4 flex justify-end">
                  <button
                    onClick={() => handleDelete(txn.id)}
                    className="px-3 py-1 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="mt-4 text-gray-500">No transactions found matching your filters</p>
        )}
=======

const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-PH', {
        style: 'currency',
        currency: 'PHP' 
    }).format(amount);
};

function TransactionHistory() {

  return (
      <div className="max-w-full mx-auto px-2 sm:px-4 lg:px-6 py-8 space-y-8">
          <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 border border-gray-100">
              <h1 className="text-2xl font-bold text-gray-800">Transaction History</h1>

              {/* Transaction List */}
                  <div className="mt-8 space-y-4">
               
          </div>
      </div>
>>>>>>> Stashed changes
      </div>
    </div>
  );
}
