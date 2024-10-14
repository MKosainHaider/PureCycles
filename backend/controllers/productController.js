import Product from '../models/productModel.js';
import Category from '../models/categoryModel.js';

// Create a new product
export const createProduct = async (req, res) => {
  try {
    const { name, description, price, sale, categoryName, subcategoryName, colors, images } = req.body;

    // Validate required fields
    if (!name || !price) {
      return res.status(400).json({ message: 'Name and price are required' });
    }

    let category = null;
    let subcategory = null;

    // If subcategory name is provided, search for it
    if (subcategoryName) {
      if (categoryName) {
        category = await Category.findOne({ name: categoryName });
        if (!category) {
          return res.status(404).json({ message: 'Category not found' });
        }
        subcategory = category.subcategories.find(sub => sub.name.toLowerCase() === subcategoryName.toLowerCase());
      } else {
        category = await Category.findOne({ 'subcategories.name': subcategoryName });
        if (category) {
          subcategory = category.subcategories.find(sub => sub.name.toLowerCase() === subcategoryName.toLowerCase());
        }
      }

      if (!subcategory) {
        return res.status(404).json({ message: 'Subcategory not found' });
      }
    }

    // Check if the product already exists in the given subcategory
    const existingProduct = await Product.findOne({ name, subcategory: subcategory?._id });
    if (existingProduct) {
      return res.status(400).json({ message: 'Product already exists in this subcategory' });
    }

    const product = new Product({
      name,
      description,
      price,
      sale: sale || 0,
      colors: colors || [],
      images: images || [],
      category: category?._id || null,
      categoryName: category?.name || null,
      subcategory: subcategory?._id || null,
      subcategoryName: subcategory?.name || null,
    });

    await product.save();

    res.status(201).json({
      message: 'Product created successfully',
      product: {
        name: product.name,
        description: product.description,
        price: product.price,
        sale: product.sale,
        discountedPrice: product.discountedPrice,
        colors: product.colors,
        images: product.images,
        categoryId: product.category,
        categoryName: product.categoryName,
        subcategoryId: product.subcategory,
        subcategoryName: product.subcategoryName
      }
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all products
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find()
      .populate('category', 'name') // Populate category name only
      .populate('subcategory', 'name'); // Populate subcategory name only
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a product by ID
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate('category', 'name')
      .populate('subcategory', 'name');

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a product by ID
export const updateProduct = async (req, res) => {
  try {
    const { name, description, price, sale, colors, images } = req.body;

    // Validate required fields
    if (!name || !price) {
      return res.status(400).json({ message: 'Name and price are required' });
    }

    const product = await Product.findByIdAndUpdate(req.params.id, {
      name,
      description,
      price,
      sale,
      colors,
      images
    }, { new: true });

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json({
      message: 'Product updated successfully',
      product
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a product by ID
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a product by name
export const deleteProductByName = async (req, res) => {
  try {
    const { name } = req.body; // Expecting name in the request body

    // Validate required fields
    if (!name) {
      return res.status(400).json({ message: 'Product name is required' });
    }

    const product = await Product.findOneAndDelete({ name });

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
