import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Logger,
} from '@nestjs/common'
import { PublicUser, UserService } from './user.service'
import { User } from '@prisma/client'
import { PublicUserDto } from './dto/public-user.dto'

@Controller({ path: 'user', version: '1' })
export class UserController {
  private readonly logger = new Logger(UserController.name)

  constructor(private readonly userService: UserService) {}

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<PublicUserDto | null> {
    this.logger.log('Got request')
    const user = await this.userService.findOne({ where: { id } })
    if (user === null) {
      return null
    }
    const publicUser = new PublicUserDto(user)
    this.logger.log(JSON.stringify(publicUser))
    return publicUser
  }
}
