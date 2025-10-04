import { get } from "env-var";
import { config } from "dotenv";
// Types
import type { EnvLoader } from "@root/types/env-loader.type";

config();

const PORT = get("PORT").required().example("5000").asString();
const DATABASE_URL = get("DATABASE_URL").required().example("file:./prisma/dev.db").asString();

export const envLoader: EnvLoader = { PORT, DATABASE_URL };
