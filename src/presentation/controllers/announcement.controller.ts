import { Response, NextFunction } from "express";
import { STATUS } from "../../shared/utils/status";
import { TypedBody, TypedParams, TypedQuery } from "zodware";
import {
  announcementIdValidator,
  getAllAnnouncementValidator,
  postAnnouncement,
  updateAnnouncementValidator,
} from "../validators/announcement.validator";
import { AnnouncementService } from "../../application/services";

export default class AnnouncementController {
  constructor(private announcementService: AnnouncementService) {}
  async getAll(
    req: TypedQuery<typeof getAllAnnouncementValidator>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const announcements = await this.announcementService.getAll(req.query);
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
      const announcement = await this.announcementService.create(req.body);
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
      const announcement = await this.announcementService.getById(
        req.params.announcementId
      );
      res.status(STATUS.OK).json(announcement);
    } catch (error) {
      next(error);
    }
  }

  async delete(
    req: TypedParams<typeof announcementIdValidator>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const announcement = await this.announcementService.delete(
        req.params.announcementId
      );
      res.status(STATUS.OK).json(announcement);
    } catch (error) {
      next(error);
    }
  }

  async update(
    req: TypedParams<typeof announcementIdValidator> &
      TypedBody<typeof updateAnnouncementValidator>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const announcement = await this.announcementService.update(
        req.params.announcementId,
        req.body
      );
      res.status(STATUS.OK).json(announcement);
    } catch (error) {
      next(error);
    }
  }
}
