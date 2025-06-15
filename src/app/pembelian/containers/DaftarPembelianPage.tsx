'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Eye, Plus } from 'lucide-react';

import { convertFromPembelianId } from '@/lib/convert';
import { formatCurrencyIDR } from '@/lib/currency';
import { formatDateString } from '@/lib/date';

import AdminLayout from '@/components/layouts/AdminLayout';
import ButtonLink from '@/components/links/ButtonLink';
import IconLink from '@/components/links/IconLink';
import { PaginatedTable } from '@/components/table/PaginatedTable';

import useGetDaftarPembelian from '@/app/pembelian/hooks/useGetDaftarPembelian';

import { Pembelian } from '@/types/pembelian';

export default function DaftarPembelianPage() {
  const { data: pembelianData, isLoading } = useGetDaftarPembelian();
  const columns: ColumnDef<Pembelian>[] = [
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
      accessorKey: 'total',
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

  return (
    <AdminLayout
      title='Daftar Pembelian Buku'
      subheading='Halaman untuk melihat daftar pembelian buku.'
      breadcrumbs={['/', '/pembelian']}
    >
      <div className='flex w-full justify-end'>
        <ButtonLink
          href='/pembelian/form'
          variant='primary'
          className='w-fit'
          rightIcon={Plus}
        >
          Tambah Pembelian
        </ButtonLink>
      </div>
      <PaginatedTable
        columns={columns}
        data={pembelianData?.data || []}
        isLoading={isLoading}
        withFilter
      />
    </AdminLayout>
  );
}
