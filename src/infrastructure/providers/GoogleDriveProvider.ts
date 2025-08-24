import { google } from "googleapis";
import { IFileProvider } from "../../application/services/ListFiles";
import { File, Folder } from "../../domain/entities/file.entity";
import { ENV } from "../../shared/utils/load-env.util";

const ROOT_FOLDER = ENV.ROOT_FOLDER_ID;
const serviceAccount = JSON.parse(
  Buffer.from(ENV.SERVICE_KEY!, "base64").toString("utf-8")
);
const auth = new google.auth.GoogleAuth({
  credentials: serviceAccount,
  scopes: ["https://www.googleapis.com/auth/drive"],
});
const drive = google.drive({ version: "v3", auth });

export class GoogleDriveProvider implements IFileProvider {
  async listFiles(
    folderId?: string
  ): Promise<{ parentMetaData: Folder; files: File[] }> {
    const folder = folderId ? folderId : ROOT_FOLDER!;
    const [parentMetaData, res] = await Promise.all([
      drive.files.get({
        fileId: folder,
        fields:
          "id, name, mimeType, webViewLink, webContentLink, iconLink, description, size",
      }),
      drive.files.list({
        q: `'${folder}' in parents and trashed = false`,
        fields:
          "files(id, name, mimeType, webViewLink, webContentLink, iconLink, description, size)",
      }),
    ]);
    return {
      parentMetaData: parentMetaData.data as Folder,
      files: res.data.files as File[],
    };
  }
}
