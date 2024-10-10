// controllers/categoryController.js
import Category from '../models/categoryModel.js';

// Helper function to check if user is an admin
const isAdmin = (user) => user.role === 'admin' || user.role === 'superadmin';

// Create a new category (Admin only)
export const createCategory = async (req, res) => {
  if (!isAdmin(req.user)) {
    return res.status(403).json({ error: 'Access denied' });
  }

  const { name, description } = req.body;

  try {
    const newCategory = new Category({ name, description });
    await newCategory.save();
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create category' });
  }
};

// Get all categories (Public)
export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
};

// Get a single category by ID (Public)
export const getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) return res.status(404).json({ error: 'Category not found' });
    res.json(category);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch category' });
  }
};

// Update a category (Admin only)
export const updateCategory = async (req, res) => {
  if (!isAdmin(req.user)) {
    return res.status(403).json({ error: 'Access denied' });
  }

  const { name, description } = req.body;

  try {
    const updatedCategory = await Category.findByIdAndUpdate(
      req.params.id,
      { name, description },
      { new: true }
    );
    if (!updatedCategory) return res.status(404).json({ error: 'Category not found' });
    res.json(updatedCategory);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update category' });
  }
};

// Delete a category (Admin only)
export const deleteCategory = async (req, res) => {
  if (!isAdmin(req.user)) {
    return res.status(403).json({ error: 'Access denied' });
  }

  try {
    const deletedCategory = await Category.findByIdAndDelete(req.params.id);
    if (!deletedCategory) return res.status(404).json({ error: 'Category not found' });
    res.json({ message: 'Category deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete category' });
  }
};
