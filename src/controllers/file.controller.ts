import { Request, Response, NextFunction } from "express";
import googleService from "../service/google.service";
import { TypedQuery } from "zodware";
import { getAllFilesValidator } from "../validators/file.validator";

export async function getAllFiles(
  req: TypedQuery<typeof getAllFilesValidator>,
  res: Response,
  next: NextFunction
) {
  try {
    const files = await googleService.listFiles(req.query.folderId);
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
    res.status(200).json(sortFiles);
  } catch (error) {
    next(error);
  }
}
