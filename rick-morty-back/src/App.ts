import express from "express";
import Middleware from "./middelware";
import characterRouter from "./characters/character-routes";

const app = express();
Middleware.setup(app);

app.use("/character", characterRouter);

// Export para testing
export default app;
