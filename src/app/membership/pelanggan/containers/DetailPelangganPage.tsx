'use client';
import { ColumnDef } from '@tanstack/react-table';
import { Eye } from 'lucide-react';
import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import { convertFromPenjualanId } from '@/lib/convert';
import { formatCurrencyIDR } from '@/lib/currency';
import { formatDateString } from '@/lib/date';
import useGetDetailPelanggan from '@/hooks/pelanggan/useGetDetailPelanggan';

import Button from '@/components/buttons/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/Card';
import Input from '@/components/forms/Input';
import AdminLayout from '@/components/layouts/AdminLayout';
import IconLink from '@/components/links/IconLink';
import { PaginatedTable } from '@/components/table/PaginatedTable';
import Typography from '@/components/Typography';

import { Penjualan } from '@/types/penjualan';

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
    accessorKey: 'metode_pembayaran',
    header: 'Metode Pembayaran',
  },
  {
    accessorKey: 'kuantitas',
    header: 'Kuantitas',
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

export default function DetailPelangganPage() {
  const [noTelp, setNoTelp] = useState<string>('');
  const methods = useForm<{
    no_telp: string;
  }>();
  const { watch, setValue, setError } = methods;
  const {
    data,
    isLoading,
    isError,
    error: pelangganError,
  } = useGetDetailPelanggan({ noTelp });
  const pelanggan = data?.data;
  const pelangganData = [
    {
      title: 'Nama Pelanggan',
      value: pelanggan?.nama || '-',
    },
    {
      title: 'Nomor Telepon',
      value: pelanggan?.no_telp || '-',
    },
    {
      title: 'Alamat',
      value: pelanggan?.alamat || '-',
    },
    {
      title: 'Pelanggan ID',
      value: pelanggan?.pelanggan_id || '-',
    },
    {
      title: 'Membership ID',
      value: pelanggan?.membership_id ? pelanggan.membership_id : '-',
    },
    {
      title: 'Tipe Membership',
      value: pelanggan?.tipe || '-',
    },
    {
      title: 'Tanggal Pembuatan',
      value: pelanggan?.tanggal_pembuatan
        ? formatDateString(pelanggan.tanggal_pembuatan)
        : '-',
    },
    {
      title: 'Tanggal Berakhir',
      value: pelanggan?.tanggal_kadaluwarsa
        ? formatDateString(pelanggan.tanggal_kadaluwarsa)
        : '-',
    },
  ];

  function handleNoTelp() {
    setNoTelp(watch('no_telp') || '');
  }

  useEffect(() => {
    if (isError) {
      toast.error(
        pelangganError.response?.data.error || 'Pelanggan tidak ditemukan'
      );
      setValue('no_telp', '');
      setError('no_telp', {
        type: 'manual',
        message:
          pelangganError.response?.data.error || 'Pelanggan tidak ditemukan',
      });
    }
  }, [isError, data, setValue, setError, pelangganError]);

  return (
    <AdminLayout
      title='Detail Pelanggan'
      subheading='Halaman untuk melihat detail pelanggan.'
      breadcrumbs={['/', '/membership/pelanggan']}
    >
      <FormProvider {...methods}>
        <form className='flex gap-4 mb-4 items-end'>
          <Input
            id='no_telp'
            label='Nomor Telepon'
            placeholder='Masukkan nomor telepon pelanggan'
            containerClassName='w-1/2'
            hideError
          />
          <Button
            variant='primary'
            className='h-10'
            onClick={handleNoTelp}
            isLoading={isLoading}
            disabled={!watch('no_telp')?.length}
          >
            Cari Pelanggan
          </Button>
        </form>
      </FormProvider>
      <div className='flex flex-col gap-8'>
        <Card>
          <CardHeader>
            <CardTitle className='text-lg'>Detail Pelanggan</CardTitle>
          </CardHeader>
          <CardContent className='grid grid-cols-1 gap-5 sm:grid-cols-2'>
            {pelangganData?.map((pelanggan) => (
              <div key={pelanggan.title} className='flex flex-col gap-1'>
                <Typography variant='s3' className='text-muted-foreground'>
                  {pelanggan.title}
                </Typography>
                <Typography variant='b2'>{pelanggan.value ?? '-'}</Typography>
              </div>
            ))}
          </CardContent>
        </Card>

        <div className='flex flex-col gap-4'>
          <Typography variant='h3'>Detail Pembelian Oleh Pelanggan</Typography>
          <PaginatedTable
            columns={penjualanColumns}
            data={pelanggan?.penjualan || []}
            isLoading={isLoading}
            withFilter
          />
        </div>
      </div>
    </AdminLayout>
  );
}
