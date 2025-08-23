import { IAnnouncementUseCases } from "../../application/usecases";
import { Request, Response, NextFunction } from "express";
import { STATUS } from "../../shared/utils/status";
import { TypedBody } from "zodware";
import { postAnnouncement } from "../validators/announcement.validator";

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

  async create(
    req: TypedBody<typeof postAnnouncement>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const announcement = await this.useCases.create.execute(req.body);
      res.status(STATUS.CREATED).json(announcement);
    } catch (error) {
      next(error);
    }
  }
}
