import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { User } from '@prisma/client';
import moment from 'moment';

@Injectable()
export class VerificationService {
  constructor(private prismaService: PrismaService) {}

  async createToken(user: User) {
    const token = await this.findTokenByUserId(user.id);
    if (token) await this.deleteToken(token.id);

    return await this.prismaService.verificationToken.create({
      data: {
        user: {
          connect: { id: user.id },
        },
        expires: moment().utc(true).add(10, 'minutes').toDate(),
      },
    });
  }

  async deleteToken(tokenId: string) {
    return await this.prismaService.verificationToken.delete({
      where: {
        id: tokenId,
      },
    });
  }

  async findTokenByUserId(userId: string) {
    return await this.prismaService.verificationToken.findFirst({
      where: {
        userId: userId,
      },
    });
  }

  async verifyToken(userId: string, token: string) {
    const existingToken = await this.prismaService.verificationToken.findFirst({
      where: {
        userId,
        token,
      },
    });

    if (!existingToken)
      throw new BadRequestException('Введено неправильний токен!');
    if (moment().utc(true).isAfter(existingToken.expires))
      throw new BadRequestException('Термін дії токена минув!');

    return true;
  }
}
