import { Schema, model, Document } from "mongoose";
import { User } from "../../../domain/entities";

interface UserDocument extends User, Document {}

const UserSchema = new Schema<UserDocument>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const UserModel = model<UserDocument>("User", UserSchema);

export default UserModel;
