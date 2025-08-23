export interface IAuthService {
  sign(payload: object, options?: { expiresIn?: string }): string;
  verify<T>(token: string): T;
}
