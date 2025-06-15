'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Eye, Plus } from 'lucide-react';

import { convertFromPenjualanId } from '@/lib/convert';
import { formatCurrencyIDR } from '@/lib/currency';
import { formatDateString } from '@/lib/date';

import AdminLayout from '@/components/layouts/AdminLayout';
import ButtonLink from '@/components/links/ButtonLink';
import IconLink from '@/components/links/IconLink';
import { PaginatedTable } from '@/components/table/PaginatedTable';

import useGetDaftarPenjualan from '@/app/penjualan/hooks/useGetDaftarPenjualan';

import { Penjualan } from '@/types/penjualan';

export default function DaftarPenjualanPage() {
  const { data: penjualanData, isLoading } = useGetDaftarPenjualan();
  const columns: ColumnDef<Penjualan>[] = [
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
      accessorKey: 'total',
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

  return (
    <AdminLayout
      title='Daftar Penjualan Buku'
      subheading='Halaman untuk melihat daftar penjualan buku.'
      breadcrumbs={['/', '/penjualan']}
    >
      <div className='flex w-full justify-end'>
        <ButtonLink
          href='/penjualan/form'
          variant='primary'
          className='w-fit'
          rightIcon={Plus}
        >
          Tambah Penjualan
        </ButtonLink>
      </div>
      <PaginatedTable
        columns={columns}
        data={penjualanData?.data || []}
        isLoading={isLoading}
        withFilter
      />
    </AdminLayout>
  );
}
