import express from "express";
import type { Express } from "express";
import { authRouter } from "./auth/route.js";


export function createApplication(): Express {
    const app = express();

    // Middlewares
    app.use(express.json());

    // Routes
    app.get("/", (req, res) => {
        return res.json({ message: "Welcome to Supper Auth Service" });
    });

    app.use('/auth', authRouter)
    return app;
}
