import UserModel from "../schemas/user-schema";
import { IUserRepository } from "../../../application/ports";
import { type User } from "../../../domain/entities";

export class UserRepository implements IUserRepository {
  async findById(id: string): Promise<User | null> {
    const user = await UserModel.findById(id).lean();
    return user;
  }
  async save(user: User): Promise<User> {
    const created = await UserModel.create(user);
    return created.toObject();
  }
  async findByEmail(email: string): Promise<User | null> {
    const user = await UserModel.findOne({ email }).lean();
    return user;
  }
}
