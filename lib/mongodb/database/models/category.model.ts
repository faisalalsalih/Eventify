import { Document, Schema, model, models, Model } from "mongoose";

export interface ICategory extends Document {
  name: string;
}

const CategorySchema = new Schema({
  name: { type: String, required: true, unique: true },
})

// ✅ Using the same Singleton Pattern with Type Casting
const Category = (models.Category as Model<ICategory>) || model<ICategory>('Category', CategorySchema);

export default Category;


