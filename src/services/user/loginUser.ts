import { Request, Response } from 'express';
import User from '../../models/User';
import jwt, { Secret } from 'jsonwebtoken';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';

dotenv.config();

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const secretKey: Secret | undefined = process.env.SECRET_KEY;
  if (!secretKey) {
    res.status(500).json({ message: 'Server configuration error.' });
    return;
  }
  try {
    const userExists = await User.findOne({ email });
    if (!userExists) {
      res.status(404).json({ message: 'User not found.' });
      return;
    }

    const passMatch = await bcrypt.compare(password, userExists.password);

    if (!passMatch) {
      console.log('Invalid password.');
      res.status(401).json({ message: 'Invalid password.' });
      return;
    }
    console.log('Login successful.');

    const token = jwt.sign({ id: userExists._id }, secretKey, {
      expiresIn: '1d',
    });

    res.cookie('login_token', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: 31536000000,
    });

    res.status(200).json({ user: userExists, token });
  } catch (error: any) {
    console.error('Login error:', error.message);
    res.status(500).json({ message: 'Internal server error.' });
  }
};
