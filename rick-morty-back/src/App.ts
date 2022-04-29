import express from "express";
import { setupMiddleware, setUpErrorHandlers } from "./middelware";
import characterRouter from "./characters/character-routes";
import setUpDatabase from "./database";

const app = express();
const routes = express.Router();
setUpDatabase();
setupMiddleware(app);

routes.use("/character", characterRouter);
app.use("/v1", routes);

setUpErrorHandlers(app);
// Export para testing
export default app;
