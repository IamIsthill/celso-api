import { FetchAnnouncements } from "../../application/services/announcement";
import { AnnouncementRepository } from "../database/repositories/announcement-repository";
import { IAnnouncementUseCases } from "../../application/usecases";

export function createAnnouncementUseCases(): IAnnouncementUseCases {
  const repo = new AnnouncementRepository();
  return {
    fetchAnnouncements: new FetchAnnouncements(repo),
  };
}
