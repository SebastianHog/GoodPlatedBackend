import { Router } from 'express';
import { createRecipe } from '../../utils/recipe_utils/createRecipe';

const router = Router();

router.post('/add', createRecipe);

export const recipeRouter = router;
