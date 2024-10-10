import jwt from 'jsonwebtoken';

export const login = async (req, res) => {
  const { email, password } = req.body;

  // Validate user credentials...
  // Assume user is found and password is valid

  const token = jwt.sign(
    { _id: user._id, role: user.role }, 
    process.env.PRIVATE_KEY, 
    { expiresIn: '1d' }
  );

  // Send token as HTTP-only cookie
  res.cookie('token', token, {
    httpOnly: true, // Prevents client-side access to the cookie
    secure: process.env.NODE_ENV === 'production', // Set to true in production (requires HTTPS)
    maxAge: 24 * 60 * 60 * 1000, // 1 day expiration
  });

  res.json({ message: 'Login successful' });
};

//logout
export const logout = (req, res) => {
    res.cookie('token', '', { maxAge: 0 }); // Clear the token cookie
    res.json({ message: 'Logged out successfully' });
  };
  