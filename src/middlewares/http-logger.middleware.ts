// src/middlewares/http-logger.middleware.ts
import pinoHttp from "pino-http";
import logger from "@root/utils/logger";

export const httpLogger = pinoHttp({
  logger,

  customProps: (req: any, res) => ({
    reqBody: req.body,
    reqQuery: req.query,
    reqParams: req.params,
  }),

  redact: {
    paths: [
      "req.headers.authorization",
      "req.headers.cookie",

      "reqBody.password",
      "reqBody.confirmPassword",
      "reqBody.token",

      "resBody.accessToken",
      "resBody.refreshToken",
    ],
    censor: "***MASKED***",
  },

  customLogLevel(_req, res, err) {
    if (res.statusCode >= 500 || err) return "error";
    if (res.statusCode >= 400) return "warn";
    return "info";
  },
});
