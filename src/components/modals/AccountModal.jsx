import React, { useState } from 'react';

const AccountModal = ({
  showModal,
  setShowModal,
  handleSave,
  currentAccount,
  setCurrentAccount,
  isEdit,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  
  const roles = ["Admin", "Moderator", "User", "Viewer"];

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
        <form onSubmit={handleSave}>
          <div className="space-y-4 mb-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Username
              </label>
              <input
                type="text"
                value={currentAccount.username}
                onChange={(e) =>
                  setCurrentAccount({
                    ...currentAccount,
                    username: e.target.value,
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                required
                minLength={4}
                maxLength={32}
                pattern="[a-zA-Z0-9_-]+" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                First Name
              </label>
              <input
                type="text"
                value={currentAccount.firstName}
                onChange={(e) =>
                  setCurrentAccount({
                    ...currentAccount,
                    firstName: e.target.value,
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                required
                minLength={2}
                maxLength={32}
                pattern="[a-zA-Z]+"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Last Name
              </label>
              <input
                type="text"
                value={currentAccount.lastName}
                onChange={(e) =>
                  setCurrentAccount({
                    ...currentAccount,
                    lastName: e.target.value,
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                required
                minLength={2}
                maxLength={32}
                pattern="[a-zA-Z]+"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Email
              </label>
              <input
                type="email"
                value={currentAccount.email}
                onChange={(e) =>
                  setCurrentAccount({
                    ...currentAccount,
                    email: e.target.value,
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                required
                minLength={8}
                maxLength={64}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Password
              </label>
              <div className="relative group">
                <input
                  type={showPassword ? "text" : "password"}
                  value={currentAccount.password}
                  onChange={(e) =>
                    setCurrentAccount({
                      ...currentAccount,
                      password: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder={isEdit ? "Leave blank to keep current" : ""}
                  minLength={8}
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </div>
                <div
                  className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-gray-400 hover:text-indigo-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-gray-400 hover:text-indigo-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                      />
                    </svg>
                  )}
                </div>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Role</label>
              <select
                value={currentAccount.roleId}
                onChange={(e) =>
                  setCurrentAccount({
                    ...currentAccount,
                    roleId: e.target.value,
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              >
                {roles
                  .map((role, index) => (
                    <option key={role} value={index + 1}>
                      {role}
                    </option>
                  ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Contact Number
              </label>
              <input
                type="tel"
                value={currentAccount.contactNumber}
                onChange={(e) =>
                  setCurrentAccount({
                    ...currentAccount,
                    contactNumber: e.target.value,
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                required
                pattern="[0-9]{10,12}"
              />
            </div>
          </div>
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={() => setShowModal(false)}
              className="px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
              {isEdit ? "Update" : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AccountModal;

