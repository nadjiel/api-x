import { Request, Response, NextFunction } from "express";

import { NotFoundException } from "../error";

function defaultRouter(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const error = new NotFoundException(
    `Couldn't find '${req.originalUrl}' route`
  );

  next(error);
}

export default defaultRouter;
