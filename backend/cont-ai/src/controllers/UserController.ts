import { Request, Response } from "express";
import { AppDataSource } from "../database/data-source";
import { User } from "../entities/User";
import * as bcrypt from "bcrypt";

const repo = AppDataSource.getRepository(User);

export const createUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const repo = AppDataSource.getRepository(User);

  const existingUser = await repo.findOne({ where: { email } });
  if (existingUser) {
    return res.status(409).json({ error: "Usuário já existe" });
  }

  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  const user = repo.create({ email, password: hashedPassword });
  await repo.save(user);

  res.status(201).json({ message: "Usuário criado com sucesso" });
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await repo.findOne({ where: { email } });

  if (!user) {
    return res.status(401).json({ error: "Credenciais inválidas" });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(401).json({ error: "Credenciais inválidas" });
  }

  res.status(200).json({
    message: "Login realizado com sucesso",
    userId: user.id,
    email: user.email,
  });
};