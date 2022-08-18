import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { UserGuard } from './auth.guard'
import { UserModule } from '../user'
import { UtilModule } from '../util'
import { OfficerModule } from '../officer'

@Module({
  imports: [UtilModule, UserModule, OfficerModule],
  providers: [AuthService, UserGuard],
  controllers: [AuthController],
  exports: [UserGuard],
})
export class AuthModule {}
