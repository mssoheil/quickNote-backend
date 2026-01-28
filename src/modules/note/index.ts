import { Router } from "express";
// Middlewares
import { verifyToken } from "@root/middlewares/token.middleware";
// Controllers
import { createNoteController } from "@root/modules/note/create-note.controller";
import { findNotesController } from "@root/modules/note/find-notes.controller";
import { updateNoteController } from "@root/modules/note/update-note.controller";
import { removeNoteController } from "@root/modules/note/remove-note.controller";
// Middlewares
import { validateBody } from "@root/middlewares/validate-body.middleware";
// DTOs
import { CreateNoteRequestDto } from "@root/modules/note/dto/create-note-request.dto";
import { UpdateNoteRequestDto } from "@root/modules/note/dto/update-note-request.dto";

const router = Router();

router.post(
  "",
  verifyToken,
  validateBody(CreateNoteRequestDto),

  createNoteController,
);
router.get("", verifyToken, findNotesController);
router.put(
  "/:id",
  verifyToken,
  validateBody(UpdateNoteRequestDto),
  updateNoteController,
);
router.delete("/:id", verifyToken, removeNoteController);

export default router;
