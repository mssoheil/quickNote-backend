import { Request, Response } from "express";
// Utils
import { hashPassword } from "@root/utils/hash.util";
import { generateRefreshToken, generateToken } from "@root/utils/token.util";
// Constants
import { cookieLongOptions, cookieOptions } from "@root/constants/cookie";
// Repositories
import { createUser, findOneUser } from "@root/repository/auth.repository";
// DTOs
import { RegisterUserRequestDto } from "@root/modules/auth/dto/register-user-request.dto";

export const registerController = async (
  request: Request,
  response: Response
) => {
  const body: RegisterUserRequestDto = request.body ?? {};
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

  const userData = {
    ...payload,
    password: hashedPassword,
  };

  const createdUser = await createUser(userData);

  const token = generateToken(createdUser);
  const refreshToken = generateRefreshToken(createUser);

  response.cookie("access_token", token, cookieOptions);
  response.cookie("refresh_token", refreshToken, cookieLongOptions);

  response.status(200).send({ message: "user created" });
};
