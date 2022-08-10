import { Injectable, Logger } from '@nestjs/common'
import { Prisma, User } from '@prisma/client'
import { PrismaService } from '../util'

// re-export types used by service interface
export { User, ScreenState } from '@prisma/client'
export type UserWhereUniqueInput = Prisma.UserWhereUniqueInput
export type UserUpsertArgs = Prisma.UserUpsertArgs
export type UserWhereInput = Prisma.UserWhereInput
export type UserOrderByWithRelationAndSearchRelevanceInput =
  Prisma.UserOrderByWithRelationAndSearchRelevanceInput
export type UserUpdateInput = Prisma.UserUpdateInput
export type UserInclude = Prisma.UserInclude

export interface PublicUser
  extends Partial<Omit<User, 'openid' & 'nric' & 'name'>> {
  publicName?: string
}

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name)
  constructor(private prisma: PrismaService) {}

  async upsert(params: UserUpsertArgs): Promise<PublicUser> {
    const user = await this.prisma.user.upsert(params)
    return toPublicUser(user)
  }

  findMany(params: {
    skip?: number
    take?: number
    cursor?: UserWhereUniqueInput
    where?: UserWhereInput
    orderBy?: UserOrderByWithRelationAndSearchRelevanceInput
    include?: UserInclude
  }) {
    return this.prisma.user.findMany(params)
  }

  findOne(params: {
    where: UserWhereUniqueInput
    include?: UserInclude
  }): Promise<User | null> {
    return this.prisma.user.findUnique(params)
  }

  async findOnePublic(params: {
    where: UserWhereUniqueInput
    include?: UserInclude
  }): Promise<PublicUser | null> {
    const one = await this.findOne(params)
    return one ? toPublicUser(one) : null
  }

  update(params: {
    where: UserWhereUniqueInput
    data: UserUpdateInput
  }): Promise<User> {
    return this.prisma.user.update(params)
  }

  remove(where: UserWhereUniqueInput): Promise<User> {
    return this.prisma.user.delete({ where })
  }
}

export function toPublicUser(user: Partial<User>): PublicUser {
  return {
    ...user,
    openid: undefined,
    nric: undefined,
    name: undefined,
    publicName: user.name ? anonymizeName(user.name) : undefined,
  }
}

export function anonymizeName(name: string): string {
  const parts = name.split(' ')
  return parts.reduce((prev, cur, currentIndex) => {
    const firstCode = cur.charCodeAt(0)
    const startChars = 0xd800 <= firstCode && firstCode < 0xdc00 ? 2 : 1
    if (currentIndex === 0) {
      return (
        cur.slice(0, startChars).toUpperCase() +
        cur.slice(startChars).toLowerCase()
      )
    }
    const initial = cur.slice(0, startChars).toUpperCase()
    return currentIndex === 1 ? prev + ' ' + initial : prev + initial
  }, '')
}
