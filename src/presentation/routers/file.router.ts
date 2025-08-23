import { Router } from "express";
import validateRequest from "zodware";
import { getAllFilesValidator } from "../validators/file.validator";
import { getAllFiles } from "../controllers/file.controller";
import { IFileUseCases } from "../../infrastructure/composition";

export default function fileRouter(filesUseCases: IFileUseCases) {
  const router = Router();
  router.get(
    "/",
    validateRequest({ query: getAllFilesValidator }),
    getAllFiles(filesUseCases.listFiles)
  );

  return router;
}
