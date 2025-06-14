import { Metadata } from 'next';

import BukuTerlarisPage from '@/app/statistik/buku-terlaris/containers/BukuTerlarisPage';

export const metadata: Metadata = {
  title: 'Statistik Buku Terlaris',
  description: 'Halaman untuk melihat laporan buku terlaris.',
};

export default function Page() {
  return <BukuTerlarisPage />;
}
