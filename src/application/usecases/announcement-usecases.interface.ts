import {
  CreateAnnoucement,
  FetchAnnouncements,
  GetAnnouncementById,
} from "../services/announcement";

export interface IAnnouncementUseCases {
  fetchAnnouncements: FetchAnnouncements;
  create: CreateAnnoucement;
  getById: GetAnnouncementById;
}
