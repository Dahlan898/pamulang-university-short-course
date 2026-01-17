import { IsNumber, Min } from "class-validator";

export class GetEventsDto {
  @IsNumber()
  @Min(0)
  fromBlock: number;

  @IsNumber()
  @Min(0)
  toBlock: number;
}