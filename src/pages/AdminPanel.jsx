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
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2 shadow-sm"
          >
            Create Account
          </button>
        </div>
      </div>
      {/* Account List */}
      <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 border border-gray-100">
       
    </div>
    </div>
  );
}

export default withAuth(AdminPanel);