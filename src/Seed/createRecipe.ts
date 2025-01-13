import Recipes, { IRecipe } from '../models/Recipe';

export const createRecipes = async () => {
  const recipeData: Partial<IRecipe> = {
    title: 'Iskender',
    description:
      'This is Iskender, the best dish in the world! Created in Bursa',
    creator: 'Me',
  };

  try {
    const newRecipe = new Recipes(recipeData);
    const savedRecipe = await newRecipe.save();
    return savedRecipe;
  } catch (error) {
    console.error('Error saving recipe to DB: ', error);
  }
};
