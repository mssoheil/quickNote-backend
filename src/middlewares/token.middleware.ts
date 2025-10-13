import { NextFunction, Request, Response } from "express";
import { envLoader } from "@root/configs";
import jwt from "jsonwebtoken";

export function getTokenFromRequest(request: Request) {
  const token = request.headers.authorization;
  if (!token || !token.startsWith("Bearer ")) return null;
  return token.split(" ")[1];
}

export function verifyToken(req: Request, res: Response, next: NextFunction) {
  const token = getTokenFromRequest(req);
  if (!token) return res.status(401).json({ msg: "No token provided" });

  try {
    const decoded = jwt.verify(token, envLoader.JWT_SECRET);
    (req as Request & { user: any }).user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ msg: "Invalid token" });
  }
}
