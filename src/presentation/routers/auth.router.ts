import { Router } from "express";
import validateRequest from "zodware";
import { IUserUseCase } from "../../application/services/user";
import { postRegisterUser } from "../validators/user.validator";
import { registerUserController } from "../controllers/user.controller";

export default function authRouter(authUseCase: IUserUseCase) {
  const router = Router();

  router.post(
    "/register",
    validateRequest({ body: postRegisterUser }),
    registerUserController(authUseCase.register)
  );

  return router;
}
