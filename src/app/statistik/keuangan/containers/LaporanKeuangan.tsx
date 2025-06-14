'use client';

import { ColumnDef } from '@tanstack/react-table';

import { formatCurrencyIDR } from '@/lib/currency';
import { formatMonthYear } from '@/lib/date';

import AdminLayout from '@/components/layouts/AdminLayout';
import { PaginatedTable } from '@/components/table/PaginatedTable';

import useGetLaporanKeuangan, {
  LaporanKeuangan,
} from '@/app/statistik/keuangan/hooks/useGetLaporanKeuangan';

export default function LaporanKeuanganPage() {
  const { data: laporanData, isLoading } = useGetLaporanKeuangan();
  const columns: ColumnDef<LaporanKeuangan>[] = [
    {
      accessorKey: 'bulan',
      cell: ({ getValue }) => {
        return formatMonthYear(getValue() as string);
      },
    },
    {
      accessorKey: 'total_pendapatan',
      cell: ({ getValue }) => {
        return formatCurrencyIDR(getValue() as number);
      },
      header: 'Total Pendapatan',
    },
    {
      accessorKey: 'total_biaya',
      cell: ({ getValue }) => {
        return formatCurrencyIDR(getValue() as number);
      },
      header: 'Total Biaya',
    },
    {
      accessorKey: 'laba_kotor',
      cell: ({ getValue }) => {
        return formatCurrencyIDR(getValue() as number);
      },
      header: 'Laba Kotor',
    },
  ];

  return (
    <AdminLayout
      title='Laporan Keuangan Bulanan'
      subheading='Halaman untuk melihat laporan keuangan bulanan.'
      breadcrumbs={['/', '/statistik/keuangan']}
    >
      <PaginatedTable
        columns={columns}
        data={laporanData?.data || []}
        isLoading={isLoading}
        withFilter
      />
    </AdminLayout>
  );
}
