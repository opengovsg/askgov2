import { Module } from '@nestjs/common'
import { OfficerService } from './officer.service'
import { OfficerController } from './officer.controller'
import { UtilModule } from '../util'
import { OfficerPermissionService } from './officer-permission.service'

@Module({
  imports: [UtilModule],
  controllers: [OfficerController],
  providers: [OfficerService, OfficerPermissionService],
  exports: [OfficerService, OfficerPermissionService],
})
export class OfficerModule {}
