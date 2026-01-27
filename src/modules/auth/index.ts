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
 *   securitySchemes:
 *     cookieAuth:
 *       type: apiKey
 *       in: cookie
 *       name: access_token
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

/**
 * @openapi
 * components:
 *   schemas:
 *     RegisterUserRequestDto:
 *       type: object
 *       required: [email, password]
 *       properties:
 *         email:
 *           type: string
 *           example: "user@example.com"
 *         password:
 *           type: string
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
 *       201:
 *         description: User registered
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
 *           type: string
 *           example: "user@example.com"
 *         password:
 *           type: string
 *           example: "password"
 *
 * /auth/login:
 *   post:
 *     summary: Login user (sets access_token cookie)
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginRequestDto'
 *     responses:
 *       200:
 *         description: Logged in (cookie set)
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
 *   schemas:
 *     MeResponseDto:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: "my id"
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
 *       - cookieAuth: []
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
 *                   id: "my id"
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
