import { Schema, model, Document } from 'mongoose';

/**
 * Interface representing a User document in MongoDB.
 */
export interface User extends Document {
  username: string;
  email: string;
  password: string;

}

/**
 * Mongoose schema for the User model.
 */
const UserSchema = new Schema<User>({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },

});

// Adding a pre-save hook to handle the updatedAt field.


export default model<User>('User', UserSchema);
