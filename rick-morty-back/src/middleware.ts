import express, { Express, Request, NextFunction, Response } from "express";
import morgan from "morgan";
import AppError from "./utils/exceptions";
import { handleError, handleNotFound } from "./utils/handler";

export function setupMiddleware(app: Express) {
  app.use(express.json());
  app.use(morgan("tiny"));
}

export function setUpErrorHandlers(app: Express) {
  app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    handleNotFound(err as AppError, next);
  });
  app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    handleError(err as AppError, res);
  });
}
