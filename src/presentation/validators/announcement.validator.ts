import { z } from "zod";
import mongooseId from "./mongoose-id.validator";

export const postAnnouncement = z
  .object({
    title: z.string().trim().min(1).max(100),
    description: z.string().min(1).max(500),
  })
  .strict();

export const announcementIdValidator = z
  .object({
    announcementId: mongooseId,
  })
  .strict();
