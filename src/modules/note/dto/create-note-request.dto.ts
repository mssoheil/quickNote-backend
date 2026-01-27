import { IsString } from "class-validator";

export class CreateNoteRequestDto {
  @IsString()
  title!: string;

  @IsString()
  content!: string;
}
