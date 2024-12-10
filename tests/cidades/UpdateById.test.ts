import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe("Cidades - UpdateByID", () => {
    it("Atualizar registro", async () => {
        const res1 = await testServer.post("/cidades").send({
            nome: "Caxias do Sul",
        });

        expect(res1.statusCode).toEqual(StatusCodes.CREATED);

        const resAtualizada = await testServer
            .put(`/cidades/${res1.body}`)
            .send({
                nome: "Caxias",
            });

        expect(resAtualizada.statusCode).toEqual(StatusCodes.NO_CONTENT);
    });

    it("Tentar atualizar registro com um nome muito curto", async () => {
        const resAtualizada = await testServer.put("/cidades/1").send({
            nome: "Ca",
        });

        expect(resAtualizada.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(resAtualizada.body).toHaveProperty("errors.body.nome");
    });
    it("Tentar atualizar registro com um nome muito curto e id inválido", async () => {
        const resAtualizada = await testServer.put("/cidades/teste").send({
            nome: "Ca",
        });

        expect(resAtualizada.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(resAtualizada.body).toHaveProperty("errors.body.nome");
        expect(resAtualizada.body).toHaveProperty("errors.params.id");
    });

    it("Tentar atualizar registro que não existe", async () => {
        const resApagada = await testServer.get("/cidades/9999").send();

        expect(resApagada.statusCode).toEqual(
            StatusCodes.INTERNAL_SERVER_ERROR
        );
        expect(resApagada.body).toHaveProperty("errors.default");
    });
});
