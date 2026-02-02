import { Request, Response } from "express";
// Constants
import { cookieLongOptions, cookieOptions } from "@root/constants/cookie";

export const logoutController = async (_req: Request, res: Response) => {
  res.clearCookie("access_token", { ...cookieOptions });
  res.clearCookie("refresh_token", { ...cookieLongOptions });

  res.status(200).send({ message: "Logged out" });
};
