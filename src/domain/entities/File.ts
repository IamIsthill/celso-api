export interface File {
  id: string;
  name: string;
  mimeType: string;
  webContentLink: string;
  webViewLink: string;
  iconLink: string;
  size?: string;
  description?: string;
}

export interface Folder {
  id: string;
  name: string;
  description?: string;
  mimeType: string;
  webContentLink: string;
  webViewLink: string;
  iconLink: string;
}
