import { Router } from "express";
// Middlewares
import { verifyToken } from "@root/middlewares/token.middleware";
import { validateBody } from "@root/middlewares/validate-body.middleware";
// Controllers
import { loginController } from "./login.controller";
import { registerController } from "./register.controller";
import { getWhoAmIController } from "@root/modules/auth/who-am-i.controller";
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

/**
 * @openapi
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *
 *   schemas:
 *     MeResponseDto:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: "b7b2c2d5-1d9c-4a1b-9c0f-9b4f1b2e3c4d"
 *         email:
 *           type: string
 *           example: "user@example.com"
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: "2026-01-27T06:30:00.000Z"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: "2026-01-27T06:30:00.000Z"
 *       required: [id, email]
 *
 * /auth/me:
 *   get:
 *     summary: Get current authenticated user
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Current user info
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MeResponseDto'
 *             examples:
 *               Ok:
 *                 value:
 *                   id: "b7b2c2d5-1d9c-4a1b-9c0f-9b4f1b2e3c4d"
 *                   email: "user@example.com"
 *                   createdAt: "2026-01-27T06:30:00.000Z"
 *                   updatedAt: "2026-01-27T06:30:00.000Z"
 *       401:
 *         description: Unauthorized (missing/invalid token)
 *         content:
 *           application/json:
 *             examples:
 *               Unauthorized:
 *                 value:
 *                   statusCode: 401
 *                   path: "/auth/me"
 *                   message: "Unauthorized"
 */
router.get("/me", verifyToken, getWhoAmIController);

export default router;
