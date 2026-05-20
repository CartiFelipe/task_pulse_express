import AppError from '@/erros/AppError';
import { ErrorType } from '@/shared';

import { User } from '../index';
import { UserRepository, UserService } from '../user';
import { LoginDTO, RegisterDTO } from './auth.schema';
import { JWTTokenProvider } from '@/provider/JwtTokenProvider';
export default class AuthService {
  constructor(
    private userService: UserService,
    private tokenProvider: JWTTokenProvider,
  ) {}

  public register = async ({ email, password }: RegisterDTO): Promise<User> => {
    const userAlreadyExists = await this.userService.findByEmail(email);

    if (userAlreadyExists) {
      throw new AppError(
        'User already exists!',
        409,
        ErrorType.REGISTRATION_ERROR,
      );
    }

    const user = await this.userService.create({ email, password });

    return user;
  };

  public login = async ({ email, password }: LoginDTO) => {
    const user = await this.userService.findByEmail(email);

    if (!user) {
      throw new AppError('Invalid credentials!', 401, ErrorType.LOGIN_ERROR);
    }

    const passwordMatches = user.password === password;

    if (!passwordMatches) {
      throw new AppError('Invalid credentials!', 401, ErrorType.LOGIN_ERROR);
    }

    const token = this.tokenProvider.generateToken({
      id: user.id,
      role: user.role,
    });

    return {
      message: 'Login successful',
      user,
      token,
    };
  };
}
