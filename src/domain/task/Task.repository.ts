import { prisma } from 'lib/prisma';

import { Priority } from '../../shared';

import Status from '../../shared/enums/status';

import Task from './Task.entity';
import TaskMapper from './Task.mapperr';

import { UpdateTaskDTO } from './Task.schema';

export default class TaskRepository {
  public getAll = async (userId: number): Promise<Task[]> => {
    const tasks = await prisma.task.findMany({
      where: {
        userId,
      },
    });

    return tasks.map(TaskMapper.fromPrisma);
  };

  public getById = async (id: number, userId: number): Promise<Task | undefined> => {
    const pTask = await prisma.task.findFirst({
      where: {
        id,
        userId,
      },
    });

    if (!pTask) {
      return undefined;
    }

    return TaskMapper.fromPrisma(pTask);
  };

  public create = async (task: Task): Promise<Task> => {
    const pTask = await prisma.task.create({
      data: {
        title: task.title,
        description: task.description,
        priority: task.priority,
        status: task.status,
        userId: task.user_id,
      },
    });

    return TaskMapper.fromPrisma(pTask);
  };

  public update = async (task: UpdateTaskDTO, id: number, userId: number): Promise<Task | undefined> => {
    const exists = await prisma.task.findFirst({
      where: {
        id,
        userId,
      },
    });

    if (!exists) {
      return undefined;
    }

    const pTask = await prisma.task.update({
      where: {
        id,
      },

      data: {
        title: task.title,

        description: task.description,

        priority: task.priority as Priority,

        status: task.status as Status,
      },
    });

    return TaskMapper.fromPrisma(pTask);
  };

  public delete = async (id: number, userId: number): Promise<Task | undefined> => {
    const pTask = await prisma.task.findFirst({
      where: {
        id,
        userId,
      },
    });

    if (!pTask) {
      return undefined;
    }

    await prisma.task.delete({
      where: {
        id,
      },
    });

    return TaskMapper.fromPrisma(pTask);
  };
}
