import { createUser, findOneUser } from "@root/repository/auth.repository";
import { hashPassword } from "@root/utils/hash.util";
import { generateToken } from "@root/utils/token.util";
import { Request, Response } from "express";

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

  response.status(200).send({ token });
};
