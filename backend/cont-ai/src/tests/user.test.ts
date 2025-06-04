import request from 'supertest';
import app from '../app';
import { AppDataSource } from '../database/data-source';
import { User } from '../entities/User';
import * as bcrypt from 'bcrypt';

beforeAll(async () => {
  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize();
  }
});

afterAll(async () => {
  if (AppDataSource.isInitialized) {
    await AppDataSource.destroy();
  }
});

beforeEach(async () => {
  await AppDataSource.getRepository(User).clear();
});

const repo = AppDataSource.getRepository(User);

describe('User Controller (integração)', () => {
  it('deve criar um novo usuário', async () => {
    const res = await request(app).post('/api/create-user').send({
      email: 'ana@example.com',
      password: '123456',
    });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('message', 'User created successfully');
  });

  it('não deve permitir criação de usuário com e-mail já existente', async () => {
    await repo.save({
      email: 'ana@example.com',
      password: await bcrypt.hash('senha', 10),
    });

    const res = await request(app).post('/api/create-user').send({
      email: 'ana@example.com',
      password: '123456',
    });

    expect(res.status).toBe(409);
    expect(res.body).toHaveProperty('error', 'User already exists');
  });

  it('deve autenticar um usuário com credenciais válidas', async () => {
    await repo.save({
      email: 'ana@example.com',
      password: await bcrypt.hash('123456', 10),
    });

    const res = await request(app).post('/api/login').send({
      email: 'ana@example.com',
      password: '123456',
    });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('message', 'Login successful');
    expect(res.body).toHaveProperty('email', 'ana@example.com');
    expect(res.body).toHaveProperty('userId');
  });

  it('não deve autenticar com e-mail inválido', async () => {
    const res = await request(app).post('/api/login').send({
      email: 'inexistente@example.com',
      password: 'qualquer',
    });

    expect(res.status).toBe(401);
    expect(res.body).toHaveProperty('error', 'Invalid credentials');
  });

  it('não deve autenticar com senha incorreta', async () => {
    await repo.save({
      email: 'ana@example.com',
      password: await bcrypt.hash('senha-correta', 10),
    });

    const res = await request(app).post('/api/login').send({
      email: 'ana@example.com',
      password: 'senha-errada',
    });

    expect(res.status).toBe(401);
    expect(res.body).toHaveProperty('error', 'Invalid credentials');
  });
});
