import {
  CreateAnnoucement,
  FetchAnnouncements,
  GetAnnouncementById,
} from "../../application/services/announcement";
import { AnnouncementRepository } from "../database/repositories/announcement-repository";
import { IAnnouncementUseCases } from "../../application/usecases";

export function createAnnouncementUseCases(): IAnnouncementUseCases {
  const repo = new AnnouncementRepository();
  return {
    fetchAnnouncements: new FetchAnnouncements(repo),
    create: new CreateAnnoucement(repo),
    getById: new GetAnnouncementById(repo),
  };
}
