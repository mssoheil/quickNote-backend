import { Router } from "express";
// Middlewares
import { verifyToken } from "@root/middlewares/token.middleware";
// Controllers
import { createNoteController } from "@root/modules/note/create-note.controller";
import { findNotesController } from "@root/modules/note/find-notes.controller";
import { updateNoteController } from "@root/modules/note/update-note.controller";
import { removeNoteController } from "@root/modules/note/remove-note.controller";

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
 *           type: string
 *           example: "My Note"
 *         content:
 *           type: string
 *           example: "This is the content of my note."
 *
 *     UpdateNoteRequestDto:
 *       type: object
 *       required: [title, content]
 *       properties:
 *         title:
 *           type: string
 *           example: "Updated title"
 *         content:
 *           type: string
 *           example: "Updated content"
 *
 *     NoteDto:
 *       type: object
 *       required: [id, title, content, createdAt, updatedAt]
 *       properties:
 *         id:
 *           type: string
 *           example: "b7b2c2d5-1d9c-4a1b-9c0f-9b4f1b2e3c4d"
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
 *       required: [list, page, limit, hasMore, total]
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
 *
 *     NotesListResponseDto:
 *       type: object
 *       required: [payload]
 *       properties:
 *         payload:
 *           $ref: '#/components/schemas/NotesListPayloadDto'
 *
 * /note:
 *   post:
 *     summary: Create a new note
 *     operationId: createNote
 *     tags: [Note]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateNoteRequestDto'
 *     responses:
 *       200:
 *         description: Created note
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/NoteDto'
 *       401:
 *         description: Unauthorized
 *
 *   get:
 *     summary: List notes (paginated)
 *     operationId: listNotes
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
 *       401:
 *         description: Unauthorized
 *
 * /note/{id}:
 *   put:
 *     summary: Update a note
 *     operationId: updateNote
 *     tags: [Note]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Note ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateNoteRequestDto'
 *     responses:
 *       200:
 *         description: Updated note
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/NoteDto'
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Note not found
 *
 *   delete:
 *     summary: Delete a note
 *     operationId: deleteNote
 *     tags: [Note]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Note ID
 *     responses:
 *       204:
 *         description: Deleted successfully (no content)
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Note not found
 */
router.post("", verifyToken, createNoteController);
router.get("", verifyToken, findNotesController);
router.put("/:id", verifyToken, updateNoteController);
router.delete("/:id", verifyToken, removeNoteController);

export default router;
