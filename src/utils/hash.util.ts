import bcrypt from "bcrypt";
import { envLoader } from "@root/configs";

export async function hashPassword(password: string) {
  return bcrypt.hash(password, envLoader.SALT_ROUND);
}

export async function comparePassword(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}
