import { Metadata } from 'next';

import CariBukuPage from '@/app/buku/cari/containers/CariBukuPage';

export const metadata: Metadata = {
  title: 'Cari Buku',
  description: 'Halaman untuk mencari buku yang tersedia di toko.',
};

export default function Page() {
  return <CariBukuPage />;
}
