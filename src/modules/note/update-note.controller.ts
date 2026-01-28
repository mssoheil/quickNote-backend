import { Request, Response } from "express";
// Repositories
import { updateNote, findOneNote } from "@root/repository/note.repository";

export const updateNoteController = async (
  request: Request,
  response: Response,
) => {
  const userId = response.locals.userId as string;

  const note = await findOneNote({
    id: request.params.id,
  });

  if (!note) {
    response.status(404).send({ message: "Note not found" });
    return;
  }

  if (note.userId !== userId) {
    response
      .status(403)
      .send({ message: "You do not have permission to update this note" });
    return;
  }

  const updatedNote = await updateNote(request.params.id, {
    title: request.body.title,
    content: request.body.content,
  });

  response.json({ message: "note updated", id: updatedNote.id });
};
