import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';

@Injectable()
export class AccountService {
  constructor(private prismaService: PrismaService) {}

  async findByUserId(id: string) {
    return await this.prismaService.account.findFirst({
      where: {
        userId: id,
      },
    });
  }
}
