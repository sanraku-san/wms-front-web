import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { getUser } from "../api/auth"; // Import the getUser function
import { FaUser } from "react-icons/fa";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchProfile = useCallback(async () => {
    const token = sessionStorage.getItem("authToken");
    if (!token) {
      navigate("/login");
      return;
    }
    try {
      const userData = await getUser(token);
      setUser(userData.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!user) {
    return <div>Error: Unable to load profile.</div>;
  }

  return (
    <div className="max-w-full mx-auto px-2 sm:px-4 lg:px-6 py-6 space-y-6 bg-gray-50 min-h-screen">
      <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 border border-gray-100">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-800">
              Profile
            </h1>
          </div>
          {/* Avatar Image */}
          <div className="flex-shrink-0 p-2 border border-gray-400 rounded-md">
            {user.profile?.image ? (
              <img
                src={user.profile?.image || "https://via.placeholder.com/150"}
                alt="Profile"
                className="h-20 w-20 sm:h-24 sm:w-24 rounded-md border-2 border-indigo-500"
              />
            ) : (
              <div className="h-20 w-20 sm:h-24 sm:w-24">
              <FaUser className="text-gray-400 text-4xl h-20 w-20 sm:h-24 sm:w-24" /></div>
            )}
          </div>
        </div>
        {/* Profile Details Section */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-lg font-semibold text-indigo-600 mb-2">
              Personal Information
            </h2>
            <div className="space-y-2">
              <p className="text-gray-700">
                <span className="font-medium text-indigo-500">Name:</span>{" "}
                {user.profile?.first_name} {user.profile?.last_name}
              </p>
              <p className="text-gray-700">
                <span className="font-medium text-indigo-500">Username:</span>{" "}
                {user.username}
              </p>
              <p className="text-gray-700">
                <span className="font-medium text-indigo-500">Email:</span>{" "}
                {user.email}
              </p>
              {user.location && (
                <p className="text-gray-700">
                  <span className="font-medium text-indigo-500">Location:</span>{" "}
                  {user.address}
                </p>
              )}
            </div>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-indigo-600 mb-2">
              Account Settings
            </h2>
            <div className="space-y-2">
              <p className="text-gray-700">
                <span className="font-medium text-indigo-500">Role:</span>{" "}
                {user.roles[0]?.name}
              </p>
              <p className="text-gray-700">
                <span className="font-medium text-indigo-500">Contact:</span>{" "}
                {user.profile?.contact_number}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
