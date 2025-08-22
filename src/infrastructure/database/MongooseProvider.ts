import { connect, disconnect } from "mongoose";
import logger from "../../shared/utils/logger.util";

export class MongooseProvider {
  private static isConnected = false;

  static async connect(uri: string) {
    if (this.isConnected) {
      logger.info("MongoDB already connected");
      return;
    }

    try {
      await connect(uri);
      this.isConnected = true;
      logger.info("Successfully connected to the database");
    } catch (err) {
      logger.error("MongoDB connection error:", err);
      process.exit(1); // exit app if DB connection fails
    }
  }

  static async disconnect() {
    if (!this.isConnected) return;
    await disconnect();
    this.isConnected = false;
    logger.info("MongoDB disconnected");
  }
}
