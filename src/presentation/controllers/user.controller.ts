import { Response, NextFunction } from "express";
import { TypedBody } from "zodware";
import { LoginUser, RegisterUser } from "../../application/services/user";
import { postLoginUser, postRegisterUser } from "../validators/user.validator";
import { STATUS } from "../../shared/utils/status";
import { ENV } from "../../shared/utils/load-env.util";

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

export function loginUserController(loginUserUserCase: LoginUser) {
  return async (
    req: TypedBody<typeof postLoginUser>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const token = await loginUserUserCase.execute(req.body);
      res
        .cookie("token", token, {
          httpOnly: true,
          secure: ENV.PRODUCTION,
          sameSite: "strict",
          maxAge: 1000 * 60 * 60 * 24, // 1 day
        })
        .status(STATUS.OK)
        .json({ token });
    } catch (error) {
      next(error);
    }
  };
}
