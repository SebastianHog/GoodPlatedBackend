import mongoose, { model, Document, Types } from 'mongoose';
import { IUser } from './User';

const Schema = mongoose.Schema;

export interface IRecipe extends Document {
  title: string;
  description: string;
  thumbnail: string;
  creator: Types.ObjectId | IUser;
  date_posted?: Date;
}

const RecipeSchema = new Schema<IRecipe>({
  title: {
    type: String,
    required: [true, 'Title is required'],
    minlength: [3, 'Minimum 3 characters long title'],
    maxlength: [45, 'Maximum 45 characters long title'],
  },
  description: {
    type: String,
    required: [true, 'A description is required'],
    minlength: [5, 'Description needs minimum 5 characters.'],
    maxlength: [1250, 'Description allows maximum 1250 characters.'],
  },
  thumbnail: {
    type: String,
    required: [true, 'A Thumbnail is required'],
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  date_posted: { type: Date, default: Date.now },
});

const Recipes = model('recipes', RecipeSchema);
export default Recipes;
