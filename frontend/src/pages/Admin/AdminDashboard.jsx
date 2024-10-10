import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { getProducts, deleteProduct } from "../../api/productapi.js"; // Make sure the path is correct
import ProductForm from "../../components/ProductForm.jsx";
import ProductList from "../../components/ProductList.jsx";

const AdminDashboard = ({ user }) => { // Assuming user is passed as a prop
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null); // Product for editing

  // Fetch products only if user is admin
  useEffect(() => {
    if (user && user.role === "admin") {
      fetchProducts();
    }
  }, [user]);

  const fetchProducts = async () => {
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (error) {
      console.error("Failed to fetch products", error);
    }
  };

  const handleEdit = (product) => {
    setSelectedProduct(product); // Set the selected product for editing
  };

  const handleDelete = async (productId) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await deleteProduct(productId);
        fetchProducts(); // Refresh the product list after deletion
      } catch (error) {
        console.error("Failed to delete product", error);
      }
    }
  };

  const handleFormSubmit = async () => {
    // After product form submission, refresh the list and clear selected product
    await fetchProducts();
    setSelectedProduct(null);
  };

  // If the user is not an admin, display an unauthorized message
  if (!user || user.role !== "admin") {
    return <UnauthorizedMessage>You do not have access to this page.</UnauthorizedMessage>;
  }

  return (
    <Container>
      <h1 className="mb-4 text-2xl font-bold">Admin Dashboard</h1>

      {/* Product Form for creating or updating */}
      <ProductForm onFormSubmit={handleFormSubmit} selectedProduct={selectedProduct} />

      {/* Product List */}
      <ProductList products={products} onEdit={handleEdit} onDelete={handleDelete} />

      <div className="mt-6">
        <Button>Add New Product</Button>
      </div>
    </Container>
  );
};

export default AdminDashboard;

// Styled Components
const Button = styled.button`
  background-color: #4f46e5; /* Custom purple color */
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #4338ca;
  }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

const UnauthorizedMessage = styled.div`
  text-align: center;
  font-size: 18px;
  color: red;
  margin-top: 20px;
`;
