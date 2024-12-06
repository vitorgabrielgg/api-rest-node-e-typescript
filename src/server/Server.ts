import express, { Request, Response } from "express";

const server = express();

server.get("/", (_, res) => {
  res.send("Olá, DEV");
  return;
});

export { server };
