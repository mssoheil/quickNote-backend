import { User } from "@root/types/auth.type";
import { Request, Response } from "express";

export const whoAmIController = (
  request: Request & { user: User },
  response: Response
) => {
  const user = request.user;
};
