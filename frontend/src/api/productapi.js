import axios from "axios";

// Function to get Axios config with optional credentials
const getConfig = (includeCredentials = false) => ({
  headers: {
    "Content-Type": "application/json",
  },
  ...(includeCredentials ? { withCredentials: true } : {}),
});

// Create a new product (Admin only)
export const createProduct = async (productData) => {
  try {
    const config = getConfig(true); // Include credentials for admin
    const { data } = await axios.post("/api/products", productData, config);
    console.log("Product created successfully:", data);
    return data;
  } catch (error) {
    console.error("Error creating product:", error.response?.data?.message || error.message);
    throw error.response?.data || error.message;
  }
};

// Fetch all products (Public)
export const getProducts = async () => {
  try {
    const { data } = await axios.get("/api/products");
    return data;
  } catch (error) {
    console.error("Error fetching products:", error.response?.data?.message || error.message);
    throw error.response?.data || error.message;
  }
};

// Fetch a product by ID (Public)
export const getProductById = async (productId) => {
  try {
    const { data } = await axios.get(`/api/products/${productId}`);
    return data;
  } catch (error) {
    console.error("Error fetching product:", error.response?.data?.message || error.message);
    throw error.response?.data || error.message;
  }
};

// Update a product (Admin only)
export const updateProduct = async (productId, productData) => {
  try {
    const config = getConfig(true); // Include credentials for admin
    const { data } = await axios.put(`/api/products/${productId}`, productData, config);
    console.log("Product updated successfully:", data);
    return data;
  } catch (error) {
    console.error("Error updating product:", error.response?.data?.message || error.message);
    throw error.response?.data || error.message;
  }
};

// Delete a product (Admin only)
export const deleteProduct = async (productId) => {
  try {
    const config = getConfig(true); // Include credentials for admin
    const { data } = await axios.delete(`/api/products/${productId}`, config);
    console.log("Product deleted successfully:", data);
    return data;
  } catch (error) {
    console.error("Error deleting product:", error.response?.data?.message || error.message);
    throw error.response?.data || error.message;
  }
};
