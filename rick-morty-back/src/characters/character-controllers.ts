import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status-codes";
import AppError from "../utils/exceptions";
import { CharacterRepository } from "./character-repository";

export function getCharacters(characterRepository: CharacterRepository) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const { name } = req.query;
    try {
      const character = await characterRepository.getAllCharacters(
        name as string
      );
      res.status(httpStatus.OK).send(character);
    } catch (err) {
      next(new AppError(httpStatus.NOT_FOUND, err.message));
    }
  };
}

export function getCharacter(characterRepository: CharacterRepository) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) {
      next(new AppError(httpStatus.NOT_FOUND, "Hey! You must provide an id"));
    } else {
      try {
        const character = await characterRepository.getCharacter(id);
        res.status(httpStatus.OK).send(character);
      } catch (err) {
        next(new AppError(httpStatus.NOT_FOUND, err.message));
      }
    }
  };
}
