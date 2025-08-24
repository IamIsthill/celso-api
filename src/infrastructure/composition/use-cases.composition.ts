import { createFileUseCases } from "./file-use-cases.composition";
import { createUserUseCases } from "./user-use-cases.composition";
import { IUserUseCase, IFileUseCases } from "../../application/usecases";
import { AnnouncementService } from "../../application/services";
import { AnnouncementRepository } from "../database/repositories/announcement-repository";

export interface IUseCase {
  files: IFileUseCases;
  auth: IUserUseCase;
  announcements: AnnouncementService;
}

export function createUseCases() {
  const announcementRepo = new AnnouncementRepository();
  return {
    files: createFileUseCases(),
    auth: createUserUseCases(),
    announcements: new AnnouncementService(announcementRepo),
  };
}
