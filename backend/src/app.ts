import express from 'express';
import cors from 'cors';
import apiRoutes from './routes/index.js';
import { errorMiddleware } from './middlewares/error.middleware.js';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.use('/api', apiRoutes);

app.use(errorMiddleware);

export default app;