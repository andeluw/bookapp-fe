import { Metadata } from 'next';

import LoginPage from '@/app/(auth)/login/containers/LoginPage';

export const metadata: Metadata = {
  title: 'Login',
  description: 'Login ke akun Anda',
};

export default function Page() {
  return <LoginPage />;
}
