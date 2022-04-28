import { Request, Response } from "express";
import httpStatus from "http-status-codes";
import { CharacterRepository } from "./character-repository";

export function getCharacters(characterRepository: CharacterRepository) {
  return async (req: Request, res: Response) => {
    const character = await characterRepository.getAllCharacters();
    res.status(httpStatus.OK).send(character);
  };
}

export function getCharacter(characterRepository: CharacterRepository) {
  return async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) {
      res
        .status(httpStatus.BAD_REQUEST)
        .send({ error: "Hey! You must provide an id" });
    }
    const character = await characterRepository.getCharacter(id);
    res.status(httpStatus.OK).send(character);
  };
}
