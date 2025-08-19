import cors from "cors";
import loadEnv from "./utils/load-env.util";

loadEnv();

const ALLOWED_DOMAINS = (process.env.ALLOWED_DOMAINS ?? "")
  .split(",")
  .map((domain) => domain.trim()) // remove accidental spaces
  .filter(Boolean);

const options: cors.CorsOptions = {
  origin: (origin, callback) => {
    if (
      ALLOWED_DOMAINS.includes("*") ||
      ALLOWED_DOMAINS.includes(origin ?? "")
    ) {
      callback(null, true);
    } else {
      callback(new Error("Not Allowed by cors"));
    }
  },
};

export default () => {
  return cors(options);
};
