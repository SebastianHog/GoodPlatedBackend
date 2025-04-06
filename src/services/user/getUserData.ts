import { Request, Response } from 'express';
import dotenv from 'dotenv';
import User from '../../models/User';
import mongoose from 'mongoose';
dotenv.config();

export const getUserData = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({ error: 'Invalid user ID' });
    }
    const user = await User.findById(id);
    if (!user) throw new Error('No user found with this id');
    res.json(user);
  } catch (error) {
    console.error(error);
  }
};
