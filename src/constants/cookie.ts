import { envLoader } from "@root/configs";

export const cookieOptions = {
  maxAge: envLoader.COOKIE_MAX_AGE,
  httpOnly: true,
};
