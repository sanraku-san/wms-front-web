import {URL} from "./configuration";


export const getStores = async () => {
  const authToken = localStorage.getItem('authToken');
  if (!authToken) {
    throw new Error('No authentication token found.');
  }

  try {
    const response = await fetch(`${URL}/stores`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${authToken}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Failed to fetch stores:', errorData);
      throw new Error(errorData.message || 'Failed to fetch stores.');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching stores:', error);
    throw error;
  }
};
export const addStores = async (storeData) => {
  const authToken = localStorage.getItem('authToken'); // Get auth token
  try {
    const response = await fetch(`${URL}/stores`, { //  Use your create store endpoint
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`, // Include auth token
      },
      body: JSON.stringify(storeData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Add store failed:', errorData);
      throw new Error(errorData.message || 'Failed to add store');
    }

    const data = await response.json(); // Parse the JSON response
    return data; // Return the newly created store data
  } catch (error) {
    console.error('Error adding store:', error);
    throw error;
  }
};
export const deleteStore = async (id) => {
  const authToken = localStorage.getItem('authToken');
  const res = await fetch(`${URL}/stores/${id}`,{
    method:"DELETE",
    headers:{
      'Authorization': `Bearer ${authToken}`,
      "Content-Type":"application/json",
      Accept:"application/json",
    },
  });
  return res.json();
}
