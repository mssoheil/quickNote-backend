import { Request, Response } from "express";
// Utils
import { hashPassword } from "@root/utils/hash.util";
import { generateRefreshToken, generateToken } from "@root/utils/token.util";
// Constants
import { cookieLongOptions, cookieOptions } from "@root/constants/cookie";
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
  const refreshToken = generateRefreshToken(createUser);

  response.cookie("accesscookie", token, cookieOptions);
  response.cookie("refreshcookie", token, cookieLongOptions);

  response.status(200).send({ message: "user created" });
};
