import { Request, Response } from 'express';
import Recipes from '../../models/Recipe';

export const removeRecipe = async (req: Request, res: Response) => {
  try {
    const { recipeId, userId } = req.body;

    if (!recipeId || !userId) {
      res.status(400).json({
        message: 'Invalid request, recipeId or userId is missing.',
      });
      return;
    }

    const recipe = await Recipes.findById(recipeId);

    if (!recipe) {
      res.status(404).json({ message: 'Recipe not found.' });
      return;
    }

    if (recipe.creator.toString() !== userId) {
      res
        .status(403)
        .json({ message: 'Failed to remove recipe, you are not the author.' });
      return;
    }

    await Recipes.findByIdAndDelete(recipeId);

    res.status(200).json({ message: 'Recipe removed successfully.' });
  } catch (error: unknown) {
    console.error('Unknown error:', error);
    res.status(500).json({ message: 'Error removing recipe', error });
  }
};
