import { Request, Response } from 'express';
import { CreateTaskDTO, Task, TaskMapper, TaskService } from '../index';

export default class TaskController {
  public static createTask(req: Request<{}, {}, CreateTaskDTO>, res: Response) {
    const { title, description, priority, status } = req.body;

    const task = new Task(1, title, description, priority, status);

    const dto: CreateTaskDTO = TaskMapper.toDTO(TaskService.createTask(task));
    res.status(200).json(dto);
  }

  public static getAllTasks(_: Request, res: Response) {
    const tasks: CreateTaskDTO[] = TaskService.getAll().map(TaskMapper.toDTO);
    res.status(200).json(tasks);
  }

  public static getTaskById(req: Request, res: Response) {
    const { id } = req.params;
    const task = TaskService.getById(Number(id));
    res.status(200).json(task);
  }
}
