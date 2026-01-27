import { Router } from "express";
// Middlewares
import { verifyToken } from "@root/middlewares/token.middleware";
import { validateBody } from "@root/middlewares/validate-body.middleware";
// Controllers
// DTOs
import { createNoteController } from "@root/modules/note/create-note.controller";
import { findNotesController } from "@root/modules/note/find-notes.controller";

const router = Router();

/**
 * @openapi
 * components:
 *   schemas:
 *     CreateNoteRequestDto:
 *       type: object
 *       required: [title, content]
 *       properties:
 *         title:
 *           example: "My Note"
 *         content:
 *           example: "This is the content of my note."
 *
 * /note:
 *   post:
 *     summary: Create a new note
 *     tags: [Note]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateNoteRequestDto'
 *     responses:
 *       200:
 *         description: Current note
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MeResponseDto'
 *             examples:
 *               Ok:
 *                 value:
 *                   id: "my id"
 *                   title: "my title"
 *                   content: "my content"
 *                   createdAt: "2026-01-27T06:30:00.000Z"
 *                   updatedAt: "2026-01-27T06:30:00.000Z"
 */
router.post("", verifyToken, createNoteController);

/**
 * @openapi
 * components:
 *   schemas:
 *     NoteDto:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: "uuid"
 *         title:
 *           type: string
 *           example: "My Note"
 *         content:
 *           type: string
 *           example: "# Hello"
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: "2026-01-27T06:30:00.000Z"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: "2026-01-27T06:30:00.000Z"
 *
 *     NotesListPayloadDto:
 *       type: object
 *       properties:
 *         list:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/NoteDto'
 *         page:
 *           type: integer
 *           example: 1
 *         limit:
 *           type: integer
 *           example: 10
 *         hasMore:
 *           type: boolean
 *           example: true
 *         total:
 *           type: integer
 *           example: 42
 *       required: [list, page, limit, hasMore, total]
 *
 *     NotesListResponseDto:
 *       type: object
 *       properties:
 *         payload:
 *           $ref: '#/components/schemas/NotesListPayloadDto'
 *       required: [payload]
 *
 * /note:
 *   get:
 *     summary: List notes (paginated)
 *     tags: [Note]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Page number (1-based)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 50
 *           default: 10
 *         description: Page size
 *     responses:
 *       200:
 *         description: Paginated notes
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/NotesListResponseDto'
 *             examples:
 *               Ok:
 *                 value:
 *                   payload:
 *                     list:
 *                       - id: "b7b2c2d5-1d9c-4a1b-9c0f-9b4f1b2e3c4d"
 *                         title: "My Note"
 *                         content: "# Hello"
 *                         createdAt: "2026-01-27T06:30:00.000Z"
 *                         updatedAt: "2026-01-27T06:30:00.000Z"
 *                     page: 1
 *                     limit: 10
 *                     hasMore: true
 *                     total: 42
 *       401:
 *         description: Unauthorized
 */
router.get("", verifyToken, findNotesController);
router.get("", verifyToken, findNotesController);

export default router;
