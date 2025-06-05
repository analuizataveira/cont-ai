import express from "express";
import cors from "cors";
import "reflect-metadata";
import bodyParser from "body-parser";
import recordRoutes from "./routes/recordRoutes";
import userRoutes from "./routes/userRoutes";
import swaggerSpec from "./swagger/config";
import swaggerUi from "swagger-ui-express";

const app = express();

const allowedOrigins = [
  "https://cont-ai-front.onrender.com",
  "http://localhost:5173",
];

app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(bodyParser.json());
app.use(express.json());

// Rotas
app.use("/api", recordRoutes);
app.use("/api", userRoutes);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));


export default app;
