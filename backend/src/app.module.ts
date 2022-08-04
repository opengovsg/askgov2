import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { UtilModule } from './util'
import { QuestionModule } from './question/question.module'
import { AuthModule } from './auth/auth.module'
import { SessionMiddleware } from './middleware'

@Module({
  imports: [UtilModule, QuestionModule, AuthModule],
  exports: [AppService],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(SessionMiddleware).forRoutes('api')
  }
}
