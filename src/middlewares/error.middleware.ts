import { Request, NextFunction, Response } from "express";
import { AppError } from "../utils/errors";
import logger from "../utils/logger.util";

export default (
  error: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  if (error instanceof AppError) {
    res.status(error.status).json({
      name: error.name,
      message: error.message,
    });
  } else {
    logger.error("Unexpected error", error);
    res.status(500).json({
      message: "Something went wrong",
    });
  }
};
