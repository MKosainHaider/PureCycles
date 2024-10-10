export const getUserIdFromToken = () => {
    const token = localStorage.getItem('token'); // Adjust this if your token is stored elsewhere
    if (!token) return null;
  
    try {
      const payload = JSON.parse(atob(token.split('.')[1])); // Decode the JWT payload
      return payload.id; // Adjust this according to your token's structure
    } catch (error) {
      console.error("Error decoding token:", error);
      return null;
    }
  };
  