import { Task } from '../';
import AppError from '../../erros/AppError';
import { ErrorType } from '../../shared';
import TaskRepository from './Task.repository';
import { UpdateTaskDTO } from './Task.schema';

export default class TaskService {
  public static async createTask(task: Task) {
    const _task = await TaskRepository.createTask(task);
    if (!_task)
      throw new AppError('Error creating task', 404, ErrorType.CREATION_ERROR);

    return _task;
  }

  public static async getAll() {
    const tasks = await TaskRepository.getAll();
    if (!tasks)
      throw new AppError('Error fetching tasks', 404, ErrorType.NOT_FOUND);
    return tasks;
  }

  public static async getById(id: number) {
    const task = await TaskRepository.getById(id);
    if (!task) throw new AppError('Task not found', 404, ErrorType.NOT_FOUND);
    return task;
  }

  public static async updateTask(task: UpdateTaskDTO, id: number) {
    const _task = await TaskRepository.updateTask(task, id);
    if (!_task)
      throw new AppError('Error updating task', 404, ErrorType.UPDATE_ERRROR);
    return _task;
  }

  public static async deleteTask(id: number) {
    const deleted = await TaskRepository.deleteTask(id);
    if (!deleted)
      throw new AppError('Error deleting task', 404, ErrorType.DELETE_ERROR);

    return deleted;
  }
}
