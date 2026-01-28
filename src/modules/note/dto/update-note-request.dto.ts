import { IsOptional, IsString } from "class-validator";

export class UpdateNoteRequestDto {
  @IsString()
  @IsOptional()
  title!: string;

  @IsString()
  @IsOptional()
  content!: string;
}
