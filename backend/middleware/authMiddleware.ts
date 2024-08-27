import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

/**
 * Middleware to authenticate JWT tokens.
 * @param req - Express request object.
 * @param res - Express response object.
 * @param next - Express next function.
 */
const authMiddleware = (req: Request, res: Response, next: NextFunction): Response | void => {
  const authHeader = req.header('Authorization');

  if (!authHeader) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }

  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7).trim() : authHeader;

  try {
    if (!process.env.JWT_SECRET_KEY) {
      throw new Error('JWT_SECRET_KEY is not defined in environment variables');
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY as string) as { _id: string };
    req.user = decoded;
    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      console.error('JWT verification failed:', error.message);
      return res.status(400).json({ error: 'Invalid token.', message: error.message });
    } else if (error instanceof Error) {
      console.error('An unexpected error occurred:', error.message);
      return res.status(500).json({ error: 'An error occurred.', message: error.message });
    } else {
      console.error('An unknown error occurred:', error);
      return res.status(500).json({ error: 'An error occurred.', message: 'Unknown error' });
    }
  }
};

export default authMiddleware;
