import { Router } from "express";
import AnnouncementController from "../controllers/announcement.controller";
import { IAnnouncementUseCases } from "../../infrastructure/composition";

export default class AnnouncementRouter {
  public readonly router: Router;

  constructor(private useCases: IAnnouncementUseCases) {
    this.router = Router();
    const controller = new AnnouncementController(this.useCases);

    this.router.get("/", controller.getAll.bind(controller));
  }
}
