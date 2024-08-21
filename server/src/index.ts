import express from 'express';
import dotenv from 'dotenv';
import todoRoutes from './routes/todoRoutes';
import { connectDB, sequelize } from './config/db';
import { Todo } from './models/todo';
import cors from 'cors';

dotenv.config();



const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use('/api', todoRoutes);

connectDB();

sequelize.sync({ force: false }).then(() => {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
});
