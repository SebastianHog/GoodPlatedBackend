import { Request, Response } from 'express';
import dotenv from 'dotenv';
dotenv.config();

export const getUserData = async (req: any, res: Response) => {
  res.status(200).json({ User: req.user });
};
