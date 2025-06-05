import { Request, Response, NextFunction } from 'express';
import { ObjectSchema } from 'joi';

export const validateBody = (schema: ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
      res.status(400).json({
        message: 'Validation failed',
        details: error.details.map((err) => ({
          message: err.message,
          path: err.path,
        })),
      });
      return;
    }

    next();
  };
};
