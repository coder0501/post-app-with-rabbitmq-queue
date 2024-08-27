import mongoose from 'mongoose';

/**
 * Connects to the MongoDB database.
 * @returns {Promise<void>}
 */
const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect('mongodb://localhost:27017/react-posts');
    console.log('MongoDB connected');
  } catch (error) {
    if (error instanceof Error) {
      console.error('MongoDB connection failed:', error.message);
    } else {
      console.error('An unknown error occurred:', error);
    }
    process.exit(1);
  }
};

export default connectDB;
