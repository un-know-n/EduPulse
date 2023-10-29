import { SignInOptions } from 'next-auth/react';
import { Routes } from '../../../config/routes';

export const signInOptions = (callbackUrl?: string | null): SignInOptions => ({
  redirect: true,
  callbackUrl: callbackUrl || Routes.Dashboard,
});
