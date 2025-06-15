'use client';
import { ColumnDef } from '@tanstack/react-table';
import { Eye } from 'lucide-react';
import { useParams } from 'next/navigation';

import { convertFromBukuId, convertToPenjualanId } from '@/lib/convert';
import { formatCurrencyIDR } from '@/lib/currency';
import { formatDateString } from '@/lib/date';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/Card';
import AdminLayout from '@/components/layouts/AdminLayout';
import IconLink from '@/components/links/IconLink';
import { PaginatedTable } from '@/components/table/PaginatedTable';
import Typography from '@/components/Typography';

import { useGetDetailPenjualan } from '@/app/penjualan/[id]/hooks/useGetDetailPenjualan';

import { DetailTransaksiBuku } from '@/types/buku';

const penjualanColumns: ColumnDef<DetailTransaksiBuku>[] = [
  {
    accessorKey: 'isbn',
    header: 'ISBN',
  },
  {
    accessorKey: 'judul',
    header: 'Judul Buku',
  },
  {
    accessorKey: 'harga_jual',
    header: 'Harga Per Buku',
    cell: ({ getValue }) => formatCurrencyIDR(getValue() as number),
  },
  {
    accessorKey: 'kuantitas',
    header: 'Kuantitas',
  },
  {
    accessorKey: 'subtotal',
    header: 'Subtotal',
    cell: ({ getValue }) => formatCurrencyIDR(getValue() as number),
  },
  {
    accessorKey: 'buku_id',
    header: 'Aksi',
    enableSorting: false,
    cell: ({ getValue }) => (
      <IconLink
        icon={Eye}
        href={`/buku/detail/${convertFromBukuId(getValue() as string)}`}
      />
    ),
  },
];

export default function DetailPenjualanPage() {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading } = useGetDetailPenjualan(
    convertToPenjualanId(parseInt(id))
  );
  const penjualan = data?.data;
  const penjualanData = [
    {
      title: 'Penjualan ID',
      value: penjualan?.penjualan_id,
    },
    {
      title: 'Tanggal Penjualan',
      value: formatDateString(penjualan?.tanggal_penjualan),
    },
    {
      title: 'Nama Pelanggan',
      value: penjualan?.nama_pelanggan,
    },
    {
      title: 'Nama Pegawai',
      value: penjualan?.nama_pegawai,
    },
    {
      title: 'Metode Pembayaran',
      value: penjualan?.metode_pembayaran,
    },
    {
      title: 'Diskon',
      value: `${penjualan?.diskon}%`,
    },
    {
      title: 'Harga Akhir',
      value: formatCurrencyIDR(penjualan?.total as number) ?? '-',
    },
  ];
  return (
    <AdminLayout
      title='Detail Penjualan'
      subheading='Halaman untuk melihat detail penjualan buku.'
      breadcrumbs={['/', '/penjualan', '/penjualan/[id]']}
    >
      <div className='flex flex-col gap-8'>
        <Card>
          <CardHeader>
            <CardTitle className='text-lg'>Detail Penjualan</CardTitle>
          </CardHeader>
          <CardContent className='grid grid-cols-1 gap-5 sm:grid-cols-2'>
            {penjualanData?.map((penjualan) => (
              <div key={penjualan.title} className='flex flex-col gap-1'>
                <Typography variant='s3' className='text-muted-foreground'>
                  {penjualan.title}
                </Typography>
                <Typography variant='b2'>{penjualan.value ?? '-'}</Typography>
              </div>
            ))}
          </CardContent>
        </Card>

        <div className='flex flex-col gap-4'>
          <Typography variant='h3'>Detail Transaksi Buku</Typography>
          <PaginatedTable
            columns={penjualanColumns}
            data={penjualan?.buku || []}
            isLoading={isLoading}
            withFilter
          />
        </div>
      </div>
    </AdminLayout>
  );
}
