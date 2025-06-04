import express from "express";
import cors from "cors";
import "reflect-metadata";
import bodyParser from 'body-parser';
import recordRoutes from "./routes/recordRoutes";
import userRoutes from "./routes/userRoutes"; 

const app = express();

const allowedOrigins = [
  'https://cont-ai-eight.vercel.app',
  'http://localhost:5173'
];

app.use(cors({
  origin: allowedOrigins,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Middleware para parsear JSON
app.use(bodyParser.json());
app.use(express.json());

// Rotas
app.use("/api", recordRoutes); 
app.use("/api", userRoutes);