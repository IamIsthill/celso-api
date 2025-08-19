import { Router } from "express";
import validateRequest from "zodware";
import { getAllFilesValidator } from "../validators/file.validator";
import { getAllFiles } from "../controllers/file.controller";

const fileRouter = Router();

fileRouter.get(
  "/",
  validateRequest({ query: getAllFilesValidator }),
  getAllFiles
);

export default fileRouter;
