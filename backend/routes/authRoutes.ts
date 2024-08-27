import express, { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User'; // User model to be created

const router = express.Router();

/**
 * Route to register a new user.
 * @param req - Express request object.
 * @param res - Express response object.
 */
router.post('/register', async (req: Request, res: Response): Promise<Response> => {
    try {
      console.log("Processing registration");
      const { username, password, email } = req.body;
  
      // Check if the user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ error: 'User with this email already exists' });
      }
  
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({ username, email, password: hashedPassword });
  
      // Save the user
      await user.save();
      console.log("User registered successfully");
  
      return res.status(201).send('User registered');
    } catch (error: unknown) {
      console.error('Registration error:', error);
      return res.status(500).json({ error: 'Registration failed. Please check the server logs for more details.' });
    }
});

/**
 * Route to login a user.
 * @param req - Express request object.
 * @param res - Express response object.
 */
router.post('/login', async (req: Request, res: Response): Promise<Response> => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).send('Invalid credentials');
    }
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET_KEY as string);
    return res.header('Authorization', token).send('Logged in');
  } catch (error) {
    return res.status(500).json({ error: 'Login failed' });
  }
});

export default router;
