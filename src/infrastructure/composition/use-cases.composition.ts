import { createFileUseCases, IFileUseCases } from "./FileUseCasesFactory";
import { createUserUseCases, IUserUseCase } from "./UserCasesFactory";

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
