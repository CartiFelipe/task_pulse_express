import { Task } from '../';
import AppError from '../../erros/AppError';
import { ErrorType } from '../../shared';
import TaskRepository from './Task.repository';

export default class TaskService {
  public static createTask(task: Task) {
    const _task = TaskRepository.createTask(task);
    if (!_task)
      throw new AppError('Error creating task', 404, ErrorType.CREATION_ERROR);

    return _task;
  }

  public static getAll() {
    const tasks = TaskRepository.getAll();
    if (!tasks)
      throw new AppError('Error fetching tasks', 404, ErrorType.NOT_FOUND);
    return tasks;
  }

  public static getById(id: number) {
    const task = TaskRepository.getById(id);
    if (!task) throw new AppError('Task not found', 404, ErrorType.NOT_FOUND);
    return task;
  }
}
