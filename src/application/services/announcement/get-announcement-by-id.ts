import { IAnnouncementRepository } from "../../ports";

export class GetAnnouncementById {
  constructor(private repo: IAnnouncementRepository) {}

  async execute(id: string) {
    return await this.repo.findById(id);
  }
}
