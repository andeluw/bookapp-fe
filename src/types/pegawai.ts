import { Pembelian } from '@/types/pembelian';
import { Penjualan } from '@/types/penjualan';

export type Pegawai = {
  pegawai_id: string;
  nama: string;
  email: string;
  jenis_kelamin: 'M' | 'F';
  no_telp: string;
  tanggal_lahir: string;
};

export type DetailPegawai = {
  detail: Pegawai;
  pembelian: Pembelian[];
  penjualan: Penjualan[];
  kuantitas_pembelian: number;
  kuantitas_penjualan: number;
  total_pembelian: number;
  total_penjualan: number;
};
