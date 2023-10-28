const supertest = require("supertest");
const expect = require("expect");
const app = require("../app");
const db1 = require("../db1");
const Cidade = require("../models/Cidades");

const request = supertest(app);
const endpoint = "/api/cidades";

describe(endpoint, () => {
  beforeAll(async () => {
    await db1.connect();
  });

  afterAll(async () => {
    await db1.close();
  });

  describe("GET /", () => {
    it("deve retornar todas as cidades", async () => {
      const titles = ["m1", "m2"];
      const cidades = titles.map((title) => ({
        title,
      }));
      await Cidade.insertMany(cidades);

      const res = await request.get(endpoint);

      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBeTruthy();
      titles.forEach((title) =>
        expect(res.body.some((m) => m.title === title))
      );

      await Cidade.deleteMany({ title: { $in: titles } });
    });
  });

  describe("POST /", () => {
    it("deve retornar 400 se a solicitação não for válida", async () => {
      const res = await request.post(endpoint).send({});

      expect(res.status).toBe(400);
    });

    it("deve armazenar a cidade e retornar 201 se a solicitação for válida", async () => {
      const cidade = { title: "m" };

      const res = await request.post(endpoint).send(cidade);

      expect(res.status).toBe(201);
      expect(res.body.title).toBe(cidade.title);
      expect(res.body._id).toBeTruthy();

      await Cidade.findByIdAndDelete(res.body._id);
    });
  });

  describe("DELETE /:id", () => {
    it("deve retornar 404 se a cidade não foi encontrada", async () => {
      const res = await request.delete(endpoint);

      expect(res.status).toBe(404);
    });

    it("deve deletar a cidade e voltar 204", async () => {
      const cidade = new Cidade({ title: "m" });
      await cidade.save();

      const res = await request.delete(`${endpoint}/${cidade._id}`);

      expect(res.status).toBe(204);

      const cidadeInDB = await Cidade.findById(cidade._id);
      expect(cidadeInDB).toBeFalsy();
    });
  });
});
