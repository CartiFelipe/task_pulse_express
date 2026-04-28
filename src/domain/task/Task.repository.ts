import { prisma } from 'lib/prisma';
import { Priority } from '../../shared';
import Status from '../../shared/enums/status';
import Task from './Task.entity';
import TaskMapper from './Task.mapperr';
import { UpdateTaskDTO } from './Task.schema';

export default class TaskRepository {
  public static async getAll(): Promise<Array<Task>> {
    return (await prisma.task.findMany()).map(TaskMapper.fromPrisma);
  }

  public static async getById(id: number): Promise<Task | undefined> {
    const pTask = await prisma.task.findUnique({ where: { id } });
    if (!pTask) {
      return undefined;
    }

    return TaskMapper.fromPrisma(pTask);
  }

  public static async createTask(task: Task) {
    const pTask = await prisma.task.create({
      data: {
        title: task.title,
        description: task.description,
        priority: task.priority as Priority,
        status: task.status as Status,
      },
    });
    return TaskMapper.fromPrisma(pTask);
  }

  public static async updateTask(task: UpdateTaskDTO, id: number) {
    const doesExists = await prisma.task.findUnique({ where: { id } });
    if (!doesExists) {
      return undefined;
    }

    const pTask = await prisma.task.update({
      where: { id },
      data: {
        title: task.title,
        description: task.description,
        priority: task.priority as Priority,
        status: task.status as Status,
      },
    });
    return TaskMapper.fromPrisma(pTask);
  }

  public static async deleteTask(id: number) {
    const pTask = await prisma.task.findUnique({ where: { id } });

    if (!pTask) {
      return undefined;
    }
    const deletedTask = TaskMapper.fromPrisma(pTask);

    await prisma.task.delete({ where: { id } });

    return TaskMapper.fromPrisma(deletedTask);
  }
}
