export class File {
  constructor(
    public id: string,
    public name: string,
    public mimeType: string,
    public webContentLink: string,
    public webViewLink: string,
    public iconLink: string,
    public size?: string,
    public description?: string
  ) {}
}

export class Folder {
  constructor(
    public id: string,
    public name: string,
    public mimeType: string,
    public webContentLink: string,
    public webViewLink: string,
    public iconLink: string,
    public description?: string
  ) {}
}
