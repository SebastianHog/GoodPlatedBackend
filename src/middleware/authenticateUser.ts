import User, { IUser } from '../models/User';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import jwt, { Secret } from 'jsonwebtoken';
dotenv.config();

const secretKey: Secret | undefined = process.env.SECRET_KEY;

export const authenticateUser = async (req: any, res: any, next: any) => {
  // if (req.headers['authorization'] === undefined) {
  //   return res.status(401).json({ message: 'Unauthorized: Tokenless' });
  // }
  const token = req.cookies['login_token'];

  if (!token)
    return res.status(401).json({ message: 'Unauthorized: No token' });

  try {
    if (!secretKey) throw new Error('No secret key');

    const decodedToken: any = jwt.verify(token, secretKey);

    const user = await User.findById(decodedToken.id).select('-password');
    if (!user) res.status(404).json({ message: 'User not found' });

    req.user = user;
    next();
  } catch (error: any) {
    console.error('Authentication error:', error.message);
    res.status(500).json({ message: 'Invalid token' });
  }
};
