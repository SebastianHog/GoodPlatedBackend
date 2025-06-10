import { Request, Response } from 'express';
import Recipes from '../../models/Recipe';
import mongoose from 'mongoose';

export const getRecipes = async (req: Request, res: Response) => {
  try {
    switch (req.query.recipeRequest) {
      case 'by_id':
        const recipe = await Recipes.findById(req.query.recipeId)
          .populate('creator')
          .lean();

        res
          .status(200)
          .json({ message: 'Getting recipe by id', recipe: recipe });
        break;

      case 'by_author':
        const recipesbyAuthor = await Recipes.find({
          creator: req.query.author,
        })
          .populate('creator')
          .lean();
        res.status(200).json({
          message: 'Getting recipe(s) by author',
          count: recipesbyAuthor.length,
          recipes: recipesbyAuthor,
        });
        break;

      case 'random':
        Recipes.countDocuments({
          title: { $exists: true },
          thumbnail: { $exists: true },
        })
          .then((count) => {
            const rand = Math.floor(Math.random() * count);

            Recipes.findOne()
              .populate('creator')
              .skip(rand)
              .lean()
              .then((recipe) => {
                res.status(200).json({
                  message: 'Getting one random recipe',
                  recipe: recipe,
                });
              });
          })
          .catch((err) => {
            console.error('Error getting count:', err);
          });

        break;

      case 'all':
        const allRecipes = await Recipes.find().populate('creator').lean();
        res
          .status(200)
          .json({ message: 'Getting all recipes', recipes: allRecipes });
        break;

      default:
        console.error('Defaulted');
        res.status(400).json({ message: 'Switch defaulted, invalid body.' });
        break;
    }
  } catch (error: unknown) {
    console.error('Unknown error: ', error);

    res.status(500).json({ message: 'Error getting recipe(s)' });
  }
};
