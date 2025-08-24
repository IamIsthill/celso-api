import { IAnnouncementUseCases } from "../../application/usecases";
import { Request, Response, NextFunction } from "express";
import { STATUS } from "../../shared/utils/status";
import { TypedBody, TypedParams } from "zodware";
import {
  announcementIdValidator,
  postAnnouncement,
} from "../validators/announcement.validator";

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

  async getById(
    req: TypedParams<typeof announcementIdValidator>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const announcement = await this.useCases.getById.execute(
        req.params.announcementId
      );
      res.status(STATUS.OK).json(announcement);
    } catch (error) {
      next(error);
    }
  }
}
