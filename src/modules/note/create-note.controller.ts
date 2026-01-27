import { Request, Response } from "express";
// DTOs
import { CreateNoteRequestDto } from "@root/modules/note/dto/create-note-request.dto";
// Repositories
import { createNote } from "@root/repository/note.repository";

export const createNoteController = async (
  request: Request,
  response: Response
) => {
  const body: CreateNoteRequestDto = request.body ?? {};
  const userId = response.locals.userId;

  const note = await createNote({
    title: body.title,
    content: body.content,
    user: {
      connect: { id: userId },
    },
  });

  response.json({ message: "noteCreated", id: note.id });
};
