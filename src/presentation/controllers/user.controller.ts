import { Response, NextFunction, Request } from "express";
import { TypedBody } from "zodware";
import { RegisterUser } from "../../application/services/user";
import { postRegisterUser } from "../validators/user.validator";
import { STATUS } from "../../shared/utils/status";

export function registerUserController(registerUserUseCase: RegisterUser) {
  return async (
    req: TypedBody<typeof postRegisterUser>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const user = await registerUserUseCase.execute(req.body);
      res.status(STATUS.CREATED).json(user);
      return;
    } catch (error) {
      next(error);
    }
  };
}
