import express from 'express';
import { 
  createCategory, 
  getAllCategories, 
  getCategoryById, 
  updateCategory, 
  deleteCategory, 
  addSubcategory, 
  getSubcategories 
} from '../controllers/categoryController.js';

const router = express.Router();

// Route to create a new category
router.post('/create', createCategory);

// Route to get all categories
router.get('/getAll', getAllCategories);

// Route to get a category by ID
router.get('/get/:id', getCategoryById);

// Route to update a category by ID
router.put('/update/:id', updateCategory);

// Route to delete a category by ID
router.delete('/delete/:id', deleteCategory);

// Route to add a subcategory to a category
router.post('/addSubcategory/:id', addSubcategory);

// Route to get all subcategories of a category
router.get('/getSubcategories/:id', getSubcategories);

export default router;
