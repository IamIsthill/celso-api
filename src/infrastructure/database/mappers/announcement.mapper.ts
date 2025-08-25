import { Announcement } from "../../../domain/entities";
import { AnnouncementDocument } from "../schemas/announcement-schema";

export class AnnouncementMapper {
  static toDomain(doc: AnnouncementDocument): Announcement {
    return Announcement.fromPersistence({
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
      id: doc.id ? doc.id : doc._id,
      title: doc.title,
      description: doc.description,
    });
  }

  static toPersistence(entity: Announcement): Partial<AnnouncementDocument> {
    return {
      id: entity.id ?? undefined,
      title: entity.title,
      description: entity.description,
    };
  }
}
