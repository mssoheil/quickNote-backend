import { Request, Response } from "express";
// Utils
import { hashPassword } from "@root/utils/hash.util";
import { generateToken } from "@root/utils/token.util";
// Constants
import { cookieOptions } from "@root/constants/cookie";
// Repositories
import { createUser, findOneUser } from "@root/repository/auth.repository";

export const registerController = async (
  request: Request,
  response: Response
) => {
  const body = request.body ?? {};
  const { password, ...payload } = body;

  const user = await findOneUser({
    email: payload.email,
  });

  if (user) {
    response
      .status(412)
      .send({ message: "The user with the given email already exist" });

    return;
  }

  const hashedPassword = await hashPassword(password);

  const createdUser = await createUser({
    ...payload,
    password: hashedPassword,
  });

  const token = generateToken(createdUser);

  response.cookie("authcookie", token, cookieOptions);

  response.status(200).send({ message: "user created" });
};
