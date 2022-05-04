import { NextFunction, Response } from "express";
import { exit } from "process";
import httpStatus from "http-status-codes";
import AppError from "./exceptions";

export function handleError(err: AppError, res: Response) {
  if (!err.isOperational) {
    exit(-1);
  }
  res.status(err.statusCode).send({ error: err.message });
}

export function handleNotFound(err: AppError, next: NextFunction) {
  if (!err) {
    next(new AppError(httpStatus.NOT_FOUND, "Not found"));
  }
  next(err);
}
