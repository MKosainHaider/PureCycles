import jwt from 'jsonwebtoken';

// Middleware to authenticate users
export const authenticate = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.PRIVATE_KEY);
    req.user = decoded; // Attach decoded token (user data) to the request object
    next();
  } catch (error) {
    console.error('Token verification error:', error.message); // Log error for debugging
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Unauthorized: Token expired' });
    }
    return res.status(401).json({ message: 'Unauthorized: Invalid token' });
  }
};

// Middleware to authorize user roles
export const authorizeRoles = (roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Forbidden: Access denied' });
    }
    next();
  };
};

// Exported middleware for different roles
export const authorizeAdmin = authorizeRoles(['admin', 'super admin']);
export const authorizeSuperAdmin = authorizeRoles(['super admin']);

// Optionally, you could add more specific role authorizations if needed
export const authorizeUser = authorizeRoles(['user', 'admin', 'super admin']); // For general users

// Additional error logging can be done if needed
