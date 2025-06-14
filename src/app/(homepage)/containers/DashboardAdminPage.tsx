import {
  BarChart,
  BookPlus,
  ClipboardList,
  DollarSign,
  FileSearch,
  FileStack,
  Lightbulb,
  PieChart,
  Receipt,
  RotateCcw,
  Search,
  ShoppingCart,
  Star,
  User,
  UserPlus,
  Users,
} from 'lucide-react';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/Card';
import AdminLayout from '@/components/layouts/AdminLayout';
import UnstyledLink from '@/components/links/UnstyledLink';
import Typography from '@/components/Typography';

const availablePages = [
  {
    title: 'Manajemen Buku',
    caption: 'Kelola data buku dan rekomendasi pembelian',
    pages: [
      {
        title: 'Rekomendasi Pembelian',
        url: '/buku/rekomendasi',
        caption: 'Lihat saran pembelian berdasarkan stok',
        icon: Lightbulb,
      },
      {
        title: 'Cari Buku',
        url: '/buku/cari',
        caption: 'Temukan buku berdasarkan judul, penulis, atau lainnya',
        icon: Search,
      },
      {
        title: 'Tambah Buku',
        url: '/buku/tambah',
        caption: 'Tambahkan buku baru ke dalam katalog',
        icon: BookPlus,
      },
    ],
  },
  {
    title: 'Transaksi',
    caption: 'Kelola pembelian dan penjualan buku',
    pages: [
      {
        title: 'Pembelian Buku',
        url: '/pembelian/form',
        caption: 'Catat transaksi pembelian buku dari supplier',
        icon: ShoppingCart,
      },
      {
        title: 'Daftar Pembelian',
        url: '/pembelian',
        caption: 'Lihat seluruh riwayat pembelian buku',
        icon: FileStack,
      },
      {
        title: 'Detail Pembelian',
        url: '/pembelian/detail',
        caption: 'Periksa rincian transaksi pembelian',
        icon: FileSearch,
      },
      {
        title: 'Penjualan Buku',
        url: '/penjualan/form',
        caption: 'Lakukan transaksi penjualan buku ke pelanggan',
        icon: DollarSign,
      },
      {
        title: 'Daftar Penjualan',
        url: '/penjualan',
        caption: 'Lihat seluruh riwayat penjualan buku',
        icon: ClipboardList,
      },
      {
        title: 'Detail Penjualan',
        url: '/penjualan/detail',
        caption: 'Periksa rincian transaksi penjualan',
        icon: Receipt,
      },
    ],
  },
  {
    title: 'Keanggotaan',
    caption: 'Kelola data keanggotaan pelanggan',
    pages: [
      {
        title: 'Lihat Pengguna',
        url: '/membership/pengguna',
        caption: 'Lihat daftar pengguna yang terdaftar sebagai anggota',
        icon: Users,
      },
      {
        title: 'Buat Membership',
        url: '/membership/buat',
        caption: 'Tambahkan anggota baru untuk pelanggan',
        icon: UserPlus,
      },
      {
        title: 'Renew Membership',
        url: '/membership/renew',
        caption: 'Perpanjang masa berlaku keanggotaan',
        icon: RotateCcw,
      },
    ],
  },
  {
    title: 'Statistik',
    caption: 'Lihat data performa penjualan dan keuangan',
    pages: [
      {
        title: 'Buku Terlaris',
        url: '/statistik/buku-terlaris',
        caption: 'Lihat daftar buku dengan penjualan terbanyak',
        icon: Star,
      },
      {
        title: 'Tren Kategori',
        url: '/statistik/tren-kategori',
        caption: 'Analisis penjualan berdasarkan kategori buku',
        icon: PieChart,
      },
      {
        title: 'Statistik Keuangan',
        url: '/statistik/keuangan',
        caption: 'Lihat ringkasan pemasukan dan pengeluaran',
        icon: BarChart,
      },
    ],
  },
  {
    title: 'Manajemen Profil',
    caption: 'Kelola akun dan pengaturan admin',
    pages: [
      {
        title: 'Profil Admin',
        url: '/profil',
        caption: 'Lihat dan edit informasi profil admin',
        icon: User,
      },
    ],
  },
];
export default function DashboardAdminPage() {
  return (
    <AdminLayout
      breadcrumbs={['/']}
      title='Dashboard Admin'
      subheading='Selamat datang di dashboard admin. Kelola seluruh proses transaksi dan manajemen toko buku dengan mudah.'
    >
      <div className='flex flex-col gap-8'>
        {availablePages.map((section) => (
          <Card key={section.title}>
            <CardHeader>
              <CardTitle>{section.title}</CardTitle>
              <CardDescription>{section.caption}</CardDescription>
            </CardHeader>
            <CardContent className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'>
              {section.pages.map((page) => (
                <UnstyledLink
                  key={page.title}
                  href={page.url}
                  className='flex flex-col items-center justify-center gap-1.5 rounded-lg border border-border p-4 text-center transition-colors hover:bg-primary-50'
                >
                  <div className='flex items-center justify-center w-14 h-14 rounded-md bg-primary-100 text-primary-800 p-2'>
                    <page.icon className='h-8 w-8 text-primary-800' />
                  </div>
                  <Typography
                    variant='s3'
                    className='text-primary-800 font-semibold mt-2'
                  >
                    {page.title}
                  </Typography>
                  <Typography variant='s4' className='text-muted-foreground'>
                    {page.caption}
                  </Typography>
                </UnstyledLink>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
    </AdminLayout>
  );
}
