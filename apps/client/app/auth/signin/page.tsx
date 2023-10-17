import { AuthLayout } from '../../components/auth/AuthLayout';
import { SignIn } from '../../components/auth/forms/SignIn';

export default function Page() {
  return (
    <AuthLayout>
      <SignIn />
    </AuthLayout>
  );
}
