import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Request } from 'express';
import { PrismaService } from '../../prisma.service';

@Injectable()
export class TeacherRoleGuard implements CanActivate {
  constructor(private readonly prismaService: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const isTeacher = this.isTeacherRole(request);

    if (!isTeacher)
      throw new ForbiddenException('Ви не можете виконати цю дію!');

    return true;
  }

  private isTeacherRole(request: Request) {
    return request?.['user'].role === 'teacher';
  }
}
