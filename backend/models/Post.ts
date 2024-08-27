import mongoose, { Document, Schema } from 'mongoose';

/**
 * Interface for the Post document.
 */
export interface IPost extends Document {
  timestamp: Date;
  title: string;
  message: string;
  context: string;
  tags: string[];
  location: string;
  images: string[];
  externalLinks: string[];
  numLikes: number;
  numBookmarks: number;
  numViews: number;
}

const postSchema: Schema = new Schema({
  timestamp: { type: Date, default: Date.now },
  title: { type: String, required: true },
  message: { type: String, required: true },
  context: { type: String },
  tags: [String],
  location: String,
  images: [String],
  externalLinks: [String],
  numLikes: { type: Number, default: 0 },
  numBookmarks: { type: Number, default: 0 },
  numViews: { type: Number, default: 0 },
});

const Post = mongoose.model<IPost>('Post', postSchema);

export default Post;
