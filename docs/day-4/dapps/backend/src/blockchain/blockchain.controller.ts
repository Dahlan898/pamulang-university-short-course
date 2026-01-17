import { Controller, Get, Post, Body } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiBody } from "@nestjs/swagger";
import { BlockchainService } from "./blockchain.service";
import { GetEventsDto } from "./dto/get-events.dto";
import { SetValueDto } from "./dto/set-value.dto";

@ApiTags("Blockchain")
@Controller("blockchain")
export class BlockchainController {
  constructor(private readonly blockchainService: BlockchainService) {}

  @Get("value")
  @ApiOperation({ summary: "Get latest value from blockchain" })
  getValue() {
    return this.blockchainService.getValue();
  }

  @Post("events")
  @ApiOperation({ summary: "Get ValueUpdated events" })
  @ApiBody({ type: GetEventsDto })
  getEvents(@Body() dto: GetEventsDto) {
    return this.blockchainService.getEvents(dto);
  }

  @Post("set-value")
  @ApiOperation({ summary: "Set new value to blockchain" })
  @ApiBody({ type: SetValueDto })
  setValue(@Body() dto: SetValueDto) {
    return this.blockchainService.setValue(dto);
  }
}