import { IsNumber } from "class-validator";

export class FindNotesRequestDto {
  @IsNumber()
  page!: number;

  @IsNumber()
  limit!: number;
}
