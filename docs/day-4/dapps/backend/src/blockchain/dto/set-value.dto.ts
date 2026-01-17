import { IsNumber, Min } from "class-validator";

export class SetValueDto {
  @IsNumber()
  @Min(0)
  value: number;
}