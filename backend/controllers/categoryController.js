import Category from '../models/categoryModel.js';

// Create a new category with optional subcategories
export const createCategory = async (req, res) => {
  try {
    const { name, description, subcategories } = req.body; // Destructure subcategories
    const category = new Category({
      name,
      description,
      subcategories: subcategories || [] // Set subcategories if provided
    });
    await category.save();
    res.status(201).json(category);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all categories (accessible to all users)
export const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a category by ID
export const getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) return res.status(404).json({ message: 'Category not found' });
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a category by ID (including subcategories)
export const updateCategoryById = async (req, res) => {
  try {
    const category = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!category) return res.status(404).json({ message: 'Category not found' });
    res.status(200).json(category);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a category by ID
export const deleteCategoryById = async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) return res.status(404).json({ message: 'Category not found' });
    res.status(200).json({ message: 'Category deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add a subcategory to a category
export const addSubcategory = async (req, res) => {
  try {
    const { subcategoryName, description } = req.body; // Assuming subcategory data is passed in the request body
    const category = await Category.findById(req.params.id);
    if (!category) return res.status(404).json({ message: 'Category not found' });

    // Check if the subcategory already exists
    const subcategoryExists = category.subcategories.find(sub => sub.name === subcategoryName);
    if (subcategoryExists) {
      return res.status(400).json({ message: 'Subcategory already exists' });
    }

    // Add subcategory to the array
    category.subcategories.push({ name: subcategoryName, description });
    await category.save();

    res.status(201).json(category);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update a subcategory by name
export const updateSubcategoryByName = async (req, res) => {
  const { categoryName, subcategoryName, newData } = req.body; // newData contains updated subcategory info
  try {
    const category = await Category.findOne({ name: categoryName });
    if (!category) return res.status(404).json({ message: 'Category not found' });

    const subcategory = category.subcategories.id(subcategoryName); // Find the subcategory by name
    if (!subcategory) return res.status(404).json({ message: 'Subcategory not found' });

    Object.assign(subcategory, newData); // Update the subcategory
    await category.save();

    res.status(200).json({ success: true, data: category });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a subcategory by name
export const deleteSubcategoryByName = async (req, res) => {
  const { categoryName, subcategoryName } = req.body;
  try {
    const category = await Category.findOne({ name: categoryName });
    if (!category) return res.status(404).json({ message: 'Category not found' });

    const subcategoryIndex = category.subcategories.findIndex(sub => sub.name === subcategoryName);
    if (subcategoryIndex === -1) return res.status(404).json({ message: 'Subcategory not found' });

    category.subcategories.splice(subcategoryIndex, 1); // Remove the subcategory
    await category.save();

    res.status(200).json({ message: 'Subcategory deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get subcategories of a category
export const getSubcategories = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) return res.status(404).json({ message: 'Category not found' });
    res.status(200).json(category.subcategories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
