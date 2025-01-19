import { Request, Response } from 'express';
import Recipes from '../../models/Recipe';

export const createRecipe = async (req: Request, res: Response) => {
  try {
    const { title, description, creator, thumbnail } = req.body;
    if (!title || !description || !creator || !thumbnail) {
      res.status(400).json({
        message:
          'Invalid request, need title, description, thumbnail and creator.',
        body: req.body,
      });
      return;
    }
    const newRecipe = new Recipes({
      title,
      description,
      thumbnail,
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
