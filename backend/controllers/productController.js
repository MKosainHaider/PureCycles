import Product from '../models/productModel.js';
import Category from '../models/categoryModel.js';

export const createProduct = async (req, res) => {
  try {
    const { name, description, price, sale, categoryName, subcategoryName } = req.body;

    let category = null;
    let subcategory = null;

    // If subcategory name is provided, search for it
    if (subcategoryName) {
      if (categoryName) {
        // If both category and subcategory are provided, find the category first
        category = await Category.findOne({ name: categoryName });
        if (!category) {
          return res.status(404).json({ message: 'Category not found' });
        }
        subcategory = category.subcategories.find(sub => sub.name.toLowerCase() === subcategoryName.toLowerCase());
      } else {
        // If only subcategory is provided, find the category that contains the subcategory
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

    // Create a new product with the sale percentage and link to category/subcategory
    const product = new Product({
      name,
      description,
      price,
      sale: sale || 0, // Sale percentage, default to 0 if not provided
      category: category?._id || null, // If category exists, assign its ID, otherwise null
      categoryName: category?.name || null,
      subcategory: subcategory?._id || null, // If subcategory exists, assign its ID, otherwise null
      subcategoryName: subcategory?.name || null,
    });

    await product.save();

    // Return the created product data
    res.status(201).json({
      message: 'Product created successfully',
      product: {
        name: product.name,
        description: product.description,
        price: product.price,
        sale: product.sale,
        discountedPrice: product.sale
          ? (product.price - (product.price * product.sale) / 100).toFixed(2)
          : product.price, // Calculate discounted price if sale exists
        categoryId: product.category,
        categoryName: product.categoryName,
        subcategoryId: product.subcategory,
        subcategoryName: product.subcategoryName,
      }
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
