import express from "express";
import cookieParser from "cookie-parser";
import compression from "compression";

import fileRouter from "./routers/file.router";
import authRouter from "./routers/auth.router";

import corsMiddleware from "./middlewares/cors.middleware";
import errorMiddleware from "./middlewares/error.middleware";

import { IUseCase } from "../infrastructure/composition";

export function createApp(useCases: IUseCase) {
  const app = express();

  // Middlewares
  app.use(corsMiddleware());
  app.use(express.json());
  app.use(cookieParser());
  app.use(compression());

  // Health Check
  app.get("/", (_req, res) => {
    res.status(200).json({
      message: "Server running",
      timestamp: new Date().toISOString(),
    });
  });

  // Routes
  app.use("/files", fileRouter(useCases.files));
  app.use("/auth", authRouter(useCases.auth));

  // Error handler
  app.use(errorMiddleware);

  return app;
}
