import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe("Cidades - GetById", () => {
    it("Buscar registro pelo id", async () => {
        const res1 = await testServer.post("/cidades").send({
            nome: "Caxias do Sul",
        });

        expect(res1.statusCode).toEqual(StatusCodes.CREATED);

        const resBusca = await testServer.get(`/cidades/${res1.body}`).send();

        expect(resBusca.statusCode).toEqual(StatusCodes.OK);
        expect(resBusca.body).toHaveProperty("nome");
    });

    it("Tentar criar registro com o id igual a zero", async () => {
        const resBusca = await testServer.get("/cidades/0").send();

        expect(resBusca.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(resBusca.body).toHaveProperty("errors.params.id");
    });
    it("Tentar criar registro com o id do tipo string", async () => {
        const resBusca = await testServer.get("/cidades/teste").send();

        expect(resBusca.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(resBusca.body).toHaveProperty("errors.params.id");
    });

    it("Tentar criar registro com o id do tipo número decimal", async () => {
        const resBusca = await testServer.get("/cidades/1.2").send();

        expect(resBusca.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(resBusca.body).toHaveProperty("errors.params.id");
    });

    it("Tentar deletar registro que não existe", async () => {
        const resApagada = await testServer.get("/cidades/9999").send();

        expect(resApagada.statusCode).toEqual(
            StatusCodes.INTERNAL_SERVER_ERROR
        );
        expect(resApagada.body).toHaveProperty("errors.default");
    });
});
