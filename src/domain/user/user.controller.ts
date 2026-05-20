import { UserService } from './';
import { Request, Response } from 'express';

export default class UserController {
  constructor(private service: UserService) {}

  public create = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const user = await this.service.create({ email, password });

    return res.status(201).json(user);
  };

  public getAll = async (_: Request, res: Response) => {
    const users = await this.service.getAll();

    return res.status(200).json(users);
  };

  public getById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const user = await this.service.getById(Number(id));

    return res.status(200).json(user);
  };

  public delete = async (req: Request, res: Response) => {
    const { id } = req.params;
    const user = await this.service.delete(Number(id));

    return res.status(200).json(user);
  };

  public updateById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const userData = req.body;
    const user = await this.service.updateById(Number(id), userData);

    return res.status(200).json(user);
  };
}
