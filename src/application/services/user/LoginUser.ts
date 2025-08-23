import { User } from "../../../domain/entities";
import {
  IncorrectCredentialsError,
  UserNotFoundError,
} from "../../../shared/utils/errors";
import { IAuthService, IUserRepository } from "../../ports";
4;
import { compare } from "bcrypt";

export class LoginUser {
  constructor(
    private repo: IUserRepository,
    private authService: IAuthService
  ) {}

  async execute(user: User) {
    const existingUser = await this.repo.findByEmail(user.email);
    if (!existingUser) throw new UserNotFoundError();

    // Check password
    const isSamePassword = await compare(user.password, existingUser.password);
    if (!isSamePassword) throw new IncorrectCredentialsError();

    return this.authService.sign(existingUser);
  }
}
