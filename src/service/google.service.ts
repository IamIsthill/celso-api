import { google } from "googleapis";
import loadEnv from "../utils/load-env.util";

loadEnv();

const ROOT_FOLDER = process.env.ROOT_FOLDER_ID;
const serviceAccount = JSON.parse(
  Buffer.from(process.env.SERVICE_KEY!, "base64").toString("utf-8")
);

const auth = new google.auth.GoogleAuth({
  credentials: serviceAccount,
  scopes: ["https://www.googleapis.com/auth/drive"],
});

const drive = google.drive({ version: "v3", auth });

interface IFile {
  id: string;
  name: string;
  mimeType: string;
  webContentLink: string;
  webViewLink: string;
  iconLink: string;
}
interface IListFilesResult {
  parentMetaData: IFile;
  files: IFile[];
}

async function listFiles(
  folder: string = ROOT_FOLDER!
): Promise<IListFilesResult> {
  const [parentMetaData, res] = await Promise.all([
    drive.files.get({
      fileId: folder,
      fields: "id, name, mimeType, webViewLink, webContentLink, iconLink",
    }),
    drive.files.list({
      q: `'${folder}' in parents and trashed = false`,
      fields:
        "files(id, name, mimeType, webViewLink, webContentLink, iconLink)",
    }),
  ]);

  return {
    parentMetaData: parentMetaData.data as IFile,
    files: res.data.files as IFile[],
  };
}

export default {
  listFiles,
};
