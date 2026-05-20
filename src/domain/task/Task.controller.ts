import { Request, Response } from 'express';

import Task from './Task.entity';
import TaskMapper from './Task.mapperr';
import TaskService from './Task.services';
import { CreateTaskDTO } from './Task.schema';

export default class TaskController {
  constructor(private readonly service: TaskService) {}
  public createTask = async (req: Request, res: Response) => {
    const { title, description, priority, status } = req.body;
    const user = req.user;

    const task = new Task(
      1,
      title,
      description,
      priority,
      status,
      new Date(),
      user.id,
    );

    // const createdTask = await this.service.createTask(task, userId);
    const createdTask = await this.service.createTask(task);

    const dto: CreateTaskDTO = TaskMapper.toDTO(createdTask);

    res.status(201).json(dto);
  };

  public getAllTasks = async (req: Request, res: Response) => {
    const tasks = await this.service.getAll(req.user.id);

    res.status(200).json(tasks);
  };

  public getTaskById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const task = await this.service.getById(Number(id), req.user.id);

    res.status(200).json(task);
  };

  public updateTask = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { title, description, priority, status } = req.body;
    const updatedTask = await this.service.updateTask(
      {
        title,
        description,
        priority,
        status,
      },
      Number(id),
      req.user.id,
    );

    res.status(200).json(TaskMapper.toDTO(updatedTask));
  };

  public deleteTask = async (req: Request, res: Response) => {
    const { id } = req.params;
    const deletedTask = await this.service.deleteTask(Number(id), req.user.id);

    res.status(200).json(TaskMapper.toDTO(deletedTask));
  };
}
