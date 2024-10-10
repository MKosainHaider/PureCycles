import Order from '../models/orderModel.js';
import CartItem from '../models/cartModel.js';

// Create a new order
export const createOrder = async (req, res) => {
  try {
    const cartItems = await CartItem.find({ user: req.user._id });
    if (cartItems.length === 0) return res.status(400).json({ error: 'Cart is empty' });

    let totalAmount = 0;
    const orderItems = [];

    for (const item of cartItems) {
      const product = await Product.findOne({ name: item.productName });
      if (!product) return res.status(404).json({ error: 'Product not found' });

      const itemAmount = product.price * item.quantity;
      totalAmount += itemAmount;

      orderItems.push({
        productName: item.productName,
        quantity: item.quantity
      });
    }

    const newOrder = new Order({
      items: orderItems,
      totalAmount,
      user: req.user._id
    });

    await newOrder.save();

    // Clear the cart after order is placed
    await CartItem.deleteMany({ user: req.user._id });

    res.status(201).json(newOrder);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create order' });
  }
};

// Get all orders for the logged-in user
export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
};

// Get order by ID
export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ error: 'Order not found' });
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch order' });
  }
};
