import { Announcement } from "../../domain/entities";
import { AnnouncementNotFoundError } from "../../shared/utils/errors";
import { IAnnouncementRepository } from "../ports";

export class AnnouncementService {
  constructor(private repo: IAnnouncementRepository) {}

  async create(data: Pick<Announcement, "title" | "description">) {
    const announcement = Announcement.create(data);
    return await this.repo.save(announcement);
  }

  async delete(id: string) {
    const announcement = await this.repo.delete(id);
    if (!announcement) throw new AnnouncementNotFoundError();
    return announcement;
  }

  async getAll() {
    return await this.repo.getAll();
  }

  async getById(id: string) {
    return await this.repo.findById(id);
  }
}
