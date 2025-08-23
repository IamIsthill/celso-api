import { createAnnouncementUseCases } from "./announcement-use-cases.composition";
import { createFileUseCases } from "./file-use-cases.composition";
import { createUserUseCases } from "./user-use-cases.composition";
import {
  IUserUseCase,
  IFileUseCases,
  IAnnouncementUseCases,
} from "../../application/usecases";

export interface IUseCase {
  files: IFileUseCases;
  auth: IUserUseCase;
  announcements: IAnnouncementUseCases;
}

export function createUseCases(): IUseCase {
  return {
    files: createFileUseCases(),
    auth: createUserUseCases(),
    announcements: createAnnouncementUseCases(),
  };
}
