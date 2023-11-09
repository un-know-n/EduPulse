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

  async linkAccount(
    id: string,
    tokens: {
      accessToken: string;
      refreshToken: string;
      expiresAt: number;
    },
  ) {
    const createdAccount = await this.prismaService.account.create({
      data: {
        userId: id,
        providerAccountId: id,
        type: 'credentials',
        provider: 'credentials',
        token_type: 'Bearer',
      },
    });
    await this.updateTokens(id, tokens);

    return createdAccount;
  }

  async updateTokens(
    id: string,
    data: {
      accessToken: string;
      refreshToken: string;
      expiresAt: number;
    },
  ) {
    return await this.prismaService.account.update({
      where: {
        userId: id,
      },
      data: {
        access_token: data.accessToken,
        refresh_token: data.refreshToken,
        expires_at: data.expiresAt,
      },
    });
  }
}
