import express from "express";
import cors from "cors";
import "reflect-metadata";
import bodyParser from 'body-parser';
import recordRoutes from "./routes/recordRoutes";
import userRoutes from "./routes/userRoutes"; 

const app = express();

// Lista de origens permitidas
const allowedOrigins = [
  'https://cont-ai-eight.vercel.app',
  'https://cont-kft7mtb14-ana-luizas-projects-d060f963.vercel.app',
  'http://localhost:5173'
];

// Configuração CORS sem credenciais
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

export default app;