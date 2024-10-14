import Order from '../models/orderModel.js';
import Cart from '../models/cartModel.js';

// Create a new order
export const createOrder = async (req, res) => {
  try {
    const { address, contactNumber, deliveryDate } = req.body; // Get delivery details from request body
    const cart = await Cart.findOne({ user: req.user._id });

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: 'Cart is empty' });
    }

    // Calculate total amount based on cart items
    const totalAmount = cart.items.reduce((total, item) => total + (item.product.price * item.quantity), 0);

    const order = new Order({
      user: req.user._id,
      items: cart.items,
      totalAmount,
      deliveryDetails: { address, contactNumber, deliveryDate }, // Add delivery details
    });

    await order.save();
    await Cart.findOneAndDelete({ user: req.user._id }); // Clear the cart after order

    res.status(201).json({ message: 'Order created successfully', order });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all orders (Admin)
export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('user', 'name email').populate('items.product', 'name');
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a user's orders
export const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).populate('items.product', 'name');
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update order status (Admin)
export const updateOrderStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body; // Get order ID and new status from request body
    const order = await Order.findByIdAndUpdate(orderId, { status }, { new: true });

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json({ message: 'Order status updated successfully', order });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update delivery details (Admin)
export const updateDeliveryDetails = async (req, res) => {
  try {
    const { orderId, address, contactNumber, deliveryDate } = req.body;
    const order = await Order.findByIdAndUpdate(orderId, {
      'deliveryDetails.address': address,
      'deliveryDetails.contactNumber': contactNumber,
      'deliveryDetails.deliveryDate': deliveryDate,
    }, { new: true });

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json({ message: 'Delivery details updated successfully', order });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete an order (Admin)
export const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.status(200).json({ message: 'Order deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
