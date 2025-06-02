import { AppDataSource } from "./database/data-source";
import "reflect-metadata";
import app from "./app";

AppDataSource.initialize()
    .then(() => {
        app.listen(3000, () => {
            console.log("Server running on http://localhost:3000");
        });
    })
    .catch((err) => console.error("Database connection failed", err));
