import NextAuth, { AuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import GitHubProvider from 'next-auth/providers/github';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@auth/prisma-adapter';
import prisma from '../../../config/prisma';
import { Routes } from '../../../config/routes';
import * as process from 'process';
import { JWT } from 'next-auth/jwt';

// TODO: Redo fetching to axios services!!!
// TODO: Forget Password handling!

async function refreshToken(token: JWT): Promise<JWT> {
  const res = await fetch(
    `http://localhost:${process.env.SERVER_PORT || 3000}`.concat(
      '/api/auth/refresh',
    ),
    {
      method: 'POST',
      headers: {
        authorization: `Refresh ${token.backendTokens.refreshToken}`,
      },
    },
  );

  // TODO: Handle incoming error if the token hasn't been refreshed
  const parsedResponse = await res.json();
  return {
    ...token,
    backendTokens: parsedResponse,
  };
}

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: 'jwt',
    maxAge: 7 * 24 * 60 * 60,
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

        const res = await fetch(
          `http://localhost:${process.env.SERVER_PORT || 3000}`.concat(
            '/api/auth/signin',
          ),
          {
            method: 'POST',
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
            headers: {
              'Content-Type': 'application/json',
            },
          },
        );

        if (res.status! >= 400) {
          console.log(res.statusText);
          return null;
        }

        return await res.json();
      },
    }),
  ],
  pages: {
    signIn: Routes.SignIn,
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) return { ...token, ...user };
      if (new Date().getTime() < token.backendTokens.expiersIn) return token;

      return await refreshToken(token);
    },
    async session({ session, token }) {
      if (token.user) {
        session.user = token.user;
        session.backendTokens = token.backendTokens;
      } else if (token) {
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
