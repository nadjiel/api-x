import { Request, Response, NextFunction } from "express";

function getAll(req: Request, res: Response, next: NextFunction) {
  res.send("Read users.");
}

function get(req: Request, res: Response, next: NextFunction) {
  res.send(`Read user ${req.params.id}.`);
}

function create(req: Request, res: Response, next: NextFunction) {
  res.send("Create user.");
}

function update(req: Request, res: Response, next: NextFunction) {
  res.send("Update user.");
}

function remove(req: Request, res: Response, next: NextFunction) {
  res.send("Delete user.");
}

export { getAll, get, create, update, remove };
