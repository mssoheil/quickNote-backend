import "reflect-metadata";
import swaggerJSDoc from "swagger-jsdoc";
import { getMetadataStorage } from "class-validator";
import { validationMetadatasToSchemas } from "class-validator-jsonschema";
import { loadAllDto } from "@root/utils/load-dtos.util";

export async function buildSwaggerSpec() {
  await loadAllDto();

  const schemas = validationMetadatasToSchemas({
    classValidatorMetadataStorage: getMetadataStorage(),
  });

  return swaggerJSDoc({
    definition: {
      openapi: "3.0.0",
      info: { title: "QuickNote", version: "1.0.0" },
      components: { schemas },
      servers: [{ url: "/api", description: "App base" }],
    },
    apis: [
      "src/routes/**/*.ts",
      "src/modules/**/*.ts",
      "!**/*.d.ts",
      "openapi/**/*.y?(a)ml",
    ],
  });
}
