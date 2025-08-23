import { LoginUser } from "../services/user";
import { RegisterUser } from "../services/user";

export interface IUserUseCase {
  register: RegisterUser;
  login: LoginUser;
}
