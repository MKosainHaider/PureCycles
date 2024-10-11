// src/pages/AdminPanel.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const AdminPanel = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>
      <nav className="mb-4">
        <Link to="/admin/users" className="mr-4">Manage Users</Link>
        <Link to="/admin/products" className="mr-4">Manage Products</Link>
      </nav>
      <hr />
      <h2 className="mt-4 text-xl">Welcome to the Admin Panel</h2>
    </div>
  );
};

export default AdminPanel;
