import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { UserModule } from '../user'
import { UtilModule } from '../util'

@Module({
  imports: [UtilModule, UserModule],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
