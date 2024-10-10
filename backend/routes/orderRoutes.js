import express from 'express';
import { createOrder, getOrders, getOrderById } from '../controllers/orderController.js';
import { authenticate } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', authenticate, createOrder);         // Create new order
router.get('/', authenticate, getOrders);            // Get all orders
router.get('/:id', authenticate, getOrderById);      // Get order by ID

export default router;
