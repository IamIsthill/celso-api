import { File } from "../../domain/entities/File";

export interface IFileProvider {
  listFiles(
    folderId?: string
  ): Promise<{ parentMetaData: File; files: File[] }>;
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
