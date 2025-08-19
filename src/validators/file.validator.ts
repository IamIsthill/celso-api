import { z } from "zod";

export const getAllFilesValidator = z
  .object({
    folderId: z.string().min(1, "Folder id is required").optional(),
  })
  .strict();
