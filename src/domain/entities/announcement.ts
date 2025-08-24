import {
  CreateAnnouncementProps,
  UpdateAnnouncementProps,
  type AnnouncementPersistenceProps,
} from "../types";

export class Announcement {
  constructor(
    public readonly id: string | null, // null until persisted
    public title: string,
    public description: string,
    public readonly createdAt: Date,
    public readonly updatedAt: Date
  ) {}

  static create(props: CreateAnnouncementProps) {
    const now = new Date();
    return new Announcement(null, props.title, props.description, now, now);
  }

  static fromPersistence(props: AnnouncementPersistenceProps) {
    return new Announcement(
      props.id,
      props.title,
      props.description,
      props.createdAt,
      props.updatedAt
    );
  }

  update(props: UpdateAnnouncementProps) {
    return new Announcement(
      this.id,
      props.title ?? this.title,
      props.description ?? this.description,
      this.createdAt,
      new Date()
    );
  }
}
