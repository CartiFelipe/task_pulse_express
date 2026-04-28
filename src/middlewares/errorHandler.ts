import { NextFunction, Request, Response } from 'express';
import AppError from '../erros/AppError';
import { ZodError } from 'zod';
import { ErrorType } from '../shared';

const handler = (error: Error, _: Request, res: Response, __: NextFunction) => {
  console.log(`Error middleware : ${error.message}`);

  if (error instanceof AppError) {
    return res.status(error.status).json({
      erroType: error.type,
      success: false,
      message: error.message,
    });
  }

  if (error instanceof ZodError) {
    res.status(500).json({
      errorType: ErrorType.VALIDATION,
      success: false,
      message: error.issues,
    });
  }

  return res.status(500).json({
    errorType: ErrorType.INTERNAL_SERVER_ERROR,
    success: false,
    message: 'Internal server error!',
  });
};

export default handler;
