import jwt from "jsonwebtoken";
import { envLoader } from "@root/configs";

export function generateToken(payload: object): string {
  return jwt.sign(payload, envLoader.JWT_SECRET, {
    expiresIn: "1h",
  });
}

export function generateRefreshToken(payload: object): string {
  return jwt.sign(payload, envLoader.JWT_REFRESH_SECRET, {
    expiresIn: "7d",
  });
}

export function verifyToken(token: string) {
  return jwt.verify(token, envLoader.JWT_SECRET);
}

export function verifyRefreshToken(token: string) {
  return jwt.verify(token, envLoader.JWT_REFRESH_SECRET);
}
