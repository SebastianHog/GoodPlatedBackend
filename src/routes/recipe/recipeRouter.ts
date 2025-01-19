import { Router } from 'express';
import { createRecipe } from '../../services/recipe/createRecipe';
import { getRecipes } from '../../services/recipe/getRecipeFuncs';

const router = Router();

router.post('/add', createRecipe);

router.get('/get', getRecipes);

export const recipeRouter = router;
