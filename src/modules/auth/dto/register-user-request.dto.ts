import { passwordRegex } from "@root/utils/is-valid-password.util";
import { IsEmail, IsString, Matches, MinLength } from "class-validator";

export class RegisterUserRequestDto {
  @IsEmail()
  email!: string;

  @IsString()
  @MinLength(6)
  @Matches(passwordRegex, { message: "Password format is invalid" })
  password!: string;
}
