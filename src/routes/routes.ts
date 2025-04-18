import { Router } from 'express';
import { recipeRouter } from './recipe/recipeRouter';
import { userRouter } from './user/userRouter';
import { authenticateUser } from '../middleware/authenticateUser';
import { loginUser } from '../services/user/loginUser';
import { registerUser } from '../services/user/userRegister';
import { logoutUser } from '../services/user/logoutUser';

const router = Router();

router.use('/recipes', recipeRouter);
router.use('/user', userRouter);

router.post('/login', loginUser);
router.post('/register', registerUser);
router.post('/logout', logoutUser);

export const apiRouter = router;
