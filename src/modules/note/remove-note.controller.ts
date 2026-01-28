import { Request, Response } from "express";
// Repositories
import { deleteNote, findOneNote } from "@root/repository/note.repository";

export const removeNoteController = async (
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

  await deleteNote(request.params.id);

  response.json({ message: "note deleted" });
};
