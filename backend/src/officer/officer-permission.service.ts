import { Injectable, Logger } from '@nestjs/common'
import { Prisma, OfficerPermission } from '@prisma/client'
import { PrismaService } from '../util'

// re-export types used by service interface
export { OfficerPermission, Permission, ScreenState } from '@prisma/client'
export type OfficerPermissionWhereUniqueInput =
  Prisma.OfficerPermissionWhereUniqueInput
export type OfficerPermissionUpsertArgs = Prisma.OfficerPermissionUpsertArgs
export type OfficerPermissionWhereInput = Prisma.OfficerPermissionWhereInput
export type OfficerPermissionOrderByWithRelationAndSearchRelevanceInput =
  Prisma.OfficerPermissionOrderByWithRelationAndSearchRelevanceInput
export type OfficerPermissionUpdateInput = Prisma.OfficerPermissionUpdateInput
export type OfficerPermissionInclude = Prisma.OfficerPermissionInclude

@Injectable()
export class OfficerPermissionService {
  private readonly logger = new Logger(OfficerPermissionService.name)
  constructor(private prisma: PrismaService) {}

  async upsert(
    params: OfficerPermissionUpsertArgs,
  ): Promise<OfficerPermission> {
    return await this.prisma.officerPermission.upsert(params)
  }

  findMany(params: {
    skip?: number
    take?: number
    cursor?: OfficerPermissionWhereUniqueInput
    where?: OfficerPermissionWhereInput
    orderBy?: OfficerPermissionOrderByWithRelationAndSearchRelevanceInput
    include?: OfficerPermissionInclude
  }) {
    return this.prisma.officerPermission.findMany(params)
  }

  findOne(params: {
    where: OfficerPermissionWhereUniqueInput
    include?: OfficerPermissionInclude
  }) {
    return this.prisma.officerPermission.findUnique(params)
  }

  update(params: {
    where: OfficerPermissionWhereUniqueInput
    data: OfficerPermissionUpdateInput
  }): Promise<OfficerPermission> {
    return this.prisma.officerPermission.update(params)
  }

  remove(where: OfficerPermissionWhereUniqueInput): Promise<OfficerPermission> {
    return this.prisma.officerPermission.delete({ where })
  }
}
