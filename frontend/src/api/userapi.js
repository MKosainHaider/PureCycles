import axios from "axios";

// Function to get Axios config with optional credentials
const getConfig = (includeCredentials = false) => ({
  headers: {
    "Content-Type": "application/json",
  },
  ...(includeCredentials ? { withCredentials: true } : {}),
});

// Register a new user
export const registerUser = async (username, email, password) => {
  try {
    const config = getConfig();
    const { data } = await axios.post(
      "/api/users/register",
      { username, email, password },
      config
    );

    console.log("Registration successful:", data);
    return data; // Return success message/data
  } catch (error) {
    console.error("Registration error:", error.response?.data?.message || error.message);
    throw error.response?.data || error.message; // Propagate the error
  }
};


// Login a user
export const loginUser = (email, password) => async () => {
  try {
    const config = getConfig();
    const { data } = await axios.post(
      "/api/users/login",
      { email, password },
      config
    );

    // Save user data to localStorage upon successful login
    localStorage.setItem("user", JSON.stringify(data));

    console.log("Login successful:", data);
    return data;
  } catch (error) {
    console.error("Login error:", error.response?.data?.message || error.message);
    throw error.response?.data || error.message; // Propagate the error
  }
};

// Logout a user
export const logoutUser = () => async () => {
  try {
    const config = getConfig(true); // Include cookies for session management
    const response = await axios.post('/api/users/logout', {}, config);

    if (response.status !== 200) {
      throw new Error('Logout failed');
    }

    // Clear user data from localStorage
    localStorage.removeItem("user");

    console.log("Logout successful:", response.data);
    return response.data;
  } catch (error) {
    console.error('Error during logout:', error.response?.data?.message || error.message);
    throw error.response?.data || error.message; // Propagate the error
  }
};

// Check if the user is logged in
export const isUserLoggedIn = () => {
  return !!localStorage.getItem("user"); // Returns true if user is logged in, false otherwise
};

// Get logged-in user's data
export const getLoggedInUser = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null; // Returns parsed user data or null
};

// Fetch user profile data
export const fetchUserProfile = () => async () => {
  try {
    const config = getConfig(true); // Include credentials to fetch user data
    const { data } = await axios.get('/api/users/profile', config);
    return data; // Return the user profile data
  } catch (error) {
    console.error("Error fetching user profile:", error.response?.data?.message || error.message);
    throw error.response?.data || error.message; // Propagate the error
  }
};

// Update user profile data
export const updateUserProfile = (userData) => async () => {
  try {
    const config = getConfig(true); // Include credentials to update user data
    const { data } = await axios.put('/api/users/profile', userData, config);
    return data; // Return the updated user data
  } catch (error) {
    console.error("Error updating user profile:", error.response?.data?.message || error.message);
    throw error.response?.data || error.message; // Propagate the error
  }
};
