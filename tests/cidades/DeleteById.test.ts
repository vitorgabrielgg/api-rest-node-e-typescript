import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe("Cidades - DeleteById", () => {
    it("Deletar registro", async () => {
        const res1 = await testServer.post("/cidades").send({
            nome: "Caxias do Sul",
        });

        expect(res1.statusCode).toEqual(StatusCodes.CREATED);

        const resApagada = await testServer
            .delete(`/cidades/${res1.body}`)
            .send();

        expect(resApagada.statusCode).toEqual(StatusCodes.NO_CONTENT);
    });

    it("Tentar deletar registro com o id igual a zero", async () => {
        const resApagada = await testServer.delete("/cidades/0").send();

        expect(resApagada.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(resApagada.body).toHaveProperty("errors.params.id");
    });

    it("Tentar deletar registro com o id do tipo string", async () => {
        const resApagada = await testServer.delete("/cidades/teste").send();

        expect(resApagada.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(resApagada.body).toHaveProperty("errors.params.id");
    });

    it("Tentar deletar registro com o id do tipo número decimal", async () => {
        const resApagada = await testServer.delete("/cidades/1.2").send();

        expect(resApagada.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(resApagada.body).toHaveProperty("errors.params.id");
    });
    it("Tentar deletar registro que não existe", async () => {
        const resApagada = await testServer.delete("/cidades/9999").send();

        expect(resApagada.statusCode).toEqual(
            StatusCodes.INTERNAL_SERVER_ERROR
        );
        expect(resApagada.body).toHaveProperty("errors.default");
    });
});
