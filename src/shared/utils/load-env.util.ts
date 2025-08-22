import "dotenv/config";
import { z } from "zod";
import logger from "./logger.util";

const envSchema = z.object({
  SERVICE_KEY: z.string().min(1, "This is required"),
  ROOT_FOLDER_ID: z.string().min(1, "This is required"),
  ALLOWED_DOMAINS: z.string().min(1, "This is required"),
  MONGO_URI: z.string().min(1, "This is required"),
  PORT: z.coerce.number().default(3000),
});

const { error, data } = envSchema.safeParse(process.env);

if (error) {
  logger.error("Misconfigure .env variables", error);
}

export const ENV = data!;
