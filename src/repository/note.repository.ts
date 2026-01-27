import { prisma } from "@root/configs";
// Selectors
import { noteSelector } from "@root/repository/selectors/note.selector";
// Types
import type { Note } from "@root/types/note.type";
import type { Prisma } from "@prisma/client";

export async function findOneNote(note: Partial<Note>) {
  return prisma.note.findFirst({
    where: note,
    select: noteSelector,
  });
}

export async function findManyNotes(
  skip: number,
  take: number,
  note: Partial<Note>
) {
  return prisma.note.findMany({
    where: note,
    skip,
    take,
    select: noteSelector,
    orderBy: { createdAt: "desc" },
  });
}

export async function countNotes(where: Prisma.NoteWhereInput) {
  return prisma.note.count({ where });
}

export async function createNote(data: Prisma.NoteCreateInput) {
  return prisma.note.create({
    data,
    select: noteSelector,
  });
}

export async function updateNote(id: string, note: Partial<Note>) {
  return prisma.note.update({
    where: {
      id,
    },
    data: note,
    select: noteSelector,
  });
}

export async function deleteNote(id: string) {
  return prisma.note.delete({
    where: {
      id,
    },
    select: noteSelector,
  });
}
