import { UserRepository } from "../database";
import { LoginUser } from "../../application/services/user/LoginUser";
import { RegisterUser } from "../../application/services/user/RegisterUser";
import { JwtAuthService } from "../providers";
import { IUserUseCase } from "../../application/usecases";

export function createUserUseCases(): IUserUseCase {
  const repo = new UserRepository();
  const authService = new JwtAuthService();

  return {
    register: new RegisterUser(repo),
    login: new LoginUser(repo, authService),
  };
}
