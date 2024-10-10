import User from '../models/userModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Register a new user (Public registration)

export const register = async (req, res) => {
  try {
    const { email, password, username } = req.body;

    // Check if email already exists
    const isEmailExisted = await User.findOne({ email });
    if (isEmailExisted) {
      console.log('Registration attempt failed: Email already exists');
      return res.status(400).json({ message: 'Email already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });

    // Save the user to the database
    await newUser.save();

    // Log the registered user to the console
    console.log('User registered successfully:', newUser);

    // Respond to the client
    res.status(201).json({ message: 'User registered successfully', user: newUser });
  } catch (error) {
    console.error('Failed to register user:', error);
    res.status(500).json({ error: 'Failed to register user' });
  }
};


// Login a user
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: 'Invalid email or password' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid email or password' });

    const token = jwt.sign({ _id: user._id, role: user.role }, process.env.PRIVATE_KEY, { expiresIn: '1d' });
    res.cookie('token', token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 }); // 1 day expiration
    return res.json({ message: 'Login successful', user });
  } catch (error) {
    res.status(500).json({ error: 'Failed to login' });
  }
};

// Logout a user
export const logout = (req, res) => {
  res.cookie('token', '', { maxAge: 0 }); // Clear the token cookie
  res.status(200).json({ message: 'Logged out successfully' });
};

// Create a new user (Admin/Super Admin can create users)
export const createUser = async (req, res) => {
  if (req.user.role !== 'admin' && req.user.role !== 'superadmin') {
    return res.status(403).json({ message: 'Unauthorized' });
  }

  const { username, password, email } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword, email });
    await newUser.save();
    res.status(201).json({ newUser });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create user' });
  }
};

// Get all users (Admin/Super Admin can get all users)
export const getUsers = async (req, res) => {
  if (req.user.role !== 'admin' && req.user.role !== 'superadmin') {
    return res.status(403).json({ message: 'Unauthorized' });
  }

  try {
    const users = await User.find().select('-password'); // Exclude password
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};

// Get a single user by ID (self or Admin/Super Admin can access any user)
export const getUserById = async (req, res) => {
  try {
    if (req.user._id.toString() !== req.params.id && req.user.role !== 'admin' && req.user.role !== 'superadmin') {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    const user = await User.findById(req.params.id).select('-password'); // Exclude password
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user' });
  }
};

// Update a user (self or Admin/Super Admin can update any user)
export const updateUser = async (req, res) => {
  const { username, email, role } = req.body;

  if (req.user._id.toString() !== req.params.id && req.user.role !== 'admin' && req.user.role !== 'superadmin') {
    return res.status(403).json({ message: 'Unauthorized' });
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { username, email, role },
      { new: true, runValidators: true } // Ensure validation is applied
    ).select('-password'); // Exclude password
    if (!updatedUser) return res.status(404).json({ error: 'User not found' });
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update user' });
  }
};

// Delete a user (self or Admin/Super Admin can delete any user)
export const deleteUser = async (req, res) => {
  if (req.user._id.toString() !== req.params.id && req.user.role !== 'admin' && req.user.role !== 'superadmin') {
    return res.status(403).json({ message: 'Unauthorized' });
  }

  try {
    const delUser = await User.findByIdAndDelete(req.params.id);
    if (!delUser) return res.status(404).json({ error: 'User not found' });
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get the profile of the logged-in user
export const getProfile = async (req, res) => {
  try {
    const userId = req.user._id; // Get user ID from the authenticated request
    const user = await User.findById(userId).select('-password'); // Exclude password
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user profile' });
  }
};


// Update user profile
export const updateProfile = async (req, res) => {
  const { username, email } = req.body; // Assuming only username and email are updatable

  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { username, email },
      { new: true, runValidators: true } // Ensure validation is applied
    ).select('-password'); // Exclude password
    if (!updatedUser) return res.status(404).json({ error: 'User not found' });
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update profile' });
  }
};


