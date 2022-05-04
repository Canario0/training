import express from "express";
import { setupMiddleware, setUpErrorHandlers } from "./middleware";
import characterRouter from "./characters/character-routes";
import userRouter from "./users/user-routes";
import setUpDatabase from "./database";

const app = express();
const routes = express.Router();
setUpDatabase();
setupMiddleware(app);

routes.use("/characters", characterRouter);
routes.use("/users", userRouter);
app.use("/v1", routes);

setUpErrorHandlers(app);

export default app;
