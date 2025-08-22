import { UserRepository } from "../../../infrastructure/database";
import { RegisterUser } from "./RegisterUser";

export interface IUserUseCase {
  register: RegisterUser;
}

export function createUserUseCases(): IUserUseCase {
  const repo = new UserRepository();

  return {
    register: new RegisterUser(repo),
  };
}
