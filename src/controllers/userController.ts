import { Request, Response, NextFunction } from "express";
import httpStatus from "http-status-codes";
import * as uuid from "uuid";

import { userModel } from "../models";
import { Exception, BadRequestException, NotFoundException } from "../error";

interface UserBody {
  username: string,
  password: string,
  email: string,
  name: string
};

async function getAll(req: Request, res: Response, next: NextFunction) {
  try {
    const users = await userModel.findAll();

    res.status(httpStatus.OK).json(users);
  } catch(err) {
    next(new Exception());
  }
}

async function get(req: Request, res: Response, next: NextFunction) {
  try {
    const id = req.params.id;

    if(!uuid.validate(id)) {
      return next(new BadRequestException(
        `Id '${id}' is not a valid UUID`
      ));
    }

    const user = await userModel.findByPk(id);

    if(!user) {
      return next(new NotFoundException(
        `Couldn't find user with id ${id}`
      ));
    }

    res.status(httpStatus.OK).json(user);
  } catch(err) {
    next(new Exception());
  }
}

async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const {
      username,
      password,
      email,
      name
    }: UserBody = req.body;

    if(!username) {
      return next(new BadRequestException(
        "Username has to be provided"
      ));
    }
    if(await userModel.findOne({ where: { username } })) {
      return next(new BadRequestException(
        "Username is already registered"
      ));
    }

    if(!password) {
      return next(new BadRequestException(
        "Password has to be provided"
      ));
    }

    if(!email) {
      return next(new BadRequestException(
        "Email has to be provided"
      ));
    }
    if(await userModel.findOne({ where: { email } })) {
      return next(new BadRequestException(
        "Email is already registered"
      ));
    }

    if(!name) {
      return next(new BadRequestException(
        "Name has to be provided"
      ));
    }

    const user = await userModel.create({
      username, password, email, name
    });

    res.status(httpStatus.CREATED).json(user);
  } catch(err) {
    next(new Exception());
  }
}

async function update(req: Request, res: Response, next: NextFunction) {
  try {
    const id = req.params.id;
    const {
      username,
      password,
      email,
      name
    }: UserBody = req.body;

    if(!uuid.validate(id)) {
      return next(new BadRequestException(
        `Id '${id}' is not a valid UUID`
      ));
    }

    if(!await userModel.findByPk(id)) {
      return next(new NotFoundException(
        `Couldn't find user with id ${id}`
      ));
    }

    if(username && await userModel.findOne({ where: { username } })) {
      return next(new BadRequestException(
        "Username is already registered"
      ));
    }

    if(email && await userModel.findOne({ where: { email } })) {
      return next(new BadRequestException(
        "Email is already registered"
      ));
    }

    const result = await userModel.update({
      username, password, email, name
    }, { where: { id }, returning: true });

    const user = result[1];

    res.status(httpStatus.OK).json(user);
  } catch(err) {
    next(new Exception());
  }
}

async function remove(req: Request, res: Response, next: NextFunction) {
  try {
    const id = req.params.id;

    if(!uuid.validate(id)) {
      return next(new BadRequestException(
        `Id '${id}' is not a valid UUID`
      ));
    }

    const user = await userModel.findByPk(id);

    if(!user) {
      return next(new NotFoundException(
        `Couldn't find user with id ${id}`
      ));
    }

    user.destroy();

    res.status(httpStatus.OK).json(user);
  } catch(err) {
    console.error(err)

    next(new Exception());
  }
}

export { getAll, get, create, update, remove };
