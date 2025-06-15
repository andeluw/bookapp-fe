'use client';
import { ColumnDef } from '@tanstack/react-table';
import { Eye } from 'lucide-react';
import { useParams } from 'next/navigation';

import { convertFromBukuId, convertToPembelianId } from '@/lib/convert';
import { formatCurrencyIDR } from '@/lib/currency';
import { formatDateString } from '@/lib/date';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/Card';
import AdminLayout from '@/components/layouts/AdminLayout';
import IconLink from '@/components/links/IconLink';
import { PaginatedTable } from '@/components/table/PaginatedTable';
import Typography from '@/components/Typography';

import { useGetDetailPembelian } from '@/app/pembelian/[id]/hooks/useGetDetailPembelian';

import { DetailTransaksiBuku } from '@/types/buku';

const pembelianColumns: ColumnDef<DetailTransaksiBuku>[] = [
  {
    accessorKey: 'isbn',
    header: 'ISBN',
  },
  {
    accessorKey: 'judul',
    header: 'Judul Buku',
  },
  {
    accessorKey: 'harga_beli',
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

export default function DetailPembelianPage() {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading } = useGetDetailPembelian(
    convertToPembelianId(parseInt(id))
  );
  const pembelian = data?.data;
  const pembelianData = [
    {
      title: 'Pembelian ID',
      value: pembelian?.pembelian_id,
    },
    {
      title: 'Tanggal Pembelian',
      value: formatDateString(pembelian?.tanggal_pembelian),
    },
    {
      title: 'Nama Supplier',
      value: pembelian?.nama_supplier,
    },
    {
      title: 'Nama Pegawai',
      value: pembelian?.nama_pegawai,
    },
    {
      title: 'Harga Akhir',
      value: formatCurrencyIDR(pembelian?.total as number) ?? '-',
    },
  ];
  return (
    <AdminLayout
      title='Detail Pembelian'
      subheading='Halaman untuk melihat detail pembelian buku.'
      breadcrumbs={['/', '/pembelian', '/pembelian/[id]']}
    >
      <div className='flex flex-col gap-8'>
        <Card>
          <CardHeader>
            <CardTitle className='text-lg'>Detail Pembelian</CardTitle>
          </CardHeader>
          <CardContent className='grid grid-cols-1 gap-5 sm:grid-cols-2'>
            {pembelianData?.map((pembelian) => (
              <div key={pembelian.title} className='flex flex-col gap-1'>
                <Typography variant='s3' className='text-muted-foreground'>
                  {pembelian.title}
                </Typography>
                <Typography variant='b2'>{pembelian.value ?? '-'}</Typography>
              </div>
            ))}
          </CardContent>
        </Card>

        <div className='flex flex-col gap-4'>
          <Typography variant='h3'>Detail Transaksi Buku</Typography>
          <PaginatedTable
            columns={pembelianColumns}
            data={pembelian?.buku || []}
            isLoading={isLoading}
            withFilter
          />
        </div>
      </div>
    </AdminLayout>
  );
}
