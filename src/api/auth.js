// src/api/auth.js
import { URL } from './configuration'; // Adjust this import path if needed

export const loginUser = async (credentials) => {
  try {
    const response = await fetch(`${URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Login failed:', errorData);
      throw new Error(errorData.message || 'Login failed. Please check your credentials.');
    }

    return await response.json();
  } catch (error) {
    console.error('Error during login:', error);
    throw error;
  }
};
export const logoutUser = async () => {
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
      throw new Error('No authentication token found.');
    }
  
    try {
      const response = await fetch(`${URL}/logout`, { //  Use your logout endpoint
        method: 'POST', //  or the correct method for your backend
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Accept': 'application/json',
        },
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Logout failed:', errorData);
        throw new Error(errorData.message || 'Logout failed');
      }
      //  No need to return anything, but you could return response.json() if needed.
    } catch (error) {
      console.error('Error during logout:', error);
      throw error;
    }
  };
  