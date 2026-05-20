import { prisma } from 'lib/prisma';

import User from './user.entity';
import UserMapper from './user.mapper';
import { CreateUserDTO, UpdateUserDTO } from './user.schema';

export default class UserRepository {
  public getAll = async (): Promise<User[]> => {
    const users = await prisma.user.findMany();

    return users.map(UserMapper.fromPrisma);
  };

  public getById = async (id: number): Promise<User | undefined> => {
    const pUser = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!pUser) {
      return undefined;
    }

    return UserMapper.fromPrisma(pUser);
  };

  public getByEmail = async (email: string): Promise<User | undefined> => {
    const pUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!pUser) {
      return undefined;
    }

    return UserMapper.fromPrisma(pUser);
  };

  public create = async (user: CreateUserDTO): Promise<User> => {
    const pUser = await prisma.user.create({
      data: {
        email: user.email,
        password: user.password,
        role: 'user',
      },
    });

    return UserMapper.fromPrisma(pUser);
  };

  public delete = async (id: number): Promise<User | undefined> => {
    const pUser = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!pUser) {
      return undefined;
    }

    await prisma.user.delete({
      where: {
        id,
      },
    });

    return UserMapper.fromPrisma(pUser);
  };

  public updateUser = async (id: number, data: UpdateUserDTO): Promise<User | undefined> => {
    const exists = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!exists) {
      return undefined;
    }

    const updatedUser = await prisma.user.update({
      where: {
        id,
      },

      data: {
        email: data.email,
        password: data.password,
        role: data.role,
      },
    });

    return UserMapper.fromPrisma(updatedUser);
  };
}
