import { Announcement } from "../../domain/entities";
import { IAnnouncementRepository } from "../ports";

export class AnnouncementService {
  constructor(private repo: IAnnouncementRepository) {}

  async create(data: Pick<Announcement, "title" | "description">) {
    const announcement = Announcement.create(data);
    return await this.repo.save(announcement);
  }

  async delete(id: string) {
    return await this.repo.delete(id);
  }

  async getAll() {
    return await this.repo.getAll();
  }

  async getById(id: string) {
    return await this.repo.findById(id);
  }
}
