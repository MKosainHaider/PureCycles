import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { createProduct, updateProduct } from "../api/productapi.js";

const ProductForm = ({ selectedProduct, onFormSubmit }) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [stockQuantity, setStockQuantity] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    if (selectedProduct) {
      setName(selectedProduct.name);
      setPrice(selectedProduct.price);
      setDescription(selectedProduct.description);
      setCategoryName(selectedProduct.category.name);
      setStockQuantity(selectedProduct.stock_quantity);
      setImage(selectedProduct.image);
    } else {
      clearForm();
    }
  }, [selectedProduct]);

  const clearForm = () => {
    setName("");
    setPrice("");
    setDescription("");
    setCategoryName("");
    setStockQuantity("");
    setImage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const productData = {
      name,
      price,
      description,
      categoryName,
      stock_quantity: stockQuantity,
      image,
    };

    try {
      if (selectedProduct) {
        // Update existing product
        await updateProduct(selectedProduct._id, productData);
      } else {
        // Create new product
        await createProduct(productData);
      }
      onFormSubmit(); // Callback to refresh product list
      clearForm();
    } catch (error) {
      console.error("Error submitting product form", error);
    }
  };

  return (
    <form className="mb-4" onSubmit={handleSubmit}>
      <h2 className="mb-4 text-xl font-semibold">
        {selectedProduct ? "Edit Product" : "Create Product"}
      </h2>
      
      <Input
        type="text"
        placeholder="Product Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <Input
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        required
      />
      <Input
        type="text"
        placeholder="Category"
        value={categoryName}
        onChange={(e) => setCategoryName(e.target.value)}
        required
      />
      <Input
        type="number"
        placeholder="Stock Quantity"
        value={stockQuantity}
        onChange={(e) => setStockQuantity(e.target.value)}
        required
      />
      <Input
        type="text"
        placeholder="Image URL"
        value={image}
        onChange={(e) => setImage(e.target.value)}
        required
      />
      <Textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <Button type="submit">
        {selectedProduct ? "Update Product" : "Create Product"}
      </Button>
    </form>
  );
};

export default ProductForm;


// Styled Components
const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 12px;
  border: 2px solid #e5e7eb; /* Tailwind light gray */
  border-radius: 5px;
  font-size: 16px;

  &:focus {
    outline: none;
    border-color: #6366f1; /* Tailwind indigo */
  }
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 10px;
  margin-bottom: 12px;
  border: 2px solid #e5e7eb;
  border-radius: 5px;
  font-size: 16px;
  min-height: 100px;

  &:focus {
    outline: none;
    border-color: #6366f1;
  }
`;

const Button = styled.button`
  background-color: #4f46e5; /* Tailwind indigo */
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
