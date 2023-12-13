'use client';

import { LightMode } from '@chakra-ui/react';
import { AuthLayout } from '../components/auth/layout/AuthLayout';
import useShowError from '../lib/hooks/useShowError';

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const error = useShowError();
  return (
    <LightMode>
      <AuthLayout>{children}</AuthLayout>
    </LightMode>
  );
}
