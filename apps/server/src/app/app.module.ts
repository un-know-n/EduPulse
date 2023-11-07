import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './models/auth/auth.module';
import { UserModule } from './models/user/user.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { PrismaService } from './prisma.service';
import * as process from 'process';
import { VerificationModule } from './models/verification/verification.module';
import { AccountModule } from './models/account/account.module';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: process.env.EMAIL_SERVER,
      defaults: {
        from: process.env.EMAIL_FROM,
      },
    }),
    ConfigModule.forRoot(),
    AuthModule,
    UserModule,
    VerificationModule,
    AccountModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
