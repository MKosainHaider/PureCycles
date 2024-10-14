import express from 'express';
import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  deleteProductByName
} from '../controllers/productController.js';
import { authenticate, authorizeAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

// Protecting product routes with authentication and admin authorization
router.post('/create', authenticate, authorizeAdmin, createProduct); // Only admins can create products
router.get('/getAll', getAllProducts); // Anyone can view all products
router.get('/get/:id', getProductById); // Anyone can view a specific product
router.put('/update/:id', authenticate, authorizeAdmin, updateProduct); // Only admins can update products
router.delete('/delete/:id', authenticate, authorizeAdmin, deleteProduct); // Only admins can delete products
router.delete('/deleteByName', authenticate, authorizeAdmin, deleteProductByName); // Only admins can delete products by name

export default router;
