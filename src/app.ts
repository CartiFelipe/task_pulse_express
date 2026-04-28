import express from 'express';
import { TaskRouter } from './domain';
import cors from 'cors';
import { errorHandler } from './middlewares';

const app = express();
app.use(cors());
app.use(express.json());
app.use('/tasks', TaskRouter);
app.use(errorHandler);

export default app;
