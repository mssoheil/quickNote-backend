import { Router } from "express";
import { registerController } from "./register";
import { validateBody } from "@root/middlewares/validate-body.middleware";
import { RegisterUserRequestDto } from "./dto/register-user-request.dto";
import { loginController } from "./login";
import { LoginRequestDto } from "./dto/login-request.dto";

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

export default router;
