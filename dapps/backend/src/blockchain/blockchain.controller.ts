import { Controller, Get, Query } from "@nestjs/common";
import { ApiTags, ApiOperation } from "@nestjs/swagger";
import { BlockchainService } from "./blockchain.service";
import { GetEventsDto } from "./dto/get-events.dto";

@ApiTags("Blockchain")
@Controller("blockchain")
export class BlockchainController {
  constructor(private readonly blockchainService: BlockchainService) {}

  @Get("value")
  @ApiOperation({ summary: "Get latest value from blockchain" })
  getValue() {
    return this.blockchainService.getValue();
  }

  @Get("events")
  @ApiOperation({ summary: "Get ValueUpdated events" })
  getEvents(@Query() dto: GetEventsDto) {
    return this.blockchainService.getEvents(dto);
  }
}