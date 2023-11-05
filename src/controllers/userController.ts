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

async function getAll(req: Request, res: Response) {
  const users = await userModel.findAll();

  res.status(httpStatus.OK).json(users);
}

async function get(req: Request, res: Response) {
  const id = req.params.id;

  if(!uuid.validate(id)) {
    throw new BadRequestException(
      `Id '${id}' is not a valid UUID`
    );
  }

  const user = await userModel.findByPk(id);

  if(!user) {
    throw new NotFoundException(
      `Couldn't find user with id ${id}`
    );
  }

  res.status(httpStatus.OK).json(user);
}

async function create(req: Request, res: Response) {
  const {
    username,
    password,
    email,
    name
  }: UserBody = req.body;

  if(!username) {
    throw new BadRequestException(
      "Username has to be provided"
    );
  }
  if(await userModel.findOne({ where: { username } })) {
    throw new BadRequestException(
      "Username is already registered"
    );
  }

  if(!password) {
    throw new BadRequestException(
      "Password has to be provided"
    );
  }

  if(!email) {
    throw new BadRequestException(
      "Email has to be provided"
    );
  }
  if(await userModel.findOne({ where: { email } })) {
    throw new BadRequestException(
      "Email is already registered"
    );
  }

  if(!name) {
    throw new BadRequestException(
      "Name has to be provided"
    );
  }

  const user = await userModel.create({
    username, password, email, name
  });

  res.status(httpStatus.CREATED).json(user);
}

async function update(req: Request, res: Response) {
  const id = req.params.id;
  const {
    username,
    password,
    email,
    name
  }: UserBody = req.body;

  if(!uuid.validate(id)) {
    throw new BadRequestException(
      `Id '${id}' is not a valid UUID`
    );
  }

  if(!await userModel.findByPk(id)) {
    throw new NotFoundException(
      `Couldn't find user with id ${id}`
    );
  }

  if(username && await userModel.findOne({ where: { username } })) {
    throw new BadRequestException(
      "Username is already registered"
    );
  }

  if(email && await userModel.findOne({ where: { email } })) {
    throw new BadRequestException(
      "Email is already registered"
    );
  }

  const result = await userModel.update({
    username, password, email, name
  }, { where: { id }, returning: true });

  const user = result[1];

  res.status(httpStatus.OK).json(user);
}

async function remove(req: Request, res: Response) {
  const id = req.params.id;

  if(!uuid.validate(id)) {
    throw new BadRequestException(
      `Id '${id}' is not a valid UUID`
    );
  }

  const user = await userModel.findByPk(id);

  if(!user) {
    throw new NotFoundException(
      `Couldn't find user with id ${id}`
    );
  }

  user.destroy();

  res.status(httpStatus.OK).json(user);
}

export { getAll, get, create, update, remove };
