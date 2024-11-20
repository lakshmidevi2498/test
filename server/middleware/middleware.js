import jwt from 'jsonwebtoken';

export const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    console.log('JWT Secret:', process.env.JWT_SECRET);
    
    if (err) {
      if (err.name === 'TokenExpiredError') {
        console.error('JWT expired:', err);
        return res.status(403).json({ message: 'Token expired. Please log in again.' });
      }
      console.error('JWT verification error:', err);
      return res.status(403).json({ message: 'Token verification failed' });
    }

    req.user = user;
    next();
  });
};
