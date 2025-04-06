import { Request, Response } from 'express';
import User from '../../models/User';
import bcrypt from 'bcrypt';

export const registerUser = async (req: Request, res: Response) => {
  console.log('Registering new user');
  try {
    const { username, password, email } = req.body;
    if (!username || !password || !email) {
      throw new Error('Username, Password, or email is missing.');
    }

    const existingUsername = await User.findOne({ username: username });
    const existingEmail = await User.findOne({ email: email });
    if (existingUsername) {
      res.status(301).json({ message: 'Username is taken' });
      return;
    }
    if (existingEmail) {
      res.status(301).json({ message: 'Email is already in use' });
      return;
    }

    const hashedPW = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      password: hashedPW,
      email,
    });

    await newUser.save();

    res.status(201).json({ message: 'Registered', user: newUser });
  } catch (error: any) {
    console.error('Error registering user.', error.message);
    res.status(400).json({
      message: 'Error registering user',
      reason: error.message && error.message,
    });
  }
};

const encryptPassword = async (password: string) => {
  let hashed;
  const salt = 10;
  bcrypt.genSalt(salt, function (err, salt) {
    bcrypt.hash(password, salt, function (err, hash) {
      hashed = hash;
    });
  });
  return hashed;
};
