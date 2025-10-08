import { Router } from "express";
import { registerController } from "./register";
import { validateBody } from "@root/middlewares/validate-body.middleware";
import { RegisterUserRequestDto } from "./dto/register-user-request.dto";

const router = Router();

router.post(
  "/register",
  validateBody(RegisterUserRequestDto),
  registerController
);

export default router;
