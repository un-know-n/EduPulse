import { withAuth } from 'next-auth/middleware';
import { Routes } from './app/config/routing/routes';
// export { default } from 'next-auth/middleware';

export default withAuth({
  pages: {
    signIn: Routes.SignIn,
  },
  callbacks: {
    authorized: async ({ req, token }) => {
      return Boolean(token);
    },
  },
});

export const config = { matcher: ['/dashboard'] };
