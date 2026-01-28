import "reflect-metadata";
import fs from "fs";
import path from "path";
import YAML from "yaml";
import { getMetadataStorage } from "class-validator";
import { validationMetadatasToSchemas } from "class-validator-jsonschema";
import { loadAllDto } from "@root/utils/load-dtos.util";

export async function buildSwaggerSpec() {
  await loadAllDto();

  const specPath = path.join(process.cwd(), "docs", "openapi.yaml");
  const raw = fs.readFileSync(specPath, "utf8");
  const spec = YAML.parse(raw) as any;

  const generatedSchemas = validationMetadatasToSchemas({
    classValidatorMetadataStorage: getMetadataStorage(),
  });

  spec.components ??= {};
  spec.components.schemas ??= {};

  for (const [name, schema] of Object.entries(generatedSchemas)) {
    if (!spec.components.schemas[name]) {
      spec.components.schemas[name] = schema;
    }
  }

  if (!spec.servers) {
    spec.servers = [{ url: "/api", description: "App base" }];
  }

  return { spec, raw, specPath };
}
