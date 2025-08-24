import { Types } from "mongoose";
import { z } from "zod";

const mongooseId = z.string().refine((val) => Types.ObjectId.isValid(val), {
  message: "Invalid object id",
});

export default mongooseId;
