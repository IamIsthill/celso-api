import {
  createAnnouncementUseCases,
  IAnnouncementUseCases,
} from "./announcement-use-cases.composition";
import {
  createFileUseCases,
  IFileUseCases,
} from "./file-use-cases.composition";
import { createUserUseCases, IUserUseCase } from "./user-use-cases.composition";

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
