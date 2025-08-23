import { Announcement } from "../../../domain/entities";
import { IAnnouncementRepository } from "../../ports";

export class CreateAnnoucement {
  constructor(private repo: IAnnouncementRepository) {}
  async execute(data: Pick<Announcement, "title" | "description">) {
    const announcement = Announcement.create(data);
    return await this.repo.save(announcement);
  }
}
