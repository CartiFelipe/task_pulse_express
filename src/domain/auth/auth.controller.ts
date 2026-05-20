import { Request, Response } from 'express';

import AuthService from './auth.service';

export default class AuthController {
  constructor(private authService: AuthService) {}

  public register = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const user = await this.authService.register({
      email,
      password,
    });

    return res.status(201).json(user);
  };

  public login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const data = await this.authService.login({
      email,
      password,
    });

    return res.status(200).json(data);
  };
}
