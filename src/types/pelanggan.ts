import { Penjualan } from '@/types/penjualan';

export type Pelanggan = {
  pelanggan_id: string;
  nama: string;
  membership_id: string;
  tipe: string;
  no_telp: string;
  alamat: string;
  tanggal_pembuatan: string;
  tanggal_kadaluwarsa: string;
};

export type DetailPelanggan = Pelanggan & {
  penjualan: Penjualan[];
  kuantitas_penjualan: number;
  total_penjualan: number;
};
