import { User } from '@prisma/client';

type UserType = Omit<User, 'password'>;

interface Tokens {
  backendTokens: {
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
  };
}

declare module 'next-auth' {
  interface Session extends Tokens {
    user: UserType;
  }
}

declare module 'next-auth/jwt' {
  interface JWT extends Tokens {
    user: UserType;
    iat: number;
    exp: number;
    jti: string;
  }
}
