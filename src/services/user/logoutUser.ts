import { Request, Response } from 'express';

export const logoutUser = (req: Request, res: Response) => {
  res.clearCookie('login_token', {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
  });
  res.status(200).json({ message: 'Logout successful.' });
};
