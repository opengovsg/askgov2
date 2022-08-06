import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { NestExpressApplication } from '@nestjs/platform-express'
import { PrismaService } from './util'
import { ValidationPipe, VersioningType } from '@nestjs/common'
import { ApiConfigService } from './util'

async function bootstrap() {
  // If you want express functionality change this to
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true,
  })
  // const app = await NestFactory.create(AppModule);
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
  await app.listen(apiConfigService.appPort)
}
bootstrap()
