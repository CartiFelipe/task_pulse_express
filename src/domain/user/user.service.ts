import AppError from '@/erros/AppError';
import User from './user.entity';
import UserRepository from './user.repository';
import { ERRORMESSAGE, ErrorType } from '@/shared';
import { CreateUserDTO, UpdateUserDTO } from './user.schema';

export default class UserService {
  constructor(private userRepository: UserRepository) {}

  public create = async (user: CreateUserDTO): Promise<User> => {
    return this.userRepository.create(user);
  };

  public getById = async (id: number): Promise<User> => {
    const user = await this.userRepository.getById(id);

    if (!user) {
      throw new AppError(ERRORMESSAGE.NOT_FOUND, 404, ErrorType.NOT_FOUND);
    }

    return user;
  };

  public getByEmail = async (email: string): Promise<User> => {
    const user = await this.userRepository.getByEmail(email);

    if (!user) {
      throw new AppError(ERRORMESSAGE.NOT_FOUND, 404, ErrorType.NOT_FOUND);
    }

    return user;
  };

  public getAll = async (): Promise<User[]> => {
    return this.userRepository.getAll();
  };

  public delete = async (id: number): Promise<User> => {
    const user = await this.userRepository.delete(id);

    if (!user) {
      throw new AppError(ERRORMESSAGE.NOT_FOUND, 404, ErrorType.NOT_FOUND);
    }

    return user;
  };

  public updateById = async (
    id: number,
    userData: UpdateUserDTO,
  ): Promise<User> => {
    const user = await this.userRepository.updateUser(id, userData);

    if (!user) {
      throw new AppError(ERRORMESSAGE.NOT_FOUND, 404, ErrorType.UPDATE_ERROR);
    }

    return user;
  };
}
