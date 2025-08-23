import { ListFiles } from "../../application/services";
import { GoogleDriveProvider } from "../providers";
import { IFileUseCases } from "../../application/usecases";

export function createFileUseCases(): IFileUseCases {
  const provider = new GoogleDriveProvider();

  return {
    listFiles: new ListFiles(provider),
  };
}
