import request from "supertest";
import app from "../app";
import { AppDataSource } from "../database/data-source";
import { Record, TransactionType } from "../entities/Records";

const repo = AppDataSource.getRepository(Record);

beforeAll(async () => {
  await AppDataSource.initialize();
});

afterAll(async () => {
  await AppDataSource.destroy();
});

beforeEach(async () => {
  await repo.clear();
});

describe("Records Controller (integração)", () => {
  it("deve criar um novo registro", async () => {
    const response = await request(app).post("/api/records").send({
      description: "Salário",
      amount: 3000,
      type: TransactionType.CREDIT,
      date: "01/06/2025",
    });

    expect(response.status).toBe(201);
    expect(response.body.description).toBe("Salário");
  });

  it("deve retornar todos os registros", async () => {
    await repo.save({
      description: "Café",
      amount: 10,
      type: TransactionType.DEBIT,
      date: "02/06/2025",
    });

    const response = await request(app).get("/api/records");
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(1);
  });

  it("deve agrupar registros por mês", async () => {
    await repo.save([
      {
        description: "Salário",
        amount: 3000,
        type: TransactionType.CREDIT,
        date: "01/06/2025",
      },
      {
        description: "Aluguel",
        amount: 1000,
        type: TransactionType.DEBIT,
        date: "15/06/2025",
      },
    ]);

    const response = await request(app).get("/api/records/grouped/by-month");

    expect(response.status).toBe(200);
    expect(response.body[0].monthYear).toBe("06/2025");
    expect(response.body[0].totalCredit).toBe(3000);
    expect(response.body[0].totalDebit).toBe(1000);
  });

  it("deve atualizar um registro existente", async () => {
    const saved = await repo.save({
      description: "Internet",
      amount: 100,
      type: TransactionType.DEBIT,
      date: "10/06/2025",
    });

    const res = await request(app).put(`/api/records/${saved.id}`).send({
      description: "Internet - Atualizado",
      amount: 120,
    });

    expect(res.status).toBe(200);
    expect(res.body.description).toBe("Internet - Atualizado");
    expect(Number(res.body.amount)).toBe(120);
  });

  it("deve deletar um registro existente", async () => {
    const saved = await repo.save({
      description: "Transporte",
      amount: 50,
      type: TransactionType.DEBIT,
      date: "05/06/2025",
    });

    const res = await request(app).delete(`/api/records/${saved.id}`);
    expect(res.status).toBe(204);

    const check = await repo.findOneBy({ id: saved.id });
    expect(check).toBeNull();
  });


  it("não deve criar registro com dados inválidos", async () => {
    const res = await request(app).post("/api/records").send({
      description: "", 
      amount: "abc",   
      type: "QUALQUER", 
      date: "99/99/9999" 
    });

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("error");
  });

  it("não deve atualizar um registro inexistente", async () => {
    const res = await request(app).put("/api/records/9999").send({
      description: "Atualização inválida"
    });

    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty("error", "Not found.");
  });

  it("não deve deletar um registro inexistente", async () => {
    const res = await request(app).delete("/api/records/9999");

    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty("error", "Not found.");
  });

  it("não deve retornar um registro inexistente por ID", async () => {
    const res = await request(app).get("/api/records/9999");

    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty("error", "Not found.");
  });
});
