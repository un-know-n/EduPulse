import { SignUp } from '../../components/auth/forms/SignUp';
import { AuthLayout } from '../../components/auth/AuthLayout';

export default function Page() {
  return (
    <AuthLayout>
      <SignUp />
    </AuthLayout>
  );
}
