import dotenv from "dotenv";
import { AppDataSource } from "./database/data-source";
import "reflect-metadata";
import app from "./app";

if (process.env.NODE_ENV === "test" || process.env.NODE_ENV === "dev") {
  dotenv.config({ path: ".env.test" });
} else {
  dotenv.config();
}

AppDataSource.initialize()
  .then(() => {
    app.listen(3000, () => {
      console.log("Server running");
      console.log(process.env.NODE_ENV);
    });
  })
  .catch((err) => console.error("Database connection failed", err));
  
