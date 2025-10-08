import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import type { RequestHandler } from "express";

export function validateBody<T extends object>(
  dtoClass: new () => T
): RequestHandler {
  return async (req, res, next) => {
    const dto = plainToInstance(dtoClass, req.body);
    const errors = await validate(dto, { whitelist: true });
    if (errors.length > 0) {
      res.status(400).json({
        errorType: "bad-request",
        message: errors.reduce(
          (acc, item) =>
            `${acc}${Object.values(item.constraints ?? {}).join(" , ")}`,
          ""
        ),
      });
      return;
    }
    req.body = dto;
    next();
  };
}
