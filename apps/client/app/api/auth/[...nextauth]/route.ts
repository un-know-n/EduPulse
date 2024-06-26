import NextAuth, { AuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import GitHubProvider from 'next-auth/providers/github';
import CredentialsProvider from 'next-auth/providers/credentials';
import DiscordProvider from 'next-auth/providers/discord';
import { PrismaAdapter } from '@auth/prisma-adapter';
import prisma from '../../../config/database/prisma';
import { Routes } from '../../../config/routing/routes';
import * as process from 'process';
import { JWT } from 'next-auth/jwt';
import moment from 'moment';
import { apiInstance } from '../../../lib/services/api.instance';
import { Tokens } from '../../../config/@types/next-auth';
import { User } from '@prisma/client';

async function refreshToken(token: JWT) {
  try {
    const response = await apiInstance.post<Tokens['backendTokens']>(
      '/auth/refresh',
      {},
      {
        headers: {
          authorization: `Refresh ${token.backendTokens.refreshToken}`,
        },
      },
    );
    return {
      ...token,
      backendTokens: response.data,
    };
  } catch (e) {
    throw Error('Термін дії токена закінчився');
  }
}

const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: 'jwt',
    maxAge: 24 * 60 * 60, //EXPIRE_TIME / 1000,
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID ?? '',
      clientSecret: process.env.GITHUB_CLIENT_SECRET ?? '',
    }),
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID ?? '',
      clientSecret: process.env.DISCORD_CLIENT_SECRET ?? '',
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'some@example.com',
        },
        password: { label: 'Password', type: 'password' },
      },
      type: 'credentials',
      async authorize(credentials, req) {
        if (!credentials || !credentials?.email || !credentials?.password)
          return null;

        const res = await apiInstance.post('/auth/sign-in', {
          email: credentials.email,
          password: credentials.password,
        });

        if (res.status >= 400) {
          return null;
        }

        return res.data as User | null;
      },
    }),
  ],
  pages: {
    signIn: Routes.SignIn,
  },
  callbacks: {
    async jwt({ token, user, trigger, session, account, profile }) {
      // If update current client session
      if (trigger === 'update') {
        token.user = session.user;
        return { ...token, ...session.user };
      }

      // If the user logged in with third-party oauth providers
      if (user || !token.backendTokens) return { ...token, ...user };

      // If the user logged in with credentials, then check tokens expire time
      if (moment().utc(true).unix() < (token?.backendTokens?.expiresIn ?? 0))
        return token;

      return await refreshToken(token);
    },
    async session({ session, token }) {
      if (token.user) {
        // If the user logged in with credentials

        session.user = token.user;
        session.backendTokens = token.backendTokens;
      } else if (token) {
        // If the user logged in with third-party oauth providers

        session.user = token as unknown as typeof session.user;
      }

      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
