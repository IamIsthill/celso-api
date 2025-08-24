import { User } from "../../../domain/entities";
import { ExistingEmailError } from "../../../shared/utils/errors";
import { IUserRepository } from "../../ports";
import { hash } from "bcrypt";

export class RegisterUser {
  constructor(private repo: IUserRepository) {}

  async execute(user: User) {
    const existingUser = await this.repo.findByEmail(user.email);
    if (existingUser) throw new ExistingEmailError();

    const password = await hash(user.password, 10);
    const createdUser = await this.repo.save({ ...user, password });
    return {
      ...createdUser,
      password: undefined,
    };
  }
}
