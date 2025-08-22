import { Response, NextFunction } from "express";
import { TypedQuery } from "zodware";
import { getAllFilesValidator } from "../validators/file.validator";
import { ListFiles } from "../../application/services";

export function getAllFiles(listFilesUseCase: ListFiles) {
  return async (
    req: TypedQuery<typeof getAllFilesValidator>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const result = await listFilesUseCase.execute(req.query.folderId);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  };
}

export default {
  getAllFiles,
};
