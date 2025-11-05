import { prisma } from "@root/configs";
import { randomUUID } from "node:crypto";
import { User } from "@root/types/auth.type";
import { createUserSelector } from "./selectors/auth.selector";
// DTOs
import { RegisterUserRequestDto } from "@root/modules/auth/dto/register-user-request.dto";

export async function createUser(user: RegisterUserRequestDto) {
  return prisma.user.create({
    data: {
      id: randomUUID(),
      email: user.email,
      password: user.password!,
    },
    select: createUserSelector,
  });
}

export async function findOneUser(user: Partial<User>) {
  return prisma.user.findFirst({
    where: user,
  });
}
