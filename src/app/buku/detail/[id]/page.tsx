import { Metadata } from 'next';

import DetailBukuPage from '@/app/buku/detail/[id]/containers/DetailBukuPage';

export const metadata: Metadata = {
  title: 'Detail Buku',
  description: 'Halaman untuk melihat detail buku',
};

export default function Page() {
  return <DetailBukuPage />;
}
