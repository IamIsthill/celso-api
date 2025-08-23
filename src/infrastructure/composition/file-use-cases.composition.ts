import { ListFiles } from "../../application/services";
import { GoogleDriveProvider } from "../providers";

export interface IFileUseCases {
  listFiles: ListFiles;
}

export function createFileUseCases(): IFileUseCases {
  const provider = new GoogleDriveProvider();

  return {
    listFiles: new ListFiles(provider),
  };
}
