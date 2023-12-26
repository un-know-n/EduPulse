'use client';

import { LightMode } from '@chakra-ui/react';
import { AuthLayout } from '../components/auth/layout/AuthLayout';
import useShowAuthError from '../lib/hooks/useShowAuthError';

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const error = useShowAuthError();
  return (
    <LightMode>
      <AuthLayout>{children}</AuthLayout>
    </LightMode>
  );
}
