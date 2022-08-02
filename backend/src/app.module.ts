import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { UtilModule } from './util'
import { QuestionModule } from './question/question.module';

@Module({
  imports: [UtilModule, QuestionModule],
  exports: [AppService],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
