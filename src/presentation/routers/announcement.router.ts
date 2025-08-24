import { Router } from "express";
import AnnouncementController from "../controllers/announcement.controller";
import validateRequest from "zodware";
import {
  announcementIdValidator,
  postAnnouncement,
} from "../validators/announcement.validator";
import { AnnouncementService } from "../../application/services";

export default class AnnouncementRouter {
  public readonly router: Router;

  constructor(private useCases: AnnouncementService) {
    this.router = Router();
    const controller = new AnnouncementController(this.useCases);

    this.router.get("/", controller.getAll.bind(controller));
    this.router.post(
      "/",
      validateRequest({ body: postAnnouncement }),
      controller.create.bind(controller)
    );
    this.router.get(
      "/:announcementId",
      validateRequest({ params: announcementIdValidator }),
      controller.getById.bind(controller)
    );
    this.router.delete(
      "/:announcementId",
      validateRequest({ params: announcementIdValidator }),
      controller.delete.bind(controller)
    );
  }
}
