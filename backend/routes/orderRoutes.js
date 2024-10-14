import express from 'express';
import { authenticate, authorizeAdmin } from '../middleware/authMiddleware.js';
import {
  createOrder,
  getOrders,
  updateOrderStatus,
  deleteOrder,
  updateDeliveryDetails, // Import new function
} from '../controllers/orderController.js';

const router = express.Router();

// Protect routes
router.use(authenticate);

// User routes
router.post('/', createOrder); // Create order
router.get('/', getOrders); // Get user's orders

// Admin routes
router.patch('/status', authorizeAdmin, updateOrderStatus); // Update order status
router.patch('/delivery', authorizeAdmin, updateDeliveryDetails); // Update delivery details
router.delete('/:id', authorizeAdmin, deleteOrder); // Delete order

export default router;
