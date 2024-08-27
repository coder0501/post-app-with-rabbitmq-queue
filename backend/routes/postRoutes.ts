import express, { Request, Response } from 'express';
import Post, { IPost } from '../models/Post';
import authMiddleware from '../middleware/authMiddleware';
import { addToQueue } from '../services/rabbitmqService';

const router = express.Router();

/**
 * Route to create a Post.
 * @param req - Express request object.
 * @param res - Express response object.
*/
router.post('/', authMiddleware, async (req: Request, res: Response): Promise<Response> => {
  console.log("Inside post creation route");

  try {
    const { title, message } = req.body;

    // Validate the request body
    if (!title || !message) {
      console.log('Validation failed: Title and message are required.');
      return res.status(400).json({ error: 'Title and message are required.' });
    }

    // Create a new Post object
    const post: IPost = new Post({ title, message });
    console.log('Post object created:', post);

    // Add the post to RabbitMQ queue
    addToQueue(post);

    // Simulate a long-running task before saving the post
    return new Promise((resolve) => {
      setTimeout(async () => {
        try {
          await post.save();
          console.log('Post saved successfully:', post);
          resolve(res.status(201).json(post));
        } catch (error) {
          console.error('Error saving post:', error);
          resolve(res.status(500).json({ error: 'Failed to save post' }));
        }
      }, 500); // Simulate delay
    });
  } catch (error) {
    console.error('Error in post creation:', error);
    return res.status(500).json({ error: 'Failed to create post' });
  }
});


/**
 * Route to fetch Posts with caching.
 * @param req - Express request object.
 * @param res - Express response object.
 */
let cache: { [key: string]: IPost[] } = {};
router.get('/', async (req: Request, res: Response): Promise<Response> => {
  console.log("Inside post")

  const { query } = req;
  const cacheKey = JSON.stringify(query);
  if (cache[cacheKey]) {
    return res.json(cache[cacheKey]);
  }
  try {
    const posts = await Post.find(query);
    cache[cacheKey] = posts;
    setTimeout(() => {
      delete cache[cacheKey];
    }, 300000); // Cache invalidation after 5 minutes
    return res.json(posts);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch posts' });
  }
});

export default router;






