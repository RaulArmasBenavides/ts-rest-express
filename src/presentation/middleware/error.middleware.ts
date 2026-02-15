import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import { CustomError } from '../../application/errors/CustomError';

export const errorMiddleware: ErrorRequestHandler = (
  error,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {

  if (error instanceof CustomError) {
    res.status(error.statusCode).json({
      error: error.message,
    });
    return; // ← importante
  }

  console.error(error);

  res.status(500).json({
    error: 'Internal server error',
  });
};
