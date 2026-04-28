import { Request, Response } from 'express';
import { CreateTaskDTO, Task, TaskMapper, TaskService } from '../index';
import { UpdateTaskDTO } from './Task.schema';

export default class TaskController {
  public static async createTask(
    req: Request<{}, {}, CreateTaskDTO>,
    res: Response,
  ) {
    const { title, description, priority, status } = req.body;

    const task = new Task(1, title, description, priority, status);

    const dto: CreateTaskDTO = TaskMapper.toDTO(
      await TaskService.createTask(task),
    );
    res.status(201).json(dto);
  }

  public static async getAllTasks(_: Request, res: Response) {
    // qual foi desse createtaskdto[]?
    const tasks: CreateTaskDTO[] = await TaskService.getAll();
    res.status(200).json(tasks);
  }

  public static async getTaskById(req: Request, res: Response) {
    const { id } = req.params;
    const task = await TaskService.getById(Number(id));
    res.status(200).json(task);
  }

  public static async updateTask(
    req: Request<{ id: string }, {}, UpdateTaskDTO>,
    res: Response,
  ) {
    const { id } = req.params;
    const { title, description, priority, status } = req.body;
    const updatedTask = await TaskService.updateTask(
      {
        title,
        description,
        priority,
        status,
      },
      Number(id),
    );

    res.status(200).json(TaskMapper.toDTO(updatedTask));
  }
  public static async deleteTask(req: Request, res: Response) {
    const { id } = req.params;
    const deleted = await TaskService.deleteTask(Number(id));

    res.status(200).json(TaskMapper.toDTO(deleted));
  }
}
