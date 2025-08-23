import {
  createFileUseCases,
  IFileUseCases,
} from "./file-use-cases.composition";
import { createUserUseCases, IUserUseCase } from "./user-use-cases.composition";

export interface IUseCase {
  files: IFileUseCases;
  auth: IUserUseCase;
}

export function createUseCases(): IUseCase {
  return {
    files: createFileUseCases(),
    auth: createUserUseCases(),
  };
}
