import jwt, { JwtPayload } from "jsonwebtoken";
// Types
import type { NextFunction, Request, Response } from "express";
// Configs
import { envLoader } from "@root/configs";

export interface AccessTokenPayload extends JwtPayload {
  userId: string;
}

export function verifyToken(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const token = request.cookies?.access_token;

  if (!token) {
    response.status(401).json({ msg: "No token provided" });
    return;
  }

  try {
    const decoded = jwt.verify(
      token,
      envLoader.JWT_SECRET
    ) as AccessTokenPayload;

    response.locals.userId = decoded.id;

    next();
  } catch (err) {
    response.status(401).json({ msg: "Invalid token" });
    return;
  }
}
