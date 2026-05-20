import { NextFunction, Request, Response } from 'express';
import AppError from '../erros/AppError';
import { ZodError } from 'zod';
import { ERRORMESSAGE, ErrorType } from '../shared';

const handler = (error: Error, _: Request, res: Response, __: NextFunction) => {
  if (error instanceof AppError) {
    return res.status(error.status).json({
      erroType: error.type,
      message: error.message,
    });
  }

  if (error instanceof ZodError) {
    return res.status(422).json({
      errorType: ErrorType.VALIDATION,
      message: ERRORMESSAGE.VALIDATION_ERROR,
      issues: error.issues,
    });
  }

  return res.status(500).json({
    errorType: ErrorType.INTERNAL_SERVER_ERROR,
    message: error.message,
  });
};

export default handler;
