import { Metadata } from 'next';

import TrenKategoriPage from '@/app/statistik/tren-kategori/containers/TrenKategoriPage';

export const metadata: Metadata = {
  title: 'Statistik Tren Kategori',
  description: 'Halaman untuk melihat laporan tren kategori buku.',
};

export default function Page() {
  return <TrenKategoriPage />;
}
