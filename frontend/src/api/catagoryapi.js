import axios from 'axios';

const API_URL = 'http://localhost:8000/api/categories'; // Update with your API URL

// Create a new category
export const createCategory = async (categoryData) => {
  try {
    const response = await axios.post(API_URL, categoryData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`, // Replace with your token retrieval method
      },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Get all categories
export const getCategories = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Get a category by ID
export const getCategoryById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Update a category
export const updateCategory = async (id, categoryData) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, categoryData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`, // Replace with your token retrieval method
      },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Delete a category
export const deleteCategory = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`, // Replace with your token retrieval method
      },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
