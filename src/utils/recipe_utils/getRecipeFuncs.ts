import { Request, Response } from 'express';
import Recipes from '../../models/Recipe';

export const getRecipes = async (req: Request, res: Response) => {
  try {
    switch (req.query.recipeRequest) {
      case 'by_id':
        res.status(200).json({ message: 'Getting recipe by id' });
        break;
      case 'by_author':
        res.status(200).json({ message: 'Getting recipe(s) by author' });
        break;
      case 'random':
        res.status(200).json({ message: 'Getting one random recipe' });
        break;
      case 'all':
        const allRecipes = await Recipes.find();
        res
          .status(200)
          .json({ message: 'Getting all recipes', recipes: allRecipes });
        break;
      default:
        console.log('Defaulted');
        res.status(400).json({ message: 'Switch defaulted, invalid body.' });
        break;
    }
  } catch (error: unknown) {
    console.error('Unknown error: ', error);

    res.status(500).json({ message: 'Error getting recipe(s)' });
  }
};
