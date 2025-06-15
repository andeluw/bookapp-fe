'use client';
import { ColumnDef } from '@tanstack/react-table';
import { Eye } from 'lucide-react';
import { useParams } from 'next/navigation';

import {
  convertFromPembelianId,
  convertFromPenjualanId,
  convertToBukuId,
} from '@/lib/convert';
import { formatCurrencyIDR } from '@/lib/currency';
import { formatDateString } from '@/lib/date';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/Card';
import AdminLayout from '@/components/layouts/AdminLayout';
import IconLink from '@/components/links/IconLink';
import { PaginatedTable } from '@/components/table/PaginatedTable';
import Typography from '@/components/Typography';

import { useGetDetailBuku } from '@/app/buku/detail/[id]/hooks/useGetDetailBuku';

import { Pembelian } from '@/types/pembelian';
import { Penjualan } from '@/types/penjualan';

const pembelianColumns: ColumnDef<Pembelian>[] = [
  {
    accessorKey: 'pembelian_id',
    header: 'Pembelian ID',
  },
  {
    accessorKey: 'tanggal_pembelian',
    header: 'Tanggal Pembelian',
    cell: ({ getValue }) => formatDateString(getValue() as string),
  },
  {
    accessorKey: 'nama_pegawai',
    header: 'Nama Pegawai',
  },
  {
    accessorKey: 'nama_supplier',
    header: 'Nama Supplier',
  },
  {
    accessorKey: 'kuantitas',
    header: 'Kuantitas',
  },
  {
    accessorKey: 'subtotal',
    header: 'Total',
    cell: ({ getValue }) => formatCurrencyIDR(getValue() as number),
  },
  {
    accessorKey: 'pembelian_id',
    header: 'Aksi',
    enableSorting: false,
    cell: ({ getValue }) => (
      <IconLink
        icon={Eye}
        href={`/pembelian/${convertFromPembelianId(getValue() as string)}`}
      />
    ),
  },
];

const penjualanColumns: ColumnDef<Penjualan>[] = [
  {
    accessorKey: 'penjualan_id',
    header: 'Penjualan ID',
  },
  {
    accessorKey: 'tanggal_penjualan',
    header: 'Tanggal Penjualan',
    cell: ({ getValue }) => formatDateString(getValue() as string),
  },
  {
    accessorKey: 'nama_pelanggan',
    header: 'Nama Pelanggan',
  },
  {
    accessorKey: 'nama_pegawai',
    header: 'Nama Pegawai',
  },
  {
    accessorKey: 'subtotal',
    header: 'Total',
    cell: ({ getValue }) => formatCurrencyIDR(getValue() as number),
  },
  {
    accessorKey: 'penjualan_id',
    header: 'Aksi',
    enableSorting: false,
    cell: ({ getValue }) => (
      <IconLink
        icon={Eye}
        href={`/penjualan/${convertFromPenjualanId(getValue() as string)}`}
      />
    ),
  },
];

export default function DetailBukuPage() {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading } = useGetDetailBuku(convertToBukuId(parseInt(id)));
  const buku = data?.data;
  const bukuData = [
    {
      title: 'Buku ID',
      value: buku?.buku_id,
    },
    {
      title: 'ISBN',
      value: buku?.isbn,
    },
    {
      title: 'Judul Buku',
      value: buku?.judul,
    },
    {
      title: 'Kategori',
      value: buku?.nama_kategori ?? '-',
    },
    {
      title: 'Nama Penulis',
      value: buku?.penulis,
    },
    {
      title: 'Nama Penerbit',
      value: buku?.nama_penerbit ?? '-',
    },
    {
      title: 'Jumlah Halaman',
      value: buku?.jumlah_halaman?.toString() ?? '-',
    },
    {
      title: 'Tahun Terbit',
      value: buku?.tahun_terbit?.toString() ?? '-',
    },
    {
      title: 'Harga Beli',
      value: formatCurrencyIDR(buku?.harga_beli as number) ?? '-',
    },
    {
      title: 'Harga Jual',
      value: formatCurrencyIDR(buku?.harga_jual as number) ?? '-',
    },
  ];
  return (
    <AdminLayout
      title='Detail Buku'
      subheading='Halaman untuk melihat detail buku.'
      breadcrumbs={['/', '/buku/cari', '/buku/detail/[id]']}
    >
      <div className='flex flex-col gap-8'>
        <Card>
          <CardHeader>
            <CardTitle className='text-lg'>Detail Buku</CardTitle>
          </CardHeader>
          <CardContent className='grid grid-cols-1 gap-5 sm:grid-cols-2'>
            {bukuData?.map((buku) => (
              <div key={buku.title} className='flex flex-col gap-1'>
                <Typography variant='s3' className='text-muted-foreground'>
                  {buku.title}
                </Typography>
                <Typography variant='b2'>{buku.value ?? '-'}</Typography>
              </div>
            ))}
          </CardContent>
        </Card>

        <div className='flex flex-col gap-4 mt-8'>
          <Typography variant='h3'>Daftar Pembelian Buku</Typography>
          <PaginatedTable
            columns={pembelianColumns}
            data={buku?.pembelian || []}
            isLoading={isLoading}
            withFilter
            pageSize={5}
          />
        </div>

        <div className='flex flex-col gap-4'>
          <Typography variant='h3'>Daftar Penjualan Buku</Typography>
          <PaginatedTable
            columns={penjualanColumns}
            data={buku?.penjualan || []}
            isLoading={isLoading}
            withFilter
            pageSize={5}
          />
        </div>
      </div>
    </AdminLayout>
  );
}
