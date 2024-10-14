import express from 'express';
import { authenticate } from '../middleware/authMiddleware.js';
import {
  getCart,
  addToCart,
  removeFromCart,
} from '../controllers/cartController.js';

const router = express.Router();

// Protect routes
router.use(authenticate);

router.get('/', getCart);
router.post('/add', addToCart);
router.delete('/remove', removeFromCart);

export default router;
