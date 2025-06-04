import "reflect-metadata";
import { DataSource } from "typeorm";
import { Record } from "../entities/Records";
import { User } from "../entities/User";
import { config } from "dotenv";

// Carrega .env específico conforme NODE_ENV
const envFile = process.env.NODE_ENV === "test" ? ".env.test" : ".env";
config({ path: envFile });

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST ?? process.env.DB_TEST_HOST ?? "localhost",
  port: parseInt(process.env.DB_PORT ?? process.env.DB_TEST_PORT ?? "5432"),
  username: process.env.DB_USERNAME ?? process.env.DB_TEST_USERNAME,
  password: process.env.DB_PASSWORD ?? process.env.DB_TEST_PASSWORD,
  database: process.env.DB_NAME ?? process.env.DB_TEST_NAME,
  synchronize: true, // Automatically creates/updates database tables 
  logging: false, // Disables SQL query logging
  ssl: (process.env.DB_SSL === "true" || process.env.DB_TEST_SSL === "true") 
    ? { rejectUnauthorized: false } 
    : false,
  entities: [Record, User],
});
