import { Router } from "express";
// Middlewares
import { verifyToken } from "@root/middlewares/token.middleware";
import { validateBody } from "@root/middlewares/validate-body.middleware";
// Controllers
import { loginController } from "./login.controller";
import { logoutController } from "./logout.controller";
import { registerController } from "./register.controller";
import { getWhoAmIController } from "./who-am-i.controller";
// DTOs
import { LoginRequestDto } from "./dto/login-request.dto";
import { RegisterUserRequestDto } from "./dto/register-user-request.dto";

const router = Router();

router.post(
  "/register",
  validateBody(RegisterUserRequestDto),
  registerController,
);
router.post("/login", validateBody(LoginRequestDto), loginController);
router.get("/me", verifyToken, getWhoAmIController);
router.post("/logout", logoutController);

export default router;
