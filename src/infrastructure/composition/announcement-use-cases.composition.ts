import { FetchAnnouncements } from "../../application/services/announcement";
import { AnnouncementRepository } from "../database/repositories/announcement-repository";

export interface IAnnouncementUseCases {
  fetchAnnouncements: FetchAnnouncements;
}

export function createAnnouncementUseCases(): IAnnouncementUseCases {
  const repo = new AnnouncementRepository();
  return {
    fetchAnnouncements: new FetchAnnouncements(repo),
  };
}
