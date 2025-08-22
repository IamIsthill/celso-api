import { Router } from "express";
import validateRequest from "zodware";
import { getAllFilesValidator } from "../validators/file.validator";
import { getAllFiles } from "../controllers/file.controller";
import { GoogleDriveProvider } from "../../infrastructure/providers";
import { ListFiles } from "../../application/services/ListFiles";

export default function fileRouter(listFilesUseCase: ListFiles) {
  const router = Router();
  router.get(
    "/",
    validateRequest({ query: getAllFilesValidator }),
    getAllFiles(listFilesUseCase)
  );

  return router;
}
