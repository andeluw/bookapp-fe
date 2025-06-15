import { Pembelian } from '@/types/pembelian';
import { Penjualan } from '@/types/penjualan';

export type Buku = {
  buku_id: string;
  judul: string;
  nama_penulis: string;
  kategori: string;
  isbn: string;
  tahun_terbit: number;
  jumlah_halaman: number;
  harga_jual: string;
  jumlah_stok: number;
};

export type RekomendasiBuku = {
  buku_id: string;
  judul: string;
  jumlah_stok: number;
  nama_supplier: string;
};

export type BukuTerlaris = {
  buku_id: string;
  judul: string;
  sum: number;
};

export type DetailTransaksiBuku = {
  buku_id: string;
  judul: string;
  penulis: string;
  nama_penerbit: string;
  nama_kategori: string;
  isbn: string;
  tahun_terbit: number;
  jumlah_halaman: number;
  harga_beli?: number;
  harga_jual: number;
  kuantitas: number;
  subtotal: number;
};

export type DetailBuku = DetailTransaksiBuku & {
  pembelian: Pembelian[];
  penjualan: Penjualan[];
};
