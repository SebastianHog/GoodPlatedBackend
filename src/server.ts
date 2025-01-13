// dependancies
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

// routes
dotenv.config();

const connectionString: any = process.env.MONGO_CONNECTION_STRING;
const app = express();

const port: number = 3042;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('working');
});

app.listen(port, () => {
  console.log('Listening on port: ', port);
});

const uri: any = process.env.MONGO_CONNECTION_STRING;

const clientOptions: {} = {
  serverApi: { version: '1', strict: true, deprecationErrors: true },
};

async function run() {
  try {
    console.log('trying');
    await mongoose.connect(uri, clientOptions);
    console.log('connected');
    await mongoose.connection.db!.admin().command({ ping: 1 });
    console.log(
      'Pinged your deployment. You successfully connected to MongoDB!'
    );
  } finally {
    await mongoose.disconnect();
  }
}
run().catch(console.dir);
