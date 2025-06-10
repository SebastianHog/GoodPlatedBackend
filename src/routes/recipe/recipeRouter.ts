import { Router } from 'express';
import { createRecipe } from '../../services/recipe/createRecipe';
import { getRecipes } from '../../services/recipe/getRecipeFuncs';
import { removeRecipe } from '../../services/recipe/removeRecipe';

const router = Router();

router.post('/add', createRecipe);

router.get('/get', getRecipes);

router.delete('/delete', removeRecipe);

export const recipeRouter = router;
