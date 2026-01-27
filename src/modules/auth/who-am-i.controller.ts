import { findOneUser } from "@root/repository/auth.repository";
import { RequestHandler } from "express";
// Types
import type { ParamsDictionary } from "express-serve-static-core";
import type { ParsedQs } from "qs";

type AuthLocals = {
  userId: string;
};

export const getWhoAmIController: RequestHandler<
  ParamsDictionary,
  any,
  any,
  ParsedQs,
  AuthLocals
> = async (_req, res) => {
  const userId = res.locals.userId;

  const user = await findOneUser({
    id: userId,
  });

  res.send({
    payload: {
      id: user?.id,
      email: user?.email,
      createdAt: user?.createdAt,
      updatedAt: user?.updatedAt,
    },
  });
};
