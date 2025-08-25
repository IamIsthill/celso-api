import { IAnnouncementRepository } from "../../../application/ports";
import { Announcement } from "../../../domain/entities";
import AnnouncementModel, {
  AnnouncementDocument,
} from "../schemas/announcement-schema";
import { AnnouncementMapper } from "../mappers/announcement.mapper";
import { AnnouncementNotFoundError } from "../../../shared/utils/errors";
import { RootFilterQuery } from "mongoose";
import { GetAllPayload } from "../../../application/ports/announcement-service.port";

export class AnnouncementRepository implements IAnnouncementRepository {
  async findById(id: string): Promise<Announcement | null> {
    const announcement = await AnnouncementModel.findById(id).lean();
    if (announcement) return AnnouncementMapper.toDomain(announcement);
    return null;
  }

  async getAll(query: GetAllPayload): Promise<Announcement[]> {
    let filter: RootFilterQuery<AnnouncementDocument> = {};
    if (query.q) {
      filter.title = { $regex: query.q, $options: "i" };
    }
    const announcements = await AnnouncementModel.find(filter);
    return announcements.map((announcement) =>
      AnnouncementMapper.toDomain(announcement)
    );
  }

  async save(announcement: Announcement): Promise<Announcement> {
    if (announcement.id) {
      const updated = await AnnouncementModel.findByIdAndUpdate(
        announcement.id,
        AnnouncementMapper.toPersistence(announcement),
        { new: true }
      ).lean();
      if (!updated) throw new AnnouncementNotFoundError();
      return AnnouncementMapper.toDomain(updated);
    } else {
      const created = await AnnouncementModel.create(
        AnnouncementMapper.toPersistence(announcement)
      );
      return AnnouncementMapper.toDomain(created);
    }
  }

  async delete(id: string): Promise<Announcement | null> {
    const announcement = await AnnouncementModel.findByIdAndDelete(id).lean();
    if (!announcement) return null;
    return AnnouncementMapper.toDomain(announcement);
  }
}
