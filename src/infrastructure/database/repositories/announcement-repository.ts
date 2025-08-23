import { IAnnouncementRepository } from "../../../application/ports";
import { Announcement } from "../../../domain/entities";
import AnnouncementModel from "../schemas/announcement-schema";
import { AnnouncementMapper } from "../mappers/announcement.mapper";
import { AnnouncementNotFoundError } from "../../../shared/utils/errors";

export class AnnouncementRepository implements IAnnouncementRepository {
  async findById(id: string): Promise<Announcement | null> {
    const announcement = await AnnouncementModel.findById(id).lean();
    if (announcement) return AnnouncementMapper.toDomain(announcement);
    return null;
  }

  async getAll(): Promise<Announcement[]> {
    const announcements = await AnnouncementModel.find();
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
}
