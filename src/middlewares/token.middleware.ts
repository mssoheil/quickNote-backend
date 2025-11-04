import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
// Configs
import { envLoader } from "@root/configs";

export function verifyToken(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const token = request.cookies.access_token;
  if (!token) {
    response.status(401).json({ msg: "No token provided" });
    return;
  }

  try {
    const decoded = jwt.verify(token, envLoader.JWT_SECRET);
    (request as Request & { user: any }).user = decoded;
    next();
  } catch (err) {
    response.status(401).json({ msg: "Invalid token" });
    return;
  }
}
