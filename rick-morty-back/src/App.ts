import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("Hello world!");
});

// Export para testing
export default app;
