import fg from "fast-glob";

export async function loadAllDto() {
  const patterns = [
    "**/dto/**/*.ts",
    "**/dtos/**/*.ts",
    "**/dto/**/*.js",
    "**/dtos/**/*.js",
    "!**/*.d.ts",
  ];

  const files = await fg(patterns, {
    cwd: process.cwd(),
    ignore: ["**/node_modules/**", "**/dist/**/node_modules/**"],
    absolute: true,
    unique: true,
  });

  for (const abs of files) {
    try {
      require(abs);
    } catch (err) {
      console.error("DTO import failed:", abs, err);
      throw err;
    }
  }

  console.log(`Loaded ${files.length} DTO files`);
}
