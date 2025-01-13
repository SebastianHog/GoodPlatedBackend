import mongoose, { model, Document } from 'mongoose';

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

export interface IRecipe extends Document {
  title: string;
  description: string;
  creator: string;
  date_posted?: Date;
}

const RecipeSchema = new Schema<IRecipe>({
  title: {
    type: String,
    required: [true, 'Title is required'],
    minlength: [3, 'Minimum 3 characters long title'],
  },
  description: {
    type: String,
    required: [true, 'A description is required'],
    minlength: [25, 'Description needs minimum 25 characters.'],
    maxlength: [250, 'Description allows maximum 250 characters.'],
  },
  creator: { type: String, required: [true, 'Creator is required'] },
  date_posted: { type: Date, default: Date.now },
});

const Recipes = model('recipes', RecipeSchema);
export default Recipes;
