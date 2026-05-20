import User from './user.entity';
import { CreateUserDTO, UserDTO } from './user.schema';

export default class UserMapper {
  public static fromPrisma(prismaUser: any): User {
    return new User(
      prismaUser.id,
      prismaUser.email,
      prismaUser.password,
      prismaUser.role,
    );
  }

  public static toDTO(user: User): UserDTO {
    return {
      email: user.email,
      password: user.password,
      role: user.role,
    };
  }
}
