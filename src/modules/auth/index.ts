import { Router } from "express";
import { registerController } from "./register";
import { validateBody } from "@root/middlewares/validate-body.middleware";
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

export default router;
