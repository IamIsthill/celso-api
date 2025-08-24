import { File, Folder } from "../../domain/entities";
import { convertToMb } from "./utils/convertToMb";

export interface IFileProvider {
  listFiles(
    folderId?: string
  ): Promise<{ parentMetaData: Folder; files: File[] }>;
}

export class ListFiles {
  constructor(private fileProvider: IFileProvider) {}

  async execute(folderId?: string) {
    const { parentMetaData, files } = await this.fileProvider.listFiles(
      folderId
    );
    const sortFiles = files.map((file) => {
      let type = "file";
      if (file.mimeType.includes("folder")) {
        type = "folder";
      }
      if (file.size) {
        file.size = convertToMb(file.size);
      }
      return {
        ...file,
        type,
      };
    });

    return {
      parentMetaData,
      files: sortFiles,
    };
  }
}
