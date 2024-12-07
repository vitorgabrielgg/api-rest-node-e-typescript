import express from "express";

const server = express();

interface Teste {}

server.get("/", (_, res) => {
    res.send("Olá, DEV");
    return;
});

export { server };
