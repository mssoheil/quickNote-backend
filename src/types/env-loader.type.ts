export type EnvLoader = {
  PORT: string;
  JWT_SECRET: string;
  SALT_ROUND: number;
  DATABASE_URL: string;
  ALLOWED_ORIGINS: string[];
};
