import { Schema, Document, models, model, Model } from 'mongoose';

export interface ICategory extends Document {
  name: string;
}

const CategorySchema = new Schema({
  name: { type: String, required: true, unique: true },
});

// This line handles the Next.js singleton pattern correctly
// It checks if the model exists; if not, it creates it with the correct Type.
const Category = (models.Category as Model<ICategory>) || model<ICategory>('Category', CategorySchema);

export default Category;

