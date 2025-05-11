import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { getUsers,addAccount } from "../api/accounts";
import withAuth from "../hoc/withAuth";
import AccountModal from "../components/modals/AccountModal";

function Accounts() {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [roleFilter, setRoleFilter] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [currentAccount, setCurrentAccount] = useState({
    id: null,
    username: "",
    firstName: "", // Added firstName
    lastName: "", // Added lastName
    email: "",
    password: "",
    roleId: 1, // Changed from role to roleId, default to 1
    contactNumber: "", // Added contactNumber
  });
  const [isEdit, setIsEdit] = useState(false);

  const roles = ["All", "Admin", "Moderator", "User", "Viewer"];

  useEffect(() => {
    setLoading(true);
    getUsers()
      .then((res) => {
        // Adapt the data received from your API to match the expected structure
        const adaptedAccounts = res.data.map((account) => ({
          id: account.id,
          username: account.username,
          name: `${account.first_name} ${account.last_name}`, // Combine first and last names
          firstName: account.first_name,
          lastName: account.last_name,
          email: account.email,
          role: roles[account.role_id - 1], // Convert role_id to role name.  -1 because roles array is 0-indexed.
          roleId: account.role_id,
          contactNumber: account.contact_number,
          password: '', // Don't show the password
        }));
        setAccounts(adaptedAccounts);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
        setLoading(false);
      });
  }, []);

  const filteredAccounts =
    roleFilter === "All"
      ? accounts
      : accounts.filter((account) => account.role === roleFilter);

  const handleAdd = () => {
    setCurrentAccount({ // include the new fields
      id: null,
      username: "",
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      roleId: 1,
      contactNumber: "",
    });
    setIsEdit(false);
    setShowModal(true);
  };

  const handleEdit = (account) => {
    setCurrentAccount({ // include the new fields
      id: account.id,
      username: account.username,
      firstName: account.firstName,
      lastName: account.lastName,
      email: account.email,
      password: "", // Don't pre-fill password for editing
      roleId: account.roleId,
      contactNumber: account.contactNumber,
    });
    setIsEdit(true);
    setShowModal(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (isEdit) {
      // Update existing account
      setAccounts(
        accounts.map((account) =>
          account.id === currentAccount.id
            ? {
                ...account,
                username: currentAccount.username,
                firstName: currentAccount.firstName,
                lastName: currentAccount.lastName,
                email: currentAccount.email,
                role: roles[currentAccount.roleId - 1], // Convert roleId back to role name
                roleId: currentAccount.roleId,
                contactNumber: currentAccount.contactNumber,
                password: currentAccount.password, // Include if it was updated
              }
            : account
        )
      );
    } else {
      // Add new account
      const newId = accounts.length > 0 ? Math.max(...accounts.map((a) => a.id)) + 1 : 1;
      const newAccount = {
        id: newId,
        username: currentAccount.username,
        firstName: currentAccount.firstName,
        lastName: currentAccount.lastName,
        email: currentAccount.email,
        role: roles[currentAccount.roleId-1], //convert roleId to name
        roleId: currentAccount.roleId,
        contactNumber: currentAccount.contactNumber,
        password: currentAccount.password, // Include the password
      };
      setAccounts([...accounts, newAccount]);
    }
    setShowModal(false);
    // Reset form
    setCurrentAccount({
      id: null,
      username: "",
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      roleId: 1,
      contactNumber: "",
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-gray-50 min-h-screen">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Header with actions */}
        <div className="px-6 py-4 border-b border-gray-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Account Management
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Manage all user accounts and permissions
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
            >
              {roles.map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>
            <button
              onClick={handleAdd}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm font-medium flex items-center justify-center gap-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 01-2 0v-3H6a1 1 0 010-2h3V6a1 1 0 011-1z"
                  clipRule="evenodd"
                />
              </svg>
              Add Account
            </button>
          </div>
        </div>

        {/* Accounts list */}
        <div className="divide-y divide-gray-200">
          {filteredAccounts.length > 0 ? (
            filteredAccounts.map((account) => (
              <div
                key={account.id}
                className="px-6 py-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {account.username}
                    </p>
                    <p className="text-sm text-gray-500 truncate">
                      {account.email}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        account.username === "Admin"
                          ? "bg-purple-100 text-purple-800"
                          : account.username === "Moderator"
                          ? "bg-blue-100 text-blue-800"
                          : account.username === "User"
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {account.username}
                    </span>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(account)}
                        className="p-2 text-indigo-600 hover:text-indigo-900 hover:bg-indigo-50 rounded-lg transition-colors"
                        title="Edit"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => handleDelete(account.id)}
                        className="p-2 text-red-600 hover:text-red-900 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="px-6 py-12 text-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">
                No accounts found
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Create a new account to get started
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Account Modal */}
      <AccountModal
        showModal={showModal}
        setShowModal={setShowModal}
        handleSave={handleSave}
        currentAccount={currentAccount}
        setCurrentAccount={setCurrentAccount}
        isEdit={isEdit}
      />

      <Outlet />
    </div>
  );
}
export default withAuth(Accounts);

