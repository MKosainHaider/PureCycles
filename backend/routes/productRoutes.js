import express from 'express';
import { createProduct, getProducts, getProductById, updateProduct, deleteProduct } from '../controllers/productController.js';
import { authenticate } from '../middleware/authMiddleware.js';

const router = express.Router();

// Admin-only routes
router.post('/', authenticate, createProduct);    // Create product
router.put('/:id', authenticate, updateProduct);  // Update product
router.delete('/:id', authenticate, deleteProduct); // Delete product

// Public routes
router.get('/', getProducts);                     // Get all products
router.get('/:id', getProductById);               // Get product by ID

export default router;
