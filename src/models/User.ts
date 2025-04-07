import mongoose, { Document, model, mongo } from 'mongoose';

const Schema = mongoose.Schema;

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  creationDate: Date;
  photo: string;
}

const UserSchema = new Schema<IUser>({
  username: {
    type: String,
    required: [true, 'You need a username.'],
    minlength: [3, 'Sorry, username needs atleast 3 characters :/'],
    maxlength: [
      20,
      'That´s a long name! Try to shortern it a bit... [max 20 characters]',
    ],
    unique: [true, 'This username is already in use.'],
  },
  email: {
    type: String,
    unique: [true, 'This email is already associated with an account.'],
  },
  password: {
    type: String,
    minlength: [8, '8 min'],
    maxlength: [100, '100 max'],
  },
  creationDate: {
    type: Date,
    default: Date.now,
  },
  photo: {
    type: String,
  },
});

const User = model('user', UserSchema);
export default User;
