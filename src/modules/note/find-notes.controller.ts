import { Request, Response } from "express";
// Utils
import { hasMorePages } from "@root/utils/has-more-pages.util";
// Repositories
import { countNotes, findManyNotes } from "@root/repository/note.repository";

export const findNotesController = async (
  request: Request,
  response: Response
) => {
  const userId = response.locals.userId as string;

  const page = Number(request.query.page ?? 1);
  const limit = Number(request.query.limit ?? 10);
  const skip = (page - 1) * limit;

  const notes = await findManyNotes(skip, limit, {
    userId,
  });

  const total = await countNotes({ userId });
  const hasMore = hasMorePages(page, limit, total);

  response.json({
    payload: {
      list: notes,
      page,
      limit,
      hasMore,
      total,
    },
  });
};
