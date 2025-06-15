'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Eye } from 'lucide-react';

import { convertFromBukuId } from '@/lib/convert';

import AdminLayout from '@/components/layouts/AdminLayout';
import IconLink from '@/components/links/IconLink';
import { PaginatedTable } from '@/components/table/PaginatedTable';

import useGetBukuTerlaris from '@/app/statistik/buku-terlaris/hooks/useGetBukuTerlaris';

import { BukuTerlaris } from '@/types/buku';

export default function BukuTerlarisPage() {
  const { data: bukuData, isLoading } = useGetBukuTerlaris();
  const columns: ColumnDef<BukuTerlaris>[] = [
    {
      accessorKey: 'buku_id',
      header: 'Buku ID',
    },
    {
      accessorKey: 'judul',
      header: 'Judul Buku',
    },
    {
      accessorKey: 'sum',
      header: 'Jumlah Terjual',
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

  return (
    <AdminLayout
      title='Laporan Buku Terlaris'
      subheading='Halaman untuk melihat laporan buku terlaris.'
      breadcrumbs={['/', '/statistik/buku-terlaris']}
    >
      <PaginatedTable
        columns={columns}
        data={bukuData?.data || []}
        isLoading={isLoading}
        withFilter
      />
    </AdminLayout>
  );
}
