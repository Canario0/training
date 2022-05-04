import express from "express";
import { dataSource } from "../database";
import { getAllUsers, getUser } from "./user-controllers";
import { TypeUserRepository } from "./user-repository";

const router = express.Router();
const userRepository = new TypeUserRepository(dataSource);

router.route("/").get(getAllUsers(userRepository));

router.route("/:id").get(getUser(userRepository));

export default router;
