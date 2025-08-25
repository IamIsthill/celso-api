import { Announcement } from "../../domain/entities";
import { GetAllPayload } from "./announcement-service.port";

export interface IAnnouncementRepository {
  getAll(query: GetAllPayload): Promise<Announcement[]>;
  findById(id: string): Promise<Announcement | null>;
  save(announcement: Announcement): Promise<Announcement>;
  delete(id: string): Promise<Announcement | null>;
}
