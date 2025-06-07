import { get } from "env-var";
import { config } from "dotenv";
// Types
import type { EnvLoader } from "@root/types/env-loader.type";

config();

const PORT = get("PORT").required().example("5000").asString();

const envLoader: EnvLoader = { PORT };

export default envLoader;
