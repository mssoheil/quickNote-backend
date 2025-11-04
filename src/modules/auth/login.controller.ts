import { Request, Response } from "express";
// Constants
import { cookieOptions } from "@root/constants/cookie";
// Utils
import { generateToken } from "@root/utils/token.util";
import { comparePassword } from "@root/utils/hash.util";
// Repositories
import { findOneUser } from "@root/repository/auth.repository";

function userNotFoundException(response: Response) {
  response.status(403).send({
    message: "The User with given information not found",
  });
}

export const loginController = async (request: Request, response: Response) => {
  const body = request.body ?? {};
  const { password, ...payload } = body;

  const user = await findOneUser({
    email: payload.email,
  });

  if (!user) {
    userNotFoundException(response);
    return;
  }

  const passwordMatch = await comparePassword(password, user?.password!);

  if (!passwordMatch) {
    userNotFoundException(response);
    return;
  }

  const token = generateToken({
    id: user.id,
    email: user.email,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  });

  response.cookie("authcookie", token, cookieOptions);
  response.json({ message: "Logged in" });
};
