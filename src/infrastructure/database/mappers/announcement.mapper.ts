import { Announcement } from "../../../domain/entities";
import { AnnouncementDocument } from "../schemas/announcement-schema";

export class AnnouncementMapper {
  static toDomain(doc: AnnouncementDocument): Announcement {
    return {
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
      id: doc.id,
      title: doc.title,
      description: doc.description,
    };
  }

  static toPersistence(entity: Announcement): Partial<AnnouncementDocument> {
    return {
      title: entity.title,
      description: entity.description,
    };
  }
}
