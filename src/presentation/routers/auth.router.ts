import { Router } from "express";
import validateRequest from "zodware";
import { IUserUseCase } from "../../infrastructure/composition";
import { postLoginUser, postRegisterUser } from "../validators/user.validator";
import {
  registerUserController,
  loginUserController,
} from "../controllers/user.controller";
import { FEATURE_FLAGS } from "../../shared/utils/load-env.util";

export default function authRouter(authUseCase: IUserUseCase) {
  const router = Router();

  if (FEATURE_FLAGS.ENABLE_AUTH_REGISTER) {
    router.post(
      "/register",
      validateRequest({ body: postRegisterUser }),
      registerUserController(authUseCase.register)
    );
  }

  router.post(
    "/login",
    validateRequest({ body: postLoginUser }),
    loginUserController(authUseCase.login)
  );

  return router;
}
