import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export type TUser = {
  sub: string; //the same as email
  id: string;
  email: string;
  emailVerified?: Date;
  role: 'student' | 'teacher';
  iat: number;
  exp: number;
};

export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
