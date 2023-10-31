import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/signin.dto';
import { RefreshJwtGuard } from './guards/refresh.guard';
import { ResetVerifyDto } from './dto/reset.verify.dto';
import { ResetPromptDto } from './dto/reset.prompt.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('sign-up')
  async signUp(@Body() dto: CreateUserDto) {
    return await this.authService.signUp(dto);
  }

  @Post('sign-in')
  async signIn(@Body() dto: SignInDto) {
    return await this.authService.signIn(dto);
  }

  @UseGuards(RefreshJwtGuard)
  @Post('refresh')
  async refresh(@Request() req) {
    return await this.authService.refreshToken(req.user);
  }

  @Post('reset-prompt')
  async verification(@Body() dto: ResetPromptDto) {
    return await this.authService.emailResetPrompt(dto);
  }

  @Post('reset-verify')
  async resetVerify(@Body() dto: ResetVerifyDto) {
    return await this.authService.resetVerify(dto);
  }

  @Post('reset')
  async resetPassword(@Body() dto: SignInDto) {
    return await this.authService.reset(dto);
  }
}
