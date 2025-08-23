import { Schema, model, Document } from "mongoose";

export interface AnnouncementDocument extends Document {
  title: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

const AnnouncementSchema = new Schema<AnnouncementDocument>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
  },
  { timestamps: true }
);

const AnnouncementModel = model<AnnouncementDocument>(
  "Announcement",
  AnnouncementSchema
);

export default AnnouncementModel;
