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
    const authToken = sessionStorage.getItem('authToken');
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


  export const getUser = async (authToken) => {
  try {
    const response = await fetch(`${URL}/users`, { //  Use the /me endpoint
      method: 'GET',
      headers: {
        Authorization: `Bearer ${authToken}`,
        'Content-Type': 'application/json', //  Most APIs expect this
      },
    });

    if (!response.ok) {
      //  Handle HTTP errors (e.g., 401 Unauthorized, 500 Server Error)
      let errorMessage = 'Failed to fetch user data';
      try {
        const errorData = await response.json();
        if (errorData && errorData.message) {
          errorMessage = errorData.message; // Use the error message from the backend if available
        }
      } catch (jsonError) {
        // If it fails to parse the json, keep the original message
        console.error("Error parsing error response", jsonError);
      }
      throw new Error(errorMessage);
    }

    const data = await response.json();
    return data; //  Return the successful response data
  } catch (error) {
    //  Catch network errors or errors thrown above
    console.error('Error fetching user data:', error);
    throw error; // Re-throw the error to be handled by the caller
  }
};