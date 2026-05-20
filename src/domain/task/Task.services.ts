import { Task } from '../';
import AppError from '../../erros/AppError';
import { ERRORMESSAGE, ErrorType } from '../../shared';
import TaskRepository from './Task.repository';
import { UpdateTaskDTO } from './Task.schema';

export default class TaskService {
  constructor(private readonly repository: TaskRepository) {}

  public createTask = async (task: Task) => {
    const createdTask = await this.repository.create(task);

    if (!createdTask) {
      throw new AppError(
        ERRORMESSAGE.CREATION_ERROR,
        404,
        ErrorType.CREATION_ERROR,
      );
    }

    return createdTask;
  };

  public getAll = async (userId: number) => {
    return this.repository.getAll(userId);
  };

  public getById = async (id: number, userId: number) => {
    const task = await this.repository.getById(id, userId);

    if (!task) {
      throw new AppError(ERRORMESSAGE.NOT_FOUND, 404, ErrorType.NOT_FOUND);
    }

    return task;
  };

  public updateTask = async (
    task: UpdateTaskDTO,
    id: number,
    userId: number,
  ) => {
    const updatedTask = await this.repository.updateTask(task, id, userId);

    if (!updatedTask) {
      throw new AppError(
        ERRORMESSAGE.UPDATE_ERROR,
        404,
        ErrorType.UPDATE_ERRROR,
      );
    }

    return updatedTask;
  };

  public deleteTask = async (id: number, userId: number) => {
    const deletedTask = await this.repository.deleteTask(id, userId);

    if (!deletedTask) {
      throw new AppError(
        ERRORMESSAGE.DELETE_ERROR,
        404,
        ErrorType.DELETE_ERROR,
      );
    }

    return deletedTask;
  };
}
