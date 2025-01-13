import { error } from 'console';
import { Request, Response } from 'express';
import Recipes from '../../models/Recipe';
import { recipeRouter } from '../../routes/recipe/recipeRouter';

export const createRecipe = async (req: Request, res: Response) => {
  try {
    const { title, description, creator } = req.body;

    if (!title || !description || !creator) {
      res.status(400).json({
        message: 'Invalid request, need title, description and creator.',
      });
    }
    const newRecipe = new Recipes({
      title,
      description,
      creator,
      date_posted: new Date(),
    });

    await newRecipe.save();

    res.status(201).json({ message: 'Created Recipe', recipe: newRecipe });
  } catch (error: unknown) {
    console.error('Unknown error:', error);

    res.status(500).json({ message: 'Error creating recipe' });
  }
};
