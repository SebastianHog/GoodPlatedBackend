import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { createRecipes } from './Seed/createRecipe';
import { apiRouter } from './routes/routes';

dotenv.config();

const connectionString: any = process.env.MONGO_CONNECTION_STRING;
const app = express();

const port: number = 3042;

app.use(cors());
app.use(express.json());
app.use('/api', apiRouter);

app.post('/seed', async (req, res) => {
  const rec = await createRecipes();
  res.json(rec);
});

app.listen(port, () => {
  console.log('Listening on port: ', port);
});

mongoose
  .connect(connectionString)
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('Error connecting to MongoDB:', error));

mongoose.connection.on('connected', () =>
  console.log('Mongoose connected to db')
);
