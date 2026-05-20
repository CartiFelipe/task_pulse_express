import { NextFunction, Request, Response } from 'express';

export default function ensureRole(role: 'admin' | 'user') {
  return (req: Request, _: Response, next: NextFunction) => {
    if (!req.user) {
      throw new Error('User not found [ensureRoleMiddleware]');
    }

    if (req.user.role !== role) {
      throw new Error('You are not authorized to perform this action!');
    }

    next();
  };
}
