import { RequestHandler, Request, Response, NextFunction } from "express";

function errorCatcher(
  controller: RequestHandler
) {
  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      await controller(req, res, next);
    } catch(err) {
      next(err);
    }
  };
}

export default errorCatcher;
