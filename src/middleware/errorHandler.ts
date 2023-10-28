import { Request, Response, NextFunction } from "express";

import Exception from "../error/Exception";

function errorHandler(
  err: Exception,
  req: Request,
  res: Response,
  next: NextFunction
) {
  res.status(err.status).json({
    status: err.status,
    error: err.name,
    message: err.message
  });
}

export default errorHandler;
