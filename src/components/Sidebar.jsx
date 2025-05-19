import React, { useState } from "react";
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import {
  FaWarehouse,
  FaBoxes,
  FaClipboardList,
  FaUsers,
  FaChartBar,
  FaCog,
  FaSignOutAlt,
  FaBars,
  FaTimes,
  FaHistory,
} from "react-icons/fa";
import { logoutUser } from "../api/auth";

// Layout component with sidebar and outlet for nested routes
function AppLayout({ sidebarOpen, toggleSidebar, setIsLoggedIn }) {
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const removeAuthToken = () => {
    sessionStorage.removeItem("authToken");
  };

  // Function to handle logout
  const handleLogout = async () => {
    setLoading(true);
    try {
      // Call the logout API function
      await logoutUser();
      // Remove the authentication token from localStorage
      removeAuthToken();
      // Update the isLoggedIn state (if you're managing it this way)
      setIsLoggedIn(false);
      // Redirect the user to the login page
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
      // Handle logout error (e.g., display a message to the user)
      alert("Failed to logout. Please try again.");
    }
  };

  // Navigation items
  const navItems = [
    { name: "Dashboard", icon: <FaChartBar />, path: "/dashboard" },
    { name: "Inventory", icon: <FaBoxes />, path: "/inventory" },
    { name: "Store", icon: <FaWarehouse />, path: "/store" },
    { name: "Transactions", icon: <FaClipboardList />, path: "/transactions" },
    {
      name: "Transaction History",
      icon: <FaHistory />,
      path: "/transactionHistory",
    },
    { name: "Admin Panel", icon: <FaUsers />, path: "/adminpanel" },
  ];

  return (
    <div className="flex">
      {/* Sidebar - Fixed position */}
      <div
        className={`${
          sidebarOpen ? "w-72" : "w-20"
        } bg-gradient-to-b from-slate-800 to-slate-900 text-white transition-all duration-300 ease-in-out fixed h-screen z-30 shadow-xl`}
      >
        {/* Logo and toggle */}
        <div className="flex items-center justify-between p-5 border-b border-slate-700/50">
          <div
            className={`flex items-center ${
              !sidebarOpen && "justify-center w-full"
            }`}
          >
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-2 rounded-lg shadow-lg">
              <FaWarehouse className="h-6 w-6 text-white" />
            </div>
            {sidebarOpen && (
              <span className="ml-3 text-xl font-bold bg-gradient-to-r from-white to-gray-300 text-transparent bg-clip-text">
                WMS Pro
              </span>
            )}
          </div>
          {sidebarOpen && (
            <button
              onClick={toggleSidebar}
              className="text-gray-400 hover:text-white bg-slate-700/30 hover:bg-slate-700/50 p-2 rounded-lg transition-all duration-200"
            >
              <FaTimes />
            </button>
          )}
        </div>

        {/* Separate toggle button when sidebar is collapsed */}
        {!sidebarOpen && (
          <div className="flex justify-center mt-4">
            <button
              onClick={toggleSidebar}
              className="bg-indigo-500 hover:bg-indigo-600 text-white p-2 rounded-lg shadow-md transition-all duration-200 flex items-center justify-center"
            >
              <FaBars className="h-5 w-5" />
            </button>
          </div>
        )}

        {/* Navigation */}
        <div className="mt-6 px-3  h-[calc(100vh-180px)]">
          {sidebarOpen && (
            <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-3 mb-3">
              Main Navigation
            </h2>
          )}
          <nav>
            <ul className="space-y-1.5">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <li key={item.name}>
                    <Link
                      to={item.path}
                      className={`flex items-center px-3 py-3 rounded-lg transition-all duration-200 group
                        ${
                          isActive
                            ? "bg-gradient-to-r from-indigo-600 to-indigo-700 text-white shadow-md"
                            : "text-gray-300 hover:bg-slate-700/50 hover:text-white"
                        }`}
                    >
                      <div
                        className={`flex items-center justify-center w-8 h-8 ${
                          isActive ? "text-white" : "text-indigo-400"
                        } group-hover:text-white transition-colors`}
                      >
                        {item.icon}
                      </div>
                      {sidebarOpen && (
                        <span className="ml-3 font-medium">{item.name}</span>
                      )}
                      {sidebarOpen && isActive && (
                        <span className="ml-auto w-2 h-2 rounded-full bg-white"></span>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>

        {/* Logout button - fixed at bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-b from-slate-800/0 to-slate-900">
          <div
            className={`${
              sidebarOpen ? "p-3" : "p-2"
            } bg-slate-700/20 rounded-lg border border-slate-700/30`}
          >
            <button
              className="flex items-center w-full text-gray-300 hover:text-white transition-colors duration-200"
              onClick={handleLogout}
            >
              {sidebarOpen ? (
                <>
                  {loading ? (
                    <span className="flex items-center">
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Logging out...
                    </span>
                  ) : (
                    <div className="flex items-center">
                      <div className="p-2 bg-red-500/10 rounded-lg">
                        <FaSignOutAlt className="text-red-400" />
                      </div>
                      <span className="ml-3 text-sm">Logout</span>
                    </div>
                  )}
                  <div className="ml-auto bg-slate-700/30 p-1 rounded">
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </div>
                </>
              ) : loading ? (
                <span className="flex items-center justify-center w-full">
                  <svg
                    className="animate-spin h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                </span>
              ) : (
                <div className="flex justify-center w-full">
                  <div className="p-1 bg-red-500/10 rounded-lg">
                    <FaSignOutAlt className="text-red-400 h-4 w-4" />
                  </div>
                </div>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Main content - with left margin to accommodate sidebar */}
      <div
        className={`flex-1 ${
          sidebarOpen ? "ml-72" : "ml-20"
        } transition-all duration-300 ease-in-out`}
      >
        <div className="bg-yellow-900 min-h-screen">
          {/* Content goes here */}
        </div>
      </div>
    </div>
  );
}

export default function Sidebar() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Set to true for development

  // Toggle sidebar
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <AppLayout
      sidebarOpen={sidebarOpen}
      toggleSidebar={toggleSidebar}
      setIsLoggedIn={setIsLoggedIn}
    />
  );
}
