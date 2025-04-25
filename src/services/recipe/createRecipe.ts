import { Request, Response } from 'express';
import Recipes from '../../models/Recipe';

export const createRecipe = async (req: Request, res: Response) => {
  console.log('Creating recipe...');
  try {
    const { title, description, steps, requirements, creator, thumbnail } =
      req.body;
    if (
      !title ||
      !description ||
      !steps ||
      !requirements ||
      !creator ||
      !thumbnail
    ) {
      res.status(400).json({
        message: 'Invalid request, some field is missing.',
        body: req.body,
      });
      return;
    }
    const newRecipe = new Recipes({
      title,
      description,
      requirements,
      steps,
      thumbnail,
      creator,
      date_posted: new Date(),
    });

    await newRecipe.save();

    res.status(201).json({ message: 'Created Recipe', recipe: newRecipe });
  } catch (error: unknown) {
    console.error('Unknown error:', error);

    res.status(500).json({ message: 'Error creating recipe', error: error });
  }
};
