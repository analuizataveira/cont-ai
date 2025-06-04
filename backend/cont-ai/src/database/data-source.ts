import "reflect-metadata";
import { DataSource } from "typeorm";
import { Record } from "../entities/Records";
import { User } from "../entities/User";
import { config } from "dotenv";
config();

// This file sets up the TypeORM data source for the application, connecting to a PostgreSQL database.
export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST ?? "localhost",
  port: parseInt(process.env.DB_PORT ?? "5432"),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME ,
  synchronize: true, // Automatically creates/updates database tables to match entities
  logging: false, // Disables SQL query logging
  ssl: true, // Enables SSL for database connections
  entities: [Record, User], // Database tables
});
