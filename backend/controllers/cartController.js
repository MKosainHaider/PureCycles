import CartItem from '../models/cartModel.js';
import Product from '../models/productModel.js';

// Add item to cart
export const addToCart = async (req, res) => {
  const { productName, quantity } = req.body;

  try {
    const product = await Product.findOne({ name: productName });
    if (!product) return res.status(404).json({ error: 'Product not found' });

    const newCartItem = new CartItem({
      productName,
      quantity,
      user: req.user._id
    });

    await newCartItem.save();
    res.status(201).json(newCartItem);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add item to cart' });
  }
};

// Get all cart items for the logged-in user
export const getCartItems = async (req, res) => {
  try {
    const cartItems = await CartItem.find({ user: req.user._id });
    res.json(cartItems);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch cart items' });
  }
};

// Remove an item from cart
export const removeFromCart = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedItem = await CartItem.findByIdAndDelete(id);
    if (!deletedItem) return res.status(404).json({ error: 'Cart item not found' });
    res.json({ message: 'Cart item removed successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to remove item from cart' });
  }
};
