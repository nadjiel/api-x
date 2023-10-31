import { Request, Response, NextFunction } from "express";

import { userController } from "../../../controllers/";

describe("Controller userController", () => {
  describe("Method getAll", () => {
    test("Should return list of users", () => {
      const req = {} as Request;
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      } as unknown as Response;
      const next: NextFunction = jest.fn();

      userController.getAll(req, res, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(expect.any(Array));
    });
  });
});
