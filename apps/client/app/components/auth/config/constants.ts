import { SignInOptions } from 'next-auth/react';
import { Routes } from '../../../config/routing/routes';

export const signInOptions = (callbackUrl?: string | null): SignInOptions => ({
  redirect: true,
  callbackUrl: callbackUrl || Routes.Dashboard,
});

export type TRoles = (typeof baseRoles)[number];
export const baseRoles = ['student', 'teacher'] as const;
export const translateRole = (role: TRoles) =>
  role === 'student' ? 'Студент' : 'Викладач';
