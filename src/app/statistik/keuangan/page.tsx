import { Metadata } from 'next';

import LaporanKeuanganPage from '@/app/statistik/keuangan/containers/LaporanKeuangan';

export const metadata: Metadata = {
  title: 'Statistik Buku Terlaris',
  description: 'Halaman untuk melihat laporan buku terlaris.',
};

export default function Page() {
  return <LaporanKeuanganPage />;
}
