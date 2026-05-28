import { Router } from 'express';
import { validateHandler } from '@/middlewares';
import { JWTTokenProvider } from '@/application/provider/JwtTokenProvider';
import { UserRepository, UserService } from '../user';
import AuthController from './auth.controller';
import { loginSchema, registerSchema } from './auth.schema';
import AuthService from './auth.service';
import BcryptAdapter from '@/adapters/BcryptAdapter';

const authRouter = Router();

const tokenProvider = new JWTTokenProvider();
const userRepository = new UserRepository();
const userService = new UserService(userRepository);

const authService = new AuthService(
  userService,
  tokenProvider,
  new BcryptAdapter(),
);
const authController = new AuthController(authService);

authRouter.post(
  '/register',
  validateHandler(registerSchema, 'body'),
  authController.register,
);
authRouter.post(
  '/login',
  validateHandler(loginSchema, 'body'),
  authController.login,
);

export default authRouter;
