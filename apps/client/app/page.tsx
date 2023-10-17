import './global.css';
import { AuthLayout } from './components/auth/AuthLayout';
import { SignUp } from './components/auth/forms/SignUp';

export default async function Index() {
  return (
    <>
      <AuthLayout>
        <SignUp />
      </AuthLayout>
    </>
  );
}
