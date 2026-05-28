import AppError from '@/erros/AppError';
import { ErrorType } from '@/shared';

import { User } from '../index';
import { UserRepository, UserService } from '../user';
import { LoginDTO, RegisterDTO } from './auth.schema';
import { JWTTokenProvider } from '@/application/provider/JwtTokenProvider';
import { PasswordHasher } from '../interfaces/cryptography/IPasswordHasher';
import { PasswordValidator } from '@/application/validators/PasswordValidator';
import { ERRORMESSAGE } from '@/shared';
export default class AuthService {
  private passwordValidator = new PasswordValidator();
  constructor(
    private userService: UserService,
    private tokenProvider: JWTTokenProvider,
    private hasher: PasswordHasher,
  ) {}

  public register = async ({ email, password }: RegisterDTO): Promise<User> => {
    let userAlreadyExists = true;
    try {
      await this.userService.getByEmail(email);
    } catch (error) {
      userAlreadyExists = false;
    }

    if (userAlreadyExists) {
      throw new AppError(
        ERRORMESSAGE.USER_ALREADY_EXISTS,
        409,
        ErrorType.REGISTRATION_ERROR,
      );
    }

    // this methods throws an error if the password is invalid, so we don't need to check the return value
    // the error is captured by the global error handler and returned to the client with the appropriate status code and message
    this.passwordValidator.validate(password);
    const hashedPassword = await this.hasher.hash(password);

    return await this.userService.create({
      email,
      password: hashedPassword,
    });
  };

  public login = async ({ email, password }: LoginDTO) => {
    const user = await this.userService.getByEmail(email);

    if (!user) {
      throw new AppError(
        ERRORMESSAGE.INVALID_CREDENTIALS,
        401,
        ErrorType.LOGIN_ERROR,
      );
    }

    const passwordMatches = await this.hasher.compare(password, user.password);

    if (!passwordMatches) {
      throw new AppError(
        ERRORMESSAGE.INVALID_CREDENTIALS,
        401,
        ErrorType.LOGIN_ERROR,
      );
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
