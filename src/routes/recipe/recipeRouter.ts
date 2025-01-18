import { Router } from 'express';
import { createRecipe } from '../../utils/recipe_utils/createRecipe';
import { getRecipes } from '../../utils/recipe_utils/getRecipeFuncs';

const router = Router();

router.post('/add', createRecipe);

router.get('/get', getRecipes);

export const recipeRouter = router;
