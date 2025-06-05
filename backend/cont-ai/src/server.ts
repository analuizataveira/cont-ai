import dotenv from "dotenv";
import { AppDataSource } from "./database/data-source";
import "reflect-metadata";
import app from "./app";

if (process.env.NODE_ENV === "test") {
  dotenv.config({ path: ".env.test" });
} else {
  dotenv.config();
}

AppDataSource.initialize()
  .then(() => {
    app.listen(3000, () => {
      console.log("Server running on http://localhost:3000");
    });
  })
  .catch((err) => console.error("Database connection failed", err));
