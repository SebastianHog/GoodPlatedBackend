import { Router } from 'express';
import { registerUser } from '../../services/user/userRegister';
// import { authenticateUser } from '../../middleware/authenticateUser';
import { loginUser } from '../../services/user/loginUser';
import { getUserData } from '../../services/user/getUserData';

const router = Router();

// router.get('/authenticate', authenticateUser);

router.get('/:id', getUserData);

export const userRouter = router;
