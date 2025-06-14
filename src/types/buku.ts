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

export type DetailBuku = {
  buku_id: string;
  judul: string;
  nama_penulis: string;
  nama_penerbit: string;
  kategori: string;
  isbn: string;
  tahun_terbit: number;
  jumlah_halaman: number;
  nama_supplier: string;
  harga_beli: string;
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
