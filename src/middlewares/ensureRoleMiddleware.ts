import AppError from '@/erros/AppError';
import { ERRORMESSAGE } from '@/shared/constants/errorMessage';
import ErrorType from '@/shared/enums/error';
import { NextFunction, Request, Response } from 'express';

export default function ensureRole(role: 'admin' | 'user') {
  return (req: Request, _: Response, next: NextFunction) => {
    if (!req.user) {
      throw new AppError(
        ERRORMESSAGE.NOT_AUTHORIZED,
        401,
        ErrorType.NOT_AUTHORIZED,
      );
    }

    if (req.user.role !== role) {
      throw new AppError(
        ERRORMESSAGE.NOT_AUTHORIZED,
        401,
        ErrorType.NOT_AUTHORIZED,
      );
    }

    next();
  };
}
