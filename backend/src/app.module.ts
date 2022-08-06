import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { ServeStaticModule } from '@nestjs/serve-static'
import { AppService } from './app.service'
import { UtilModule, ApiConfigService, validationSchema } from './util'
import { QuestionModule } from './question'
import { AuthModule } from './auth/auth.module'
import { SessionMiddleware } from './middleware'
import { UserModule } from './user'
import { join } from 'path'

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
    ServeStaticModule.forRoot({
      rootPath: FRONTEND_PATH,
      exclude: ['/api*'], // Return 404 for non-existent API routes
      serveStaticOptions: {
        maxAge: 2 * 60 * 60 * 1000, // 2 hours, same as cloudflare
        setHeaders: function (res, path) {
          // set maxAge to 0 for root index.html
          if (path === join(FRONTEND_PATH, 'index.html')) {
            res.setHeader('Cache-control', 'public, max-age=0')
          }
        },
      },
    }),
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
