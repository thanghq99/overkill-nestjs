import { Body, Controller, Post } from '@nestjs/common';

import { AiService } from './ai.service';
import { AskDto } from './dto/AskDto.dto';

@Controller('ai')
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Post()
  ask(@Body() askDto: AskDto) {
    return this.aiService.ask(askDto);
  }
}
