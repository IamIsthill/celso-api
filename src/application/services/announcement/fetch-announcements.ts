import { IAnnouncementRepository } from "../../ports";

export class FetchAnnouncements {
  constructor(private repo: IAnnouncementRepository) {}
  async execute() {
    return await this.repo.getAll();
  }
}
