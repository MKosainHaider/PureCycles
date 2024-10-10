import React from "react";
import styled from "styled-components";

// Styled Components for buttons
const Button = styled.button`
  padding: 8px 16px;
  border-radius: 5px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &.edit {
    background-color: #4f46e5; /* Tailwind indigo */
    color: white;

    &:hover {
      background-color: #4338ca;
    }
  }

  &.delete {
    background-color: #dc2626; /* Tailwind red */
    color: white;
    margin-left: 10px;

    &:hover {
      background-color: #b91c1c;
    }
  }
`;

const ProductList = ({ products, onEdit, onDelete }) => {
  return (
    <div>
      <h2 className="mb-4 text-xl font-bold">Products</h2>
      <table className="min-w-full table-auto">
        <thead>
          <tr>
            <th className="px-4 py-2 border">Name</th>
            <th className="px-4 py-2 border">Price</th>
            <th className="px-4 py-2 border">Category</th>
            <th className="px-4 py-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td className="px-4 py-2 border">{product.name}</td>
              <td className="px-4 py-2 border">${product.price}</td>
              <td className="px-4 py-2 border">{product.category.name}</td>
              <td className="px-4 py-2 border">
                <Button className="edit" onClick={() => onEdit(product)}>
                  Edit
                </Button>
                <Button className="delete" onClick={() => onDelete(product._id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;
