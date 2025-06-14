import { Metadata } from 'next';

import RekomendasiBukuPage from '@/app/buku/rekomendasi/containers/RekomendasiBukuPage';

export const metadata: Metadata = {
  title: 'Rekomendasi Buku',
  description: 'Halaman rekomendasi buku untuk pembelian',
};

export default function Page() {
  return <RekomendasiBukuPage />;
}
