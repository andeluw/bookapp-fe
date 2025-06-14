import { Metadata } from 'next';

import DashboardAdminPage from '@/app/(homepage)/containers/DashboardAdminPage';

export const metadata: Metadata = {
  title: 'Dashboard Admin',
  description: 'Halaman utama untuk administrator',
};

export default function Page() {
  return <DashboardAdminPage />;
}
