import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api/products'; // Use environment variables

// Utility function to get authorization headers
const getAuthHeaders = () => ({
  Authorization: `Bearer ${localStorage.getItem('token')}`, // Ensure token is fetched consistently
});

// Create a new product
export const createProduct = async (productData) => {
  try {
    const response = await axios.post(API_URL, productData, {
      headers: {
        ...getAuthHeaders(), // Get authorization headers
      },
    });
    return response.data;
  } catch (error) {
    handleError(error); // Improved error handling
  }
};

// Get all products
export const getProducts = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

// Get a product by ID
export const getProductById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

// Update a product
export const updateProduct = async (id, productData) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, productData, {
      headers: {
        ...getAuthHeaders(), // Get authorization headers
      },
    });
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

// Delete a product
export const deleteProduct = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`, {
      headers: {
        ...getAuthHeaders(), // Get authorization headers
      },
    });
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

// Centralized error handler
const handleError = (error) => {
  if (error.response && error.response.data) {
    // If there is a response from the server, throw that message
    throw new Error(error.response.data.message || 'Something went wrong');
  } else {
    // If no response, throw a generic error message
    throw new Error('Network error or server did not respond');
  }
};
