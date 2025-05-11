import { URL } from "./configuration";

export const getUsers = async () => {
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
      throw new Error('No authentication token found.');
    }
  
    try {
      const response = await fetch(`${URL}/users`, { 
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Failed to fetch accounts:', errorData);
        throw new Error(errorData.message || 'Failed to fetch accounts.');
      }
  
      return await response.json();
    } catch (error) {
      console.error('Error fetching accounts:', error);
      throw error;
    }
  };
  export const addAccount = async (accountData) => {
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
      throw new Error('No authentication token found.');
    }
  
    try {
      const response = await fetch(`${URL}/users`, { //  Use your create account endpoint
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
        body: JSON.stringify(accountData),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Failed to add account:', errorData);
        throw new Error(errorData.message || 'Failed to add account.');
      }
  
      return await response.json();
    } catch (error) {
      console.error('Error adding account:', error);
      throw error;
    }
  };
  