'use client';

import { ColumnDef } from '@tanstack/react-table';

import { formatMonthYear } from '@/lib/date';

import AdminLayout from '@/components/layouts/AdminLayout';
import { PaginatedTable } from '@/components/table/PaginatedTable';

import useGetTrenKategori from '@/app/statistik/tren-kategori/hooks/useGetTrenKategori';

import { KategoriStatistik } from '@/types/kategori';

export default function TrenKategoriPage() {
  const { data: kategoriData, isLoading } = useGetTrenKategori();
  const columns: ColumnDef<KategoriStatistik>[] = [
    {
      accessorKey: 'nama',
      header: 'Nama Kategori',
    },
    {
      accessorKey: 'bulan',
      cell: ({ getValue }) => {
        return formatMonthYear(getValue() as string);
      },
    },
    {
      accessorKey: 'total_terjual',
      header: 'Jumlah Terjual',
    },
  ];

  return (
    <AdminLayout
      title='Laporan Tren Kategori'
      subheading='Halaman untuk melihat laporan tren kategori.'
      breadcrumbs={['/', '/statistik/tren-kategori']}
    >
      <PaginatedTable
        columns={columns}
        data={kategoriData?.data || []}
        isLoading={isLoading}
        withFilter
      />
    </AdminLayout>
  );
}
