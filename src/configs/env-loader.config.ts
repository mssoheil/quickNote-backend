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

export const envLoader: EnvLoader = { PORT, DATABASE_URL, ALLOWED_ORIGINS };
