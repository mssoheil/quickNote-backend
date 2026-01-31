import cors from "cors";
import helmet from "helmet";
import express from "express";
import { envLoader } from "./configs";
import authRoutes from "./modules/auth";
import noteRoutes from "./modules/note";
import { rateLimit } from "express-rate-limit";
import { buildSwaggerSpec } from "./swagger";
import swaggerUi from "swagger-ui-express";
import cookieParser from "cookie-parser";
import { httpLogger } from "@root/middlewares/http-logger.middleware";

const limiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  limit: 50,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  ipv6Subnet: 56,
});

const app = express();

(async () => {
  const { spec, raw } = await buildSwaggerSpec();

  const openapiHandler: express.RequestHandler = (_req, res) => {
    res.type("text/yaml");
    res.send(raw);
  };

  app.get("/openapi.yaml", openapiHandler);

  app.use("/docs", swaggerUi.serve, swaggerUi.setup(spec, { explorer: true }));
})();

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || envLoader.ALLOWED_ORIGINS.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not Allowed origin"));
      }
    },
    credentials: true,
  }),
);

app.use(cookieParser());

app.use(helmet());

app.disable("x-powered-by");

app.use(limiter);

app.use(
  express.json({
    limit: "1mb",
    strict: true,
    inflate: true,
    type: "application/json",
  }),
);

app.use(express.urlencoded({ extended: false, limit: "1mb" }));

app.set("etag", "strong");

app.use(httpLogger);

app.use(
  "/api",
  ((router) => {
    router.use("/auth", authRoutes);
    return router;
  })(express.Router()),
);

app.use(
  "/api",
  ((router) => {
    router.use("/notes", noteRoutes);
    return router;
  })(express.Router()),
);

export default app;
