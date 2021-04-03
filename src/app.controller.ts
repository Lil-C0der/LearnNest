import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller()
@ApiTags('APP')
export class AppController {
  @Get()
  index(): string {
    return 'INDEX';
  }
}
