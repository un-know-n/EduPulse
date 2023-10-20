import { AuthLayout } from '../components/auth/layout/AuthLayout';

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AuthLayout>{children}</AuthLayout>;
}
