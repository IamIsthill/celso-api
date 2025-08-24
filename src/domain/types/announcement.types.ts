export interface CreateAnnouncementProps {
  title: string;
  description: string;
}

export interface UpdateAnnouncementProps {
  title?: string;
  description?: string;
}

export type AnnouncementPersistenceProps = {
  id: string;
  title: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
};
