import {
  Controller,
  Get,
  Req,
  Res,
  Param,
  HttpStatus,
  ParseIntPipe,
} from '@nestjs/common'
import { AppService } from './app.service'

@Controller('api/v1')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello() {
    return this.appService.getHello()
  }
}
