import mongoose, { model, Document, Types } from 'mongoose';
import { IUser } from './User';

const Schema = mongoose.Schema;

export interface IRecipe extends Document {
  title: string;
  description: string;
  steps: {
    name: string;
    description: string;
  }[];
  requirements: {
    name: string;
    amount: string;
    unit: string;
  }[];
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
  steps: {
    type: [
      {
        name: {
          type: String,
          required: [true, 'A step name is required'],
          minlength: [1, 'Step name needs minimum 1 characters.'],
          maxlength: [35, 'Step name allows maximum 35 characters.'],
        },
        description: {
          type: String,
          required: [true, 'A step description is required'],
          minlength: [1, 'Step description needs minimum 1 characters.'],
          maxlength: [1250, 'Step description allows maximum 1250 characters.'],
        },
      },
    ],
    required: true,
  },
  requirements: {
    type: [
      {
        name: {
          type: String,
          required: [true, 'An item is required'],
          minlength: [1, 'Item name needs minimum 1 characters.'],
          maxlength: [45, 'Item name allows maximum 45 characters.'],
        },
        amount: {
          type: String,
          required: [true, 'An amount is required'],
          minlength: [1, 'Amount needs minimum 1 character.'],
          maxlength: [10, 'Amount allows maximum 10 characters.'],
        },
        unit: {
          type: String,
          required: [true, 'A unit is required'],
          minlength: [1, 'Unit needs minimum 1 character.'],
          maxlength: [10, 'Unit allows maximum 10 characters.'],
        },
      },
    ],
    required: true,
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
