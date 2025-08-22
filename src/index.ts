import express from "express";
import { createServer } from "node:http";

import logger from "./shared/utils/logger.util";
import fileRouter from "./presentation/routers/file.router";
import corsMiddleware from "./presentation/middlewares/cors.middleware";
import errorMiddleware from "./presentation/middlewares/error.middleware";
import { ListFiles } from "./application/services";
import { GoogleDriveProvider } from "./infrastructure/providers";

const app = express();

app.get("/", (_req, res) => {
  res.status(200).json({
    message: "Server running",
    timestamp: new Date().toISOString(),
  });
});

const fileProvider = new GoogleDriveProvider();
const fileUseCases = new ListFiles(fileProvider);

// Add middlewares
app.use(corsMiddleware());
app.use("/files", fileRouter(fileUseCases));

// Error handler
app.use(errorMiddleware);

const server = createServer(app);

const PORT = process.env.PORT || 3000;
const HOST = "0.0.0.0";
server.listen({ port: PORT, host: HOST }, () => {
  logger.info(`Server running on port ${PORT}`);
});
