import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status-codes";
import AppError from "../utils/exceptions";
import { UserRepository } from "./user-repository";

export function getAllUsers(userRepository: UserRepository) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const { name } = req.query;
    try {
      const user = await userRepository.getAllUsers(name as string);
      res.status(httpStatus.OK).json(user);
    } catch (err) {
      next(new AppError(httpStatus.NOT_FOUND, err.message));
    }
  };
}

export function getUser(userRepository: UserRepository) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) {
      next(new AppError(httpStatus.BAD_REQUEST, "Hey! You must provide an id"));
    } else {
      try {
        const user = await userRepository.getUser(id);
        res.status(httpStatus.OK).json(user);
      } catch (err) {
        next(new AppError(httpStatus.NOT_FOUND, err.message));
      }
    }
  };
}
