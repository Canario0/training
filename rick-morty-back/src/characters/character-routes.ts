import express from "express";
import { dataSource } from "../database";
import { getCharacters, getCharacter } from "./character-controllers";
import { TypeCharacterRepository } from "./character-repository";

const router = express.Router();
const characterRepostory = new TypeCharacterRepository(dataSource);

router.route("/").get(getCharacters(characterRepostory));

router.route("/:id").get(getCharacter(characterRepostory));

export default router;
