export class Announcement {
  constructor(
    public readonly id: string | null, // null until persisted
    public title: string,
    public description: string,
    public readonly createdAt: Date,
    public readonly updatedAt: Date
  ) {}

  static create(props: Omit<Announcement, "id" | "createdAt" | "updatedAt">) {
    const now = new Date();
    return new Announcement(null, props.title, props.description, now, now);
  }
}
