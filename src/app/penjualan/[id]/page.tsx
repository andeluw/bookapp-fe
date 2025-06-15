import { Metadata } from 'next';

import DetailPenjualanPage from '@/app/penjualan/[id]/containers/DetailPenjualanPage';

export const metadata: Metadata = {
  title: 'Detail Penjualan',
  description: 'Halaman untuk melihat detail penjualan buku',
};

export default function Page() {
  return <DetailPenjualanPage />;
}
