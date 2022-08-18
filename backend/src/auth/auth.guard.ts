import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { SetMetadata } from '@nestjs/common'
import { Observable } from 'rxjs'
import type { SessionData } from 'express-session'
import { Permission } from '../officer'
import { OfficerPermissionService } from '../officer/officer-permission.service'

@Injectable()
export class UserGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest()
    return !!req.session.userId
  }
}

const permissionsKey = 'permissions'
export const Permissions = (...permissions: string[]) =>
  SetMetadata(permissionsKey, permissions)
export const ScreenPermission = () =>
  SetMetadata(permissionsKey, [Permission.SCREEN])
export const AnswerPermission = () =>
  SetMetadata(permissionsKey, [Permission.ANSWER])

@Injectable()
export class OfficerGuard implements CanActivate {
  private readonly logger = new Logger(OfficerGuard.name)
  constructor(
    private reflector: Reflector,
    private officerPermissionService: OfficerPermissionService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest()
    const officerId: number | undefined = req.session?.officerId
    if (!officerId) {
      return false
    }
    const permissions = this.reflector.get<string[]>(
      permissionsKey,
      context.getHandler(),
    )
    if (!permissions) {
      return true
    }
    for (const p of permissions) {
      const op = await this.officerPermissionService.findOne({
        where: {
          officerId_permission: {
            officerId,
            permission: p as Permission,
          },
        },
        include: { officer: true },
      })
      if (!op) {
        return false
      }
    }
    return true
  }
}
