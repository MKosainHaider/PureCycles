import express from 'express';
import { addToCart, getCartItems, removeFromCart } from '../controllers/cartController.js';
import { authenticate } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', authenticate, addToCart);           // Add item to cart
router.get('/', authenticate, getCartItems);        // Get all cart items
router.delete('/:id', authenticate, removeFromCart); // Remove item from cart

export default router;
