import express, { RequestHandler } from 'express';
import { TaskRouter } from './domain';
import cors from 'cors';
import { errorHandler } from './middlewares';
import authRouter from './domain/auth/auth.router';
import userRouter from './domain/user/user.router';

class App {
  private app: express.Application;
  public constructor() {
    this.app = express();
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use('/users', userRouter);
    this.app.use('/auth', authRouter);
    this.app.use('/tasks', TaskRouter);
    this.app.use(errorHandler);
  }

  public getApp(): express.Application {
    return this.app;
  }

  public listen(port: number, callback?: () => void) {
    this.app.listen(port, callback);
  }
}

export default App;
