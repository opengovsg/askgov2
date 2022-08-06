import { User, anonymizeName } from '../user.service'

export class PublicUserDto {
  id: User['id']
  createdAt?: User['createdAt']
  updatedAt?: User['updatedAt']
  publicName?: string
  constructor(user: Pick<User, 'id'> & Partial<User>) {
    this.id = user.id
    this.createdAt = user.createdAt
    this.updatedAt = user.createdAt
    this.publicName = user.name ? anonymizeName(user.name) : undefined
  }
}
