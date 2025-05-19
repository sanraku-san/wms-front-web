import { URL } from "./configuration";

export const getTransactions = async () => {
    const authToken = sessionStorage.getItem('authToken');
    if (!authToken) {
      throw new Error('No authentication token found.');
    }
  
    try {
      const response = await fetch(`${URL}/transactions`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Failed to fetch transactions:', errorData);
        throw new Error(errorData.message || 'Failed to fetch transactions.');
      }
  
      return await response.json();
    } catch (error) {
      console.error('Error fetching transactions:', error);
      throw error;
    }
  };

export const createTransaction = async (transactionData) => {
  const authToken = sessionStorage.getItem('authToken'); // Get auth token
  if (!authToken) {
      throw new Error('Authentication token is required');
  }

  try {
      const response = await fetch(`${URL}/transactions`, { // Replace with your actual API endpoint
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${authToken}`, // Include auth token
          },
          body: JSON.stringify(transactionData),
      });

      if (!response.ok) {
          // Attempt to get error message from response body
          let errorMessage = 'Failed to create transaction';
          try {
              const errorJson = await response.json();
              if (errorJson && errorJson.message) {
                  errorMessage = errorJson.message;
              }
          } catch (parseError) {
              // If parsing JSON fails, keep the default message
              console.error("Error parsing error response:", parseError);
          }
          throw new Error(errorMessage);
      }

      const responseData = await response.json();
      return { success: true, data: responseData.data }; // Adjust based on your actual response structure
  } catch (error) {
      // Log the error for debugging
      console.error("Error creating transaction:", error);
      throw error; // Re-throw the error so the caller can handle it
  }
};