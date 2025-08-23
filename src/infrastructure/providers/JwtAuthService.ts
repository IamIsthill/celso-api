import { IAuthService } from "../../application/ports";
import { ENV } from "../../shared/utils/load-env.util";
import jwt, { SignOptions } from "jsonwebtoken";

export class JwtAuthService implements IAuthService {
  sign(payload: object, options?: { expiresIn?: string }): string {
    return jwt.sign(payload, ENV.JWT_SECRET, {
      expiresIn: options?.expiresIn ?? "1d",
    } as SignOptions);
  }
  verify<T>(token: string): T {
    return jwt.verify(token, ENV.JWT_SECRET) as T;
  }
}
