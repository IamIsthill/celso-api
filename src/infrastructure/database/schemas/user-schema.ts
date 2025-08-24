import { Schema, model, Document } from "mongoose";

interface UserDocument extends Document {
  email: string;
  password: string;
}

const UserSchema = new Schema<UserDocument>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const UserModel = model<UserDocument>("User", UserSchema);

export default UserModel;
