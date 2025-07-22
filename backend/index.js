import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import userRoutes from './routes/users.js';
import dotenv from 'dotenv';

dotenv.config();


dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/users', userRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB conectado');
    app.listen(4000, () => console.log('Servidor en puerto 4000'));
  })
  .catch(err => console.error('Error de conexión:', err));
