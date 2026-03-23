import { OpenRouter } from '@openrouter/sdk';

import { Injectable } from '@nestjs/common';

import { AppConfigService } from '../config/config.service';
import { AskDto } from './dto/AskDto.dto';

@Injectable()
export class AiService {
  private openRouter: OpenRouter;

  constructor(private readonly configService: AppConfigService) {
    this.openRouter = new OpenRouter({
      apiKey: this.configService.openRouterApiKey,
    });
  }
  async ask(askDto: AskDto) {
    console.log(askDto);

    const response = await this.openRouter.chat.send({
      chatGenerationParams: {
        model: 'nvidia/nemotron-3-super-120b-a12b:free',
        messages: [
          {
            role: 'user',
            content: askDto.prompt,
          },
        ],
        stream: false,
      },
    });

    return response;
  }
}
