import { Router } from "express";
import AnnouncementController from "../controllers/announcement.controller";
import { IAnnouncementUseCases } from "../../application/usecases";
import validateRequest from "zodware";
import { postAnnouncement } from "../validators/announcement.validator";

export default class AnnouncementRouter {
  public readonly router: Router;

  constructor(private useCases: IAnnouncementUseCases) {
    this.router = Router();
    const controller = new AnnouncementController(this.useCases);

    this.router.get("/", controller.getAll.bind(controller));
    this.router.post(
      "/",
      validateRequest({ body: postAnnouncement }),
      controller.create.bind(controller)
    );
  }
}
