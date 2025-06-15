import { DetailTransaksiBuku } from '@/types/buku';

export type Penjualan = {
  penjualan_id: string;
  tanggal_penjualan: string;
  metode_pembayaran: string;
  diskon: number;
  nama_pelanggan: string;
  nama_pegawai: string;
  kuantitas?: number;
  total: number;
};

export type DetailPenjualan = Penjualan & {
  buku: DetailTransaksiBuku[];
};
