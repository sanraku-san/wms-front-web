import { URL } from "./configuration";


export const getCategories = async () => {
    const authToken = localStorage.getItem('authToken'); // Get auth token
  
    try {
      const response = await fetch(`${URL}/categories`, { //  Use your get categories endpoint
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${authToken}`, // Include auth token
          'Accept': 'application/json',
        },
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Failed to fetch categories:', errorData);
        throw new Error(errorData.message || 'Failed to fetch categories');
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }
  };