import express, { Express } from "express";
import morgan from "morgan";

export default class Middleware {
  static setup(app: Express) {
    app.use(express.json());
    app.use(morgan("tiny"));
  }
}
