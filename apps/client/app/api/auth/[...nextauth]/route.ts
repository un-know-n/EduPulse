import NextAuth, { AuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import GitHubProvider from 'next-auth/providers/github';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@auth/prisma-adapter';
import prisma from '../../../config/database/prisma';
import { Routes } from '../../../config/routing/routes';
import * as process from 'process';
import { JWT } from 'next-auth/jwt';
import axios from 'axios';
import moment from 'moment';

const instance = axios.create({
  baseURL: process.env.SERVER_URL ?? 'http://localhost:3000/api',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
});

async function refreshToken(token: JWT) {
  try {
    const response = await instance.post(
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
    throw Error('Expired token!');
  }
}

export const authOptions: AuthOptions = {
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

        const res = await instance.post('/auth/sign-in', {
          email: credentials.email,
          password: credentials.password,
        });

        if (res.status >= 400) {
          return null;
        }

        return res.data;
      },
    }),
  ],
  pages: {
    signIn: Routes.SignIn,
  },
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (trigger === 'update') return { ...token, ...session.user };
      if (user || !token.backendTokens) return { ...token, ...user };
      if (moment().utc(true).unix() < token.backendTokens.expiresIn)
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

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        session.user = token;
      }

      return session;
    },
  },
};

export const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
