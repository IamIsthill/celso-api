import cors from "cors";
import { ENV } from "../../shared/utils/load-env.util";
import { AppError } from "../../shared/utils/errors";

const ALLOWED_DOMAINS = (ENV.ALLOWED_DOMAINS ?? "")
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
      callback(
        new AppError(`Cors blocked for origin: ${origin ?? "unknown"}`, 403)
      );
    }
  },
};

export default () => {
  return cors(options);
};
