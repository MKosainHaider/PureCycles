import express from 'express';
import { 
  createCategory, 
  getAllCategories, 
  getCategoryById, 
  updateCategoryById, 
  deleteCategoryById, 
  addSubcategory, 
  updateSubcategoryByName, 
  deleteSubcategoryByName,
  getSubcategories 
} from '../controllers/categoryController.js';
import { authenticate, authorizeAdmin, authorizeSuperAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

// Route to create a new category (admin only)
router.post('/create', authenticate, authorizeAdmin, createCategory);

// Route to get all categories (public access)
router.get('/getAll', getAllCategories);

// Route to get a category by ID (public access)
router.get('/get/:id', getCategoryById);

// Route to update a category by ID (admin only)
router.put('/update/:id', authenticate, authorizeAdmin, updateCategoryById);

// Route to delete a category by ID (admin only)
router.delete('/delete/:id', authenticate, authorizeAdmin, deleteCategoryById);

// Route to add a subcategory to a category (admin only)
router.post('/addSubcategory/:id', authenticate, authorizeAdmin, addSubcategory);

// Route to update a subcategory by name (admin only)
router.put('/updateSubcategoryByName', authenticate, authorizeAdmin, updateSubcategoryByName);

// Route to delete a subcategory by name (admin only)
router.delete('/deleteSubcategoryByName', authenticate, authorizeAdmin, deleteSubcategoryByName);

// Route to get all subcategories of a category (public access)
router.get('/getSubcategories/:id', getSubcategories);

export default router;
