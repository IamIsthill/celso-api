import { Announcement } from "../../domain/entities";
import { UpdateAnnouncementProps } from "../../domain/types";
import { AnnouncementNotFoundError } from "../../shared/utils/errors";
import { IAnnouncementRepository } from "../ports";
import { GetAllPayload } from "../ports/announcement-service.port";

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

  async getAll(query: GetAllPayload) {
    return await this.repo.getAll(query);
  }

  async getById(id: string) {
    return await this.repo.findById(id);
  }

  async update(id: string, payload: UpdateAnnouncementProps) {
    const announcement = await this.repo.findById(id);
    if (!announcement) throw new AnnouncementNotFoundError();
    const updatedAnnouncement = announcement.update(payload);
    return await this.repo.save(updatedAnnouncement);
  }
}
