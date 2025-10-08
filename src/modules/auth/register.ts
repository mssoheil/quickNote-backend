import { Request, Response } from "express";

export const registerController = async (req: Request, res: Response) => {
  res.status(200).send(req.body ?? {});
};
