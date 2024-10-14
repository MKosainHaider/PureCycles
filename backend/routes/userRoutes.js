import express from 'express';
import {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  login,
  register,
  logout,
  getProfile,
  updateProfile
} from '../controllers/userController.js';
import { authenticate, authorizeAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public routes for user registration and login
router.post('/register', register); // Register a new user
router.post('/login', login);       // Login an existing user
router.post('/logout', logout);     // Logout the current user

// Profile routes for authenticated users
router.get('/profile', authenticate, getProfile); // Get the profile of the authenticated user
router.put('/profile', authenticate, updateProfile); // Update the profile of the authenticated user

// Admin route to create a new user
router.post('/users', authenticate, authorizeAdmin, createUser); // Admin can create users

// Admin route to get all users
router.get('/users', authenticate, authorizeAdmin, getUsers); // Admin can get all users

// User-specific routes
router.get('/users/:id', authenticate, getUserById);    // Get user by ID (self or admin)
router.put('/users/:id', authenticate, updateUser);     // Update user details (self or admin)
router.delete('/users/:id', authenticate, deleteUser);  // Delete user (self or admin)

export default router;
