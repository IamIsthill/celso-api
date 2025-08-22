import { z } from "zod";

export const postRegisterUser = z
  .object({
    email: z.email(),
    password: z.string().min(1, "Password is required"),
  })
  .strict();
