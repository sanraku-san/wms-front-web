import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { getUsers, addAccount } from "../api/accounts";
import withAuth from "../hoc/withAuth";
import { ToastContainer, toast } from "react-toastify";
import { FaSearch } from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";
import AccountDetailsModal from "../components/modals/AccountDetailsModal";
import AddAccountModal from "../components/modals/addAccountModal";

function AdminPanel() {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState(null);

  useEffect(() => {
    setLoading(true);
    getUsers()
      .then((res) => {
        setAccounts(res.data);
        console.log("Accounts", res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching accounts:", error);
        setLoading(false);
      });
  }, []);

  const handleSave = async (formData) => {
    try {
      const response = await addAccount(formData);
      setAccounts((prev) => [...prev, response]);
      toast.success("Account created successfully!");
    } catch (error) {
      toast.error(error.message || "Failed to create account");
      throw error;
    }
  };

  const handleAccountClick = (account) => {
    setSelectedAccount(account);
    setShowDetailsModal(true);
  };

  return (
    <div className="max-w-full mx-auto px-2 sm:px-4 lg:px-6 py-6 space-y-6 bg-gray-50 min-h-screen">
      {/* Page Header */}
      <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 border border-gray-100">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-800">
              Accounts
            </h1>
            <p className="text-gray-500 mt-1">Manage Accounts</p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2 shadow-sm"
          >
            Create Account
          </button>
        </div>
      </div>
      {/* Account List */}
      <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 border border-gray-100">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
          </div>
        ) : accounts.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64">
            <FaSearch className="text-gray-400 text-4xl mb-4" />
            <h3 className="text-lg font-medium text-gray-900">
              No Accounts found
            </h3>
            <p className="text-gray-500 mt-1">
              Try adjusting your search or filters
            </p>
          </div>
        ) : (
          <div className="grid gap-6 grid-rows-1 sm:grid-rows-2 lg:grid-rows-3">
            {accounts.map((account) => (
              <div
                key={account.id}
                className="border border-gray-200 rounded-lg p-4 cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => handleAccountClick(account)}
              >
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">
                      {account.username}
                    </h3>
                    <p className="text-sm text-gray-500">{account.email}</p>
                  </div>
                  <div className="flex items-center justify-end">
                    <span className="text-sm text-gray-500">
                      {account.role}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <AddAccountModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSave={handleSave}
      />
      <AccountDetailsModal
        isOpen={showDetailsModal}
        onClose={() => setShowDetailsModal(false)}
        account={selectedAccount}
      />
      <ToastContainer />
    </div>
  );
}

export default withAuth(AdminPanel);