import { ZodType } from 'zod';
import { Request, Response, NextFunction } from 'express';
type property = 'body' | 'params' | 'query';

export default function validate(schema: ZodType, p: property) {
  return (req: Request, _: Response, next: NextFunction) => {
    const result = schema.safeParse(req[p]);

    if (!result.success) {
      return next(result.error);
    }

    req[p] = result.data;
    next();
  };
}
