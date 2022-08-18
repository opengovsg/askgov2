import { Injectable, Logger } from '@nestjs/common'
import { Prisma, Officer, Permission } from '@prisma/client'
import { PrismaService } from '../util'

// re-export types used by service interface
export { Officer, Permission, ScreenState } from '@prisma/client'
export type OfficerWhereUniqueInput = Prisma.OfficerWhereUniqueInput
export type OfficerUpsertArgs = Prisma.OfficerUpsertArgs
export type OfficerWhereInput = Prisma.OfficerWhereInput
export type OfficerOrderByWithRelationAndSearchRelevanceInput =
  Prisma.OfficerOrderByWithRelationAndSearchRelevanceInput
export type OfficerUpdateInput = Prisma.OfficerUpdateInput
export type OfficerInclude = Prisma.OfficerInclude

@Injectable()
export class OfficerService {
  private readonly logger = new Logger(OfficerService.name)
  constructor(private prisma: PrismaService) {}

  async upsert(params: OfficerUpsertArgs): Promise<Officer> {
    return await this.prisma.officer.upsert(params)
  }

  findMany(params: {
    skip?: number
    take?: number
    cursor?: OfficerWhereUniqueInput
    where?: OfficerWhereInput
    orderBy?: OfficerOrderByWithRelationAndSearchRelevanceInput
    include?: OfficerInclude
  }) {
    return this.prisma.officer.findMany(params)
  }

  findOne(params: {
    where: OfficerWhereUniqueInput
    include?: OfficerInclude
  }): Promise<Officer | null> {
    return this.prisma.officer.findUnique(params)
  }

  update(params: {
    where: OfficerWhereUniqueInput
    data: OfficerUpdateInput
  }): Promise<Officer> {
    return this.prisma.officer.update(params)
  }

  remove(where: OfficerWhereUniqueInput): Promise<Officer> {
    return this.prisma.officer.delete({ where })
  }

  hasPermission(permission: Permission, officerId?: number) {
    if (officerId === undefined) {
      return false
    }
    return this.prisma.officerPermission.findUnique({
      where: {
        officerId_permission: {
          officerId,
          permission,
        },
      },
    })
  }

  canScreen(officerId?: number) {
    return this.hasPermission(Permission.SCREEN, officerId)
  }

  canAnswer(officerId?: number) {
    return this.hasPermission(Permission.ANSWER, officerId)
  }
}
