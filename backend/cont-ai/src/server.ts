import dotenv from "dotenv";
import { AppDataSource } from "./database/data-source";
import "reflect-metadata";
import app from "./app";
import swaggerSpec from "./swagger/config";
import swaggerUi from "swagger-ui-express";

if (process.env.NODE_ENV === "test" || process.env.NODE_ENV === "dev") {
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
  

// Swagger documentation
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

console.log(process.env.NODE_ENV);