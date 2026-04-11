import { Schema, model, models, Document, Model } from "mongoose";

// 1. Define the Interface for TypeScript
export interface IUser extends Document {
  clerkId: string;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  photo: string;
}

const UserSchema = new Schema({
  clerkId: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true }, // Fixed: lowercase 'type'
  photo: { type: String, required: true },    // Fixed: lowercase 'type'
});

// 2. Apply the Singleton Pattern with Casting
const User = (models.User as Model<IUser>) || model<IUser>('User', UserSchema);

export default User;