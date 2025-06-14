export const navigation = {
  navMain: [
    {
      title: 'Dashboard',
      url: '/',
      items: [
        {
          title: 'Dashboard',
          url: '/',
          exactMatch: true,
        },
        {
          title: 'Profil Admin',
          url: '/profil',
          exactMatch: true,
        },
      ],
    },
    {
      title: 'Manajemen Buku',
      url: '#',
      items: [
        {
          title: 'Rekomendasi Pembelian',
          url: '/buku/rekomendasi',
        },
        {
          title: 'Cari Buku',
          url: '/buku/cari',
        },
        {
          title: 'Tambah Buku',
          url: '/buku/tambah',
        },
      ],
    },
    {
      title: 'Transaksi',
      url: '#',
      items: [
        {
          title: 'Pembelian Buku',
          url: '/pembelian/form',
        },
        {
          title: 'Daftar Pembelian',
          url: '/pembelian',
          exactMatch: true,
        },
        {
          title: 'Detail Pembelian',
          url: '/pembelian/detail',
        },
        {
          title: 'Penjualan Buku',
          url: '/penjualan/form',
        },
        {
          title: 'Daftar Penjualan',
          url: '/penjualan',
          exactMatch: true,
        },
        {
          title: 'Detail Penjualan',
          url: '/penjualan/detail',
        },
      ],
    },
    {
      title: 'Keanggotaan',
      url: '#',
      items: [
        {
          title: 'Lihat Pengguna',
          url: '/membership/pengguna',
        },
        {
          title: 'Buat Membership',
          url: '/membership/buat',
        },
        {
          title: 'Renew Membership',
          url: '/membership/renew',
        },
      ],
    },
    {
      title: 'Statistik',
      url: '#',
      items: [
        {
          title: 'Buku Terlaris',
          url: '/statistik/buku-terlaris',
        },
        {
          title: 'Tren Kategori',
          url: '/statistik/tren-kategori',
        },
        {
          title: 'Statistik Keuangan',
          url: '/statistik/keuangan',
        },
      ],
    },
  ],
};
