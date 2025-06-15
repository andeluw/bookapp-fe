import { Metadata } from 'next';

import DetailPelangganPage from '@/app/membership/pelanggan/containers/DetailPelangganPage';

export const metadata: Metadata = {
  title: 'Detail Pelanggan',
  description: 'Halaman untuk melihat detail pelanggan.',
};

export default function Page() {
  return <DetailPelangganPage />;
}
