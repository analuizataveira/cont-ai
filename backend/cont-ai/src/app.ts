import express from "express";
import cors from "cors";
import "reflect-metadata";
import bodyParser from 'body-parser';
import recordRoutes from "./routes/recordRoutes";
import userRoutes from "./routes/userRoutes"; 

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

app.use("/api", recordRoutes); 
app.use("/api", userRoutes);   

export default app;
