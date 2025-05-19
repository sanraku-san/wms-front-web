import { URL } from "./configuration";
//retrieve
export const getUsers = async () => {
    const authToken = sessionStorage.getItem('authToken');
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

//create
  export const addAccount = async (accountData) => {
    const authToken = sessionStorage.getItem('authToken');
    if (!authToken) {
      throw new Error('No authentication token found.');
    }
  
    try {
      const response = await fetch(`${URL}/users`, { 
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

  //delete
  export const deleteUser = async (id) => {
    const authToken = sessionStorage.getItem('authToken');
    const res = await fetch(`${URL}/users/${id}`,{
      method:"DELETE",
      headers:{
        'Authorization': `Bearer ${authToken}`,
        "Content-Type": "application/json",
        Accept:"application/json",
      },
    });
    return res.json();
  }
  