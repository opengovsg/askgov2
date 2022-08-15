import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AppService } from './app.service'
import { UtilModule, ApiConfigService, validationSchema } from './util'
import { QuestionModule } from './question'
import { AuthModule } from './auth/auth.module'
import { SessionMiddleware } from './middleware'
import { UserModule } from './user'
import { join } from 'path'
import { LikeModule } from './like/like.module';
import { AnswerModule } from './answer/answer.module';
import { TagModule } from './tag/tag.module';

const FRONTEND_PATH = join(__dirname, '..', '..', 'frontend', 'build')

@Module({
  imports: [
    UtilModule,
    QuestionModule,
    AuthModule,
    UserModule,
    ConfigModule.forRoot({
      validationSchema,
    }),
    LikeModule,
    AnswerModule,
    TagModule,
  ],
  exports: [AppService],
  controllers: [],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(SessionMiddleware).forRoutes('*')
  }
}
