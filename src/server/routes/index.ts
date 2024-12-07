import { Router } from "express";
import { StatusCodes } from "http-status-codes";

const router = Router();

router.get("/teste", (_, res) => {
    res.send("Olá, DEV");
    return;
});

router.post("/teste", (req, res) => {
    console.log(req.query.teste);
    res.status(StatusCodes.UNAUTHORIZED).json(req.body);
    return;
});

export { router };
