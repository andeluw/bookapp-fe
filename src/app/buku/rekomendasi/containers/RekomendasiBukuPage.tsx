'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Eye } from 'lucide-react';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { convertFromBukuId } from '@/lib/convert';

import Button from '@/components/buttons/Button';
import Input from '@/components/forms/Input';
import { Label } from '@/components/forms/Label';
import AdminLayout from '@/components/layouts/AdminLayout';
import IconLink from '@/components/links/IconLink';
import { PaginatedTable } from '@/components/table/PaginatedTable';
import Typography from '@/components/Typography';

import useGetRekomendasiBuku from '@/app/buku/rekomendasi/hooks/useGetRekomendasiBuku';

import { RekomendasiBuku } from '@/types/buku';

export type RekomendasiRequest = {
  max_stock: number;
};

export default function RekomendasiBukuPage() {
  const [maxStock, setMaxStock] = useState<number>(25);
  const methods = useForm<RekomendasiRequest>({
    mode: 'onTouched',
    defaultValues: {
      max_stock: 25,
    },
  });
  const { handleSubmit } = methods;

  const { data: rekomendasiData, isLoading } = useGetRekomendasiBuku({
    maxStock: maxStock,
  });
  const columns: ColumnDef<RekomendasiBuku>[] = [
    {
      accessorKey: 'buku_id',
      header: 'ID Buku',
    },
    {
      accessorKey: 'judul',
      header: 'Judul Buku',
    },
    {
      accessorKey: 'jumlah_stok',
      header: 'Jumlah Stok',
    },
    {
      accessorKey: 'nama_supplier',
      header: 'Nama Supplier',
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

  const onSubmit = (data: RekomendasiRequest) => {
    setMaxStock(data.max_stock);
  };

  return (
    <AdminLayout
      title='Rekomendasi Pembelian'
      subheading='Halaman rekomendasi buku untuk pembelian'
      breadcrumbs={['/', '/buku/rekomendasi']}
    >
      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='flex flex-col gap-2 max-w-[300px]'
        >
          <Label htmlFor='max_stock'>Batas Stok Maksimum</Label>
          <div className='flex items-center gap-2 mb-2'>
            <Input
              type='number'
              id='max_stock'
              validation={{
                required: 'Batas stok maksimum harus diisi',
                min: {
                  value: 0,
                  message: 'Batas stok maksimum tidak boleh kurang dari 0',
                },
              }}
              hideError
            />
            <Button
              type='submit'
              variant='primary'
              className='h-10'
              isLoading={isLoading}
            >
              Cari
            </Button>
          </div>
        </form>
      </FormProvider>
      <div className='space-y-4'>
        <div className='flex items-center justify-between'>
          <Typography variant='h2'>
            Hasil Rekomendasi Pembelian dengan Stok Maksimum: {maxStock}
          </Typography>
          {/* <Button
            variant='secondary'
            rightIcon={ShoppingCart}
            className='flex items-center gap-2'
          >
            Beli Rekomendasi Pembelian
          </Button> */}
        </div>
        <PaginatedTable
          columns={columns}
          data={rekomendasiData?.data || []}
          withFilter
        />
      </div>
    </AdminLayout>
  );
}
