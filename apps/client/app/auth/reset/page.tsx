'use client';

import { AuthLayout } from '../../components/auth/AuthLayout';
import { ResetPasswordProposal } from '../../components/auth/forms/ResetPasswordProposal';

export default function Page() {
  return (
    <AuthLayout>
      <ResetPasswordProposal />
      {/*<CheckEmail*/}
      {/*  email='abrakadabra@mail'*/}
      {/*  resendHandler={() => 0}*/}
      {/*/>*/}
      {/*<ResetPassword changeHandler={() => 0} />*/}
    </AuthLayout>
  );
}
