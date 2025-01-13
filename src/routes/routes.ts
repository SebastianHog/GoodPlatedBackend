import { Router } from 'express';
import { recipeRouter } from './recipe/recipeRouter';
import cors from 'cors';

const router = Router();

router.use('/recipes', recipeRouter);
export const apiRouter = router;
