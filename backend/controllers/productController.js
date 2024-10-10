import Product from '../models/productModel.js';
import Category from '../models/categoryModel.js';

// Helper function to check if user is an admin
const isAdmin = (user) => user.role === 'admin' || user.role === 'superadmin';

// Create a new product (only admin)
export const createProduct = async (req, res) => {
  if (!isAdmin(req.user)) {
    return res.status(403).json({ error: 'Access denied' });
  }

  const { name, price, description, stock_quantity, reorder_level, categoryName, image } = req.body; // Include image in destructuring

  try {
    // Check if the category exists by name
    const category = await Category.findOne({ name: categoryName });
    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }

    // Create the new product
    const newProduct = new Product({
      name,
      price,
      description,
      stock_quantity,
      reorder_level,
      category: category._id,
      user: req.user._id, // Admin who added product
      image, // Set the image field
    });

    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create product' });
  }
};

// Get all products (Public)
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find().populate('category user');
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
};

// Get product by ID (Public)
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('category user');
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch product' });
  }
};

// Update a product (only admin)
export const updateProduct = async (req, res) => {
  if (!isAdmin(req.user)) {
    return res.status(403).json({ error: 'Access denied' });
  }

  const { name, price, description, stock_quantity, reorder_level, categoryName, image } = req.body; // Include image in destructuring

  try {
    // Check if the category exists by name
    const category = await Category.findOne({ name: categoryName });
    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }

    // Update the product
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { name, price, description, stock_quantity, reorder_level, category: category._id, image }, // Update image field
      { new: true }
    );

    if (!updatedProduct) return res.status(404).json({ error: 'Product not found' });
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update product' });
  }
};

// Delete a product (only admin)
export const deleteProduct = async (req, res) => {
  if (!isAdmin(req.user)) {
    return res.status(403).json({ error: 'Access denied' });
  }

  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) return res.status(404).json({ error: 'Product not found' });
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete product' });
  }
};
