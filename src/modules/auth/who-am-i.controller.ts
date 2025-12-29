import { User } from "@root/types/auth.type";
import { Request, Response } from "express";

export const getWhoAmIController = (request: Request, response: Response) => {
  response.send({
    payload: {
      id: "hello",
    },
  });
};
