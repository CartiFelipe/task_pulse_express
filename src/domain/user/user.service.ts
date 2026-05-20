import AppError from '@/erros/AppError';
import User from './user.entity';
import UserRepository from './user.repository';
import { ErrorType } from '@/shared';
import { CreateUserDTO, UpdateUserDTO } from './user.schema';

export default class UserService {
  constructor(private userRepository: UserRepository) {}

  public create = async (user: CreateUserDTO): Promise<User> => {
    return this.userRepository.createUser(user);
  };

  public findById = async (id: number): Promise<User> => {
    const user = await this.userRepository.getById(id);

    if (!user) {
      throw new AppError('User not found!', 404, ErrorType.NOT_FOUND);
    }

    return user;
  };

  public findByEmail = async (email: string): Promise<User> => {
    const user = await this.userRepository.getByEmail(email);

    if (!user) {
      throw new AppError('User not found!', 404, ErrorType.NOT_FOUND);
    }

    return user;
  };

  public findAll = async (): Promise<User[]> => {
    console.log('cheguei SERVICE');

    return this.userRepository.getAll();
  };

  public deleteById = async (id: number): Promise<User> => {
    const user = await this.userRepository.deleteUser(id);

    if (!user) {
      throw new AppError('User not found!', 404, ErrorType.NOT_FOUND);
    }

    return user;
  };

  public updateById = async (
    id: number,
    userData: UpdateUserDTO,
  ): Promise<User> => {
    const user = await this.userRepository.updateUser(id, userData);

    if (!user) {
      throw new AppError('User not found!', 404, ErrorType.UPDATE_ERROR);
    }

    return user;
  };
}
