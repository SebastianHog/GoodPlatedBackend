import { Request, Response } from 'express';
import dotenv from 'dotenv';
import User from '../../models/User';
dotenv.config();

export const getUserData = async (req: Request, res: Response) => {
  const { id } = req.params;
  console.log(id);
  const user = await User.findById(id);
  console.log(user);
  res.json(user);
};
