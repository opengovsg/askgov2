import { NestFactory } from '@nestjs/core'
import { NestExpressApplication } from '@nestjs/platform-express'
import { ValidationPipe, VersioningType } from '@nestjs/common'
import { AppModule } from './app.module'
import { PrismaService } from './util'
import { ApiConfigService } from './util'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  )
  app.enableVersioning({
    type: VersioningType.URI,
  })
  app.setGlobalPrefix('api')
  const prismaService = app.get(PrismaService)
  await prismaService.enableShutdownHooks(app)
  const apiConfigService = app.get(ApiConfigService)
  app.enableCors({
    origin: apiConfigService.frontendUrl,
    methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'HEAD'],
    credentials: true,
  })
  await app.listen(apiConfigService.appPort)
}
bootstrap()
