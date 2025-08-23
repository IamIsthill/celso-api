import "dotenv/config";
import { z } from "zod";
import logger from "./logger.util";

const zBool = z.string().transform((val) => {
  if (["true", "1"].includes(val.toLowerCase())) return true;
  if (["false", "0"].includes(val.toLowerCase())) return false;
  throw new Error(`Invalid boolean value: ${val}`);
});

const envSchema = z.object({
  SERVICE_KEY: z.string().min(1, "This is required"),
  ROOT_FOLDER_ID: z.string().min(1, "This is required"),
  ALLOWED_DOMAINS: z.string().min(1, "This is required"),
  MONGO_URI: z.string().min(1, "This is required"),
  PORT: z.coerce.number().default(3000),
  JWT_SECRET: z.string().min(1, "This is required"),
  PRODUCTION: zBool.default(true),
});

const featureFlagsSchema = z.object({
  ENABLE_AUTH_REGISTER: zBool.default(false),
});

const { error, data } = envSchema.safeParse(process.env);
if (error) {
  logger.error("Misconfigure .env variables", error);
}

const flagsResults = featureFlagsSchema.safeParse(process.env);
if (flagsResults.error) {
  logger.error("Misconfigured feature flags", flagsResults.error);
}

export const ENV = data!;
export const FEATURE_FLAGS = flagsResults.data!;
