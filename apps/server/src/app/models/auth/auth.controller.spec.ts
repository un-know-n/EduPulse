import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { AuthService } from './auth.service';
import { ResetPromptDto } from './dto/reset.prompt.dto';
import { ResetVerifyDto } from './dto/reset.verify.dto';
import { SignInDto } from './dto/signin.dto';
import { ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtGuard } from '../../common/guards/jwt.guard';
import { TeacherRoleGuard } from '../../common/guards/teacher-role.guard';
import { CloudinaryService } from '../../common/modules/cloudinary/cloudinary.service';
import { PrismaService } from '../../prisma.service';

// describe('AuthController', () => {
//   let controller: AuthController;

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       controllers: [AuthController],
//     }).compile();

//     controller = module.get<AuthController>(AuthController);
//   });

//   it('should be defined', () => {
//     expect(controller).toBeDefined();
//   });
// });

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const mockJwtService = {
      sign: jest.fn().mockReturnValue('token'),
      verify: jest.fn().mockReturnValue({ userId: 'testId' }),
    };

    const mockJwtGuard = {
      canActivate: (context: ExecutionContext) => {
        return true;
      },
    };

    const mockTeacherRoleGuard = {
      canActivate: (context: ExecutionContext) => {
        return true;
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            signUp: jest.fn(),
            signIn: jest.fn(),
            refreshToken: jest.fn(),
            emailResetPrompt: jest.fn(),
            resetVerify: jest.fn(),
            reset: jest.fn(),
          },
        },
        {
          provide: CloudinaryService,
          useValue: {
            executeWithImage: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: mockJwtService,
        },

        {
          provide: JwtGuard,
          useValue: mockJwtGuard,
        },
        {
          provide: TeacherRoleGuard,
          useValue: mockTeacherRoleGuard,
        },
        {
          provide: PrismaService,
          useValue: {
            test: {
              create: jest.fn(),
              findUnique: jest.fn(),
              delete: jest.fn(),
              update: jest.fn(),
            },
            $transaction: jest.fn(),
          },
        },
      ],
    }).compile();

    authController = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(authController).toBeDefined();
  });

  describe('signUp', () => {
    it('should sign up a new user', async () => {
      const createUserDto: CreateUserDto = {
        email: 'test@example.com',
        name: 'Some name',
        password: 'password123',
        role: 'teacher',
      };
      const result = { id: 'userId', ...createUserDto };
      jest
        .spyOn(authService, 'signUp')
        .mockImplementation(async () => result as any);

      expect(await authController.signUp(createUserDto)).toBe(result);
    });
  });

  describe('signIn', () => {
    it('should sign in a user', async () => {
      const signInDto: SignInDto = {
        email: 'test@example.com',
        password: 'password123',
      };
      const result = { user: { id: 'userId' }, backendTokens: {} };
      jest
        .spyOn(authService, 'signIn')
        .mockImplementation(async () => result as any);

      expect(await authController.signIn(signInDto)).toBe(result);
    });
  });

  describe('refresh', () => {
    it('should refresh tokens', async () => {
      const req = { user: { id: 'userId', email: 'test@example.com' } };
      const result = {
        accessToken: 'accessToken',
        refreshToken: 'refreshToken',
      };
      jest
        .spyOn(authService, 'refreshToken')
        .mockImplementation(async () => result as any);

      expect(await authController.refresh(req)).toBe(result);
    });
  });

  describe('emailResetPrompt', () => {
    it('should send a reset prompt email', async () => {
      const resetPromptDto: ResetPromptDto = { email: 'test@example.com' };
      const result = { success: true };
      jest
        .spyOn(authService, 'emailResetPrompt')
        .mockImplementation(async () => result as any);

      expect(await authController.verification(resetPromptDto)).toBe(result);
    });
  });

  describe('resetVerify', () => {
    it('should verify the reset token', async () => {
      const resetVerifyDto: ResetVerifyDto = {
        email: 'test@example.com',
        token: 'resetToken',
      };
      const result = true;
      jest
        .spyOn(authService, 'resetVerify')
        .mockImplementation(async () => result);

      expect(await authController.resetVerify(resetVerifyDto)).toBe(result);
    });
  });

  describe('resetPassword', () => {
    it('should reset the password', async () => {
      const signInDto: SignInDto = {
        email: 'test@example.com',
        password: 'newPassword',
      };
      jest
        .spyOn(authService, 'reset')
        .mockImplementation(async () => undefined);

      expect(await authController.resetPassword(signInDto)).toBeUndefined();
    });
  });
});
