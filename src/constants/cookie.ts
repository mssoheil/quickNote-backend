import { envLoader } from "@root/configs";
// Types
import type { CookieOptions } from "express";

export const cookieOptions: CookieOptions = {
  maxAge: envLoader.COOKIE_MAX_AGE,
  httpOnly: true,
  secure: true,
  sameSite: "strict",
};

export const cookieLongOptions: CookieOptions = {
  maxAge: envLoader.COOKIE_LONG_MAX_AGE,
  httpOnly: true,
  secure: true,
  sameSite: "strict",
};
