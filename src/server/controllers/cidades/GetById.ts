import { Request, Response } from "express";
import * as yup from "yup";
import { validation } from "../../shared/middleware";
import { StatusCodes } from "http-status-codes";

interface IParamProps {
    id?: number;
}

export const getByIdValidation = validation((getSchema) => ({
    params: getSchema<IParamProps>(
        yup.object().shape({
            id: yup.number().integer().required().moreThan(0),
        })
    ),
}));

export const getById = async (req: Request<IParamProps>, res: Response) => {
    if (Number(req.params.id) === 9999)
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: "Registro não encontrado",
            },
        });

    res.status(StatusCodes.OK).json({
        id: req.params.id,
        nome: "Caxias do Sul",
    });
    return;
};
