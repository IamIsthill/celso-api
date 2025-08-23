import {
  CreateAnnoucement,
  FetchAnnouncements,
} from "../services/announcement";

export interface IAnnouncementUseCases {
  fetchAnnouncements: FetchAnnouncements;
  create: CreateAnnoucement;
}
