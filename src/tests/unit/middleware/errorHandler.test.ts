import { Request, Response, NextFunction } from "express";

import Exception from "../../../error/Exception";

import { errorHandler } from "../../../middleware";

describe("Middleware errorHandler", () => {
  test("Responds with the received error", () => {
    const err: Exception = {
      name: "Internal server error",
      message: "Something went wrong!",
      status: 500
    };
    const req = {} as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    } as unknown as Response;
    const next: NextFunction = jest.fn();

    errorHandler(err, req, res, next);

    expect(res.status).toHaveBeenCalledWith(err.status);
    expect(res.json).toHaveBeenCalledWith({
      status: err.status,
      error: err.name,
      message: err.message
    });
  });
});
