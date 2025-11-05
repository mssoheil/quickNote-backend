import { get } from "env-var";
import { config } from "dotenv";
// Types
import type { EnvLoader } from "@root/types/env-loader.type";

config();

const PORT = get("PORT").required().example("5000").asString();
const DATABASE_URL = get("DATABASE_URL")
  .required()
  .example("file:./prisma/dev.db")
  .asString();
const ALLOWED_ORIGINS = get("ALLOWED_ORIGINS")
  .required()
  .example("http://localhost")
  .asArray(",");
const JWT_SECRET = get("JWT_SECRET").required().asString();
const JWT_REFRESH_SECRET = get("JWT_REFRESH_SECRET").required().asString();
const SALT_ROUND = get("SALT_ROUND").required().asInt();
const COOKIE_MAX_AGE = get("COOKIE_MAX_AGE").required().asInt();
const COOKIE_LONG_MAX_AGE = get("COOKIE_LONG_MAX_AGE").required().asInt();

export const envLoader: EnvLoader = {
  PORT,
  JWT_SECRET,
  SALT_ROUND,
  DATABASE_URL,
  COOKIE_MAX_AGE,
  ALLOWED_ORIGINS,
  JWT_REFRESH_SECRET,
  COOKIE_LONG_MAX_AGE,
};
