import { Metadata } from 'next';

import DetailPembelianPage from '@/app/pembelian/[id]/containers/DetailPembelianPage';

export const metadata: Metadata = {
  title: 'Detail Pembelian',
  description: 'Halaman untuk melihat detail pembelian buku',
};

export default function Page() {
  return <DetailPembelianPage />;
}
