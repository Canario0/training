import express, { Request, Response } from "express";
import httpStatus from "http-status-codes";
import { getCharacters, getCharacter } from "./character-controllers";
import { TypeCharacterRepository } from "./character-repository";

const router = express.Router();
const characterRepostory = new TypeCharacterRepository();

router.route("/").get(getCharacters(characterRepostory));

router.route("/:characterId").get(getCharacter(characterRepostory));

export default router;
