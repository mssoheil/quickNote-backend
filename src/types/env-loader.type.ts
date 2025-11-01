export type EnvLoader = {
  PORT: string;
  JWT_SECRET: string;
  SALT_ROUND: number;
  DATABASE_URL: string;
  COOKIE_MAX_AGE: number;
  ALLOWED_ORIGINS: string[];
};
