import { IAnnouncementUseCases } from "../../infrastructure/composition";
import { Request, Response, NextFunction } from "express";
import { STATUS } from "../../shared/utils/status";

export default class AnnouncementController {
  constructor(private useCases: IAnnouncementUseCases) {}
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const announcements = await this.useCases.fetchAnnouncements.execute();
      res.status(STATUS.OK).json(announcements);
    } catch (error) {
      next(error);
    }
  }
}
