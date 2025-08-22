import express from "express";
import { createServer, Server } from "node:http";

import logger from "./shared/utils/logger.util";
import fileRouter from "./presentation/routers/file.router";
import corsMiddleware from "./presentation/middlewares/cors.middleware";
import errorMiddleware from "./presentation/middlewares/error.middleware";
import { ListFiles } from "./application/services";
import { GoogleDriveProvider } from "./infrastructure/providers";
import { MongooseProvider } from "./infrastructure/database";
import { ENV } from "./shared/utils/load-env.util";

async function bootstrap() {
  try {
    // Connect to MongoDB
    await MongooseProvider.connect(ENV.MONGO_URI);

    const app = express();

    // Middlewares
    app.use(corsMiddleware());
    app.use(express.json());

    app.get("/", (_req, res) => {
      res.status(200).json({
        message: "Server running",
        timestamp: new Date().toISOString(),
      });
    });

    // Use cases
    const fileProvider = new GoogleDriveProvider();
    const fileUseCases = new ListFiles(fileProvider);

    // Routes
    app.use("/files", fileRouter(fileUseCases));

    // Error handler
    app.use(errorMiddleware);

    // Create HTTP server
    const server: Server = createServer(app);

    const PORT = ENV.PORT;
    const HOST = "0.0.0.0";

    server.listen({ port: PORT, host: HOST }, () => {
      logger.info(`Server running on port ${PORT}`);
    });

    // Graceful shutdown
    const shutdown = async () => {
      logger.info("Shutting down server...");
      server.close(async (err) => {
        if (err) {
          logger.error("Error closing server:", err);
          process.exit(1);
        }
        await MongooseProvider.disconnect();
        logger.info("Server and database connections closed. Exiting process.");
        process.exit(0);
      });
    };

    process.on("SIGINT", shutdown);
    process.on("SIGTERM", shutdown);
  } catch (error) {
    logger.error("Failed to start server:", error);
    process.exit(1);
  }
}

bootstrap();
