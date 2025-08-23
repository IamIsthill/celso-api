import { createServer, Server } from "node:http";
import { createApp } from "./presentation/app";

import { ENV } from "./shared/utils/load-env.util";
import logger from "./shared/utils/logger.util";

import { createUseCases } from "./infrastructure/composition";
import { MongooseProvider } from "./infrastructure/database";

async function bootstrap() {
  try {
    // Connect to MongoDB
    await MongooseProvider.connect(ENV.MONGO_URI);

    const useCases = createUseCases();
    const app = createApp(useCases);

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
