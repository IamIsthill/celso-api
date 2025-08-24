import { Announcement } from "../../domain/entities";

export interface IAnnouncementRepository {
  getAll(): Promise<Announcement[]>;
  findById(id: string): Promise<Announcement | null>;
  save(announcement: Announcement): Promise<Announcement>;
  delete(id: string): Promise<Announcement>;
}
