import express from 'express';
import { createProduct } from '../controllers/productController.js';

const router = express.Router();

// Route to create a new product
router.post('/create', createProduct);

export default router;
