import { Router } from "express";
// Middlewares
import { verifyToken } from "@root/middlewares/token.middleware";
import { validateBody } from "@root/middlewares/validate-body.middleware";
// Controllers
import { loginController } from "./login.controller";
import { registerController } from "./register.controller";
import { whoAmIController } from "@root/modules/auth/who-am-i.controller";
// DTOs
import { LoginRequestDto } from "./dto/login-request.dto";
import { RegisterUserRequestDto } from "./dto/register-user-request.dto";

const router = Router();

/**
 * @openapi
 * components:
 *   schemas:
 *     RegisterUserRequestDto:
 *       type: object
 *       required: [email, password]
 *       properties:
 *         email:
 *           example: user@example.com
 *         password:
 *           example: "password"
 *
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegisterUserRequestDto'
 *     responses:
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             examples:
 *               BadRequest:
 *                 value:
 *                   statusCode: 400
 *                   path: "/auth/register"
 *                   message: "Invalid payload"
 */
router.post(
  "/register",
  validateBody(RegisterUserRequestDto),
  registerController
);

/**
 * @openapi
 * components:
 *   schemas:
 *     LoginRequestDto:
 *       type: object
 *       required: [email, password]
 *       properties:
 *         email:
 *           example: user@example.com
 *         password:
 *           example: "password"
 *
 * /auth/login:
 *   post:
 *     summary: Login a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginRequestDto'
 *     responses:
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             examples:
 *               BadRequest:
 *                 value:
 *                   statusCode: 400
 *                   path: "/auth/login"
 *                   message: "Invalid payload"
 */
router.post("/login", validateBody(LoginRequestDto), loginController);

router.get("/who-am-i", verifyToken, whoAmIController);

export default router;
