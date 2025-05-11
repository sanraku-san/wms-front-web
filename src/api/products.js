import { URL } from "./configuration";

export const getProducts = async () => {
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
      throw new Error('No authentication token found.');
    }
  
    try {
      const response = await fetch(`${URL}/products`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Failed to fetch products:', errorData);
        throw new Error(errorData.message || 'Failed to fetch products.');
      }
  
      return await response.json();
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  };

  export const addProducts = async (productData) => {
    const authToken = localStorage.getItem('authToken'); // Get auth token
    try {
      const response = await fetch(`${URL}/products`, { //  Use your create product endpoint
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`, // Include auth token
        },
        body: JSON.stringify(productData),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Add product failed:', errorData);
        throw new Error(errorData.message || 'Failed to add product');
      }
  
      const data = await response.json(); // Parse the JSON response
      return data; // Return the newly created product data
    } catch (error) {
      console.error('Error adding product:', error);
      throw error;
    }
  };

