import express from 'express';
import { createCategory, getCategories, getCategoryById, updateCategory, deleteCategory } from '../controllers/categoryController.js';
import { authenticate } from '../middleware/authMiddleware.js';

const router = express.Router();

// Admin-only routes
router.post('/', authenticate, createCategory);   // Create category
router.put('/:id', authenticate, updateCategory); // Update category
router.delete('/:id', authenticate, deleteCategory); // Delete category

// Public routes
router.get('/', getCategories);        // Get all categories
router.get('/:id', getCategoryById);  // Get category by ID

export default router;
