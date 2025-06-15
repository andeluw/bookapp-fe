import { DetailTransaksiBuku } from '@/types/buku';

export type Pembelian = {
  pembelian_id: string;
  tanggal_pembelian: string;
  nama_pegawai: string;
  nama_supplier: string;
  kuantitas?: number;
  total: number;
};

export type DetailPembelian = Pembelian & {
  buku: DetailTransaksiBuku[];
};
