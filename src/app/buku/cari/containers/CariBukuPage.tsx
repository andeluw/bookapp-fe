'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Eye } from 'lucide-react';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { convertFromBukuId } from '@/lib/convert';
import useGetBuku from '@/hooks/buku/useGetBuku';
import { useKategoriNameOptions } from '@/hooks/kategori/useGetKategori';

import Button from '@/components/buttons/Button';
import Input from '@/components/forms/Input';
import Select from '@/components/forms/Select';
import AdminLayout from '@/components/layouts/AdminLayout';
import IconLink from '@/components/links/IconLink';
import { PaginatedTable } from '@/components/table/PaginatedTable';
import Typography from '@/components/Typography';

import { Buku } from '@/types/buku';

export type FilterBuku = {
  keyword?: string;
  kategori?: string;
  tahun_terbit?: number;
};

export default function CariBukuPage() {
  const [filters, setFilters] = useState<FilterBuku>({
    keyword: '',
    kategori: '',
    tahun_terbit: undefined,
  });
  const methods = useForm<FilterBuku>({
    mode: 'onTouched',
  });
  const { handleSubmit } = methods;

  const { data: bukuData } = useGetBuku(filters);

  const { kategoriNameOptions, isLoading: isLoadingKategoris } =
    useKategoriNameOptions();

  const onSubmit = (data: FilterBuku) => {
    setFilters(data);
  };

  const columns: ColumnDef<Buku>[] = [
    {
      accessorKey: 'isbn',
      header: 'ISBN',
    },
    {
      accessorKey: 'judul',
      header: 'Judul Buku',
    },
    {
      accessorKey: 'kategori',
      header: 'Kategori',
    },
    {
      accessorKey: 'nama_penulis',
      header: 'Nama Penulis',
    },
    {
      accessorKey: 'tahun_terbit',
      header: 'Tahun Terbit',
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
      title='Cari Buku'
      subheading='Halaman untuk mencari buku yang tersedia di toko.'
      breadcrumbs={['/', '/buku/cari']}
    >
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-2'>
          <div className='flex gap-2 mb-2'>
            <div className='flex flex-col gap-4 w-full'>
              <div className='flex items-end justify-between gap-2'>
                <Input
                  id='keyword'
                  label='Kata Kunci'
                  placeholder='Cari berdasarkan judul, ISBN, atau nama penulis'
                />
                <Button type='submit' variant='primary' className='h-10'>
                  Cari Buku
                </Button>
              </div>
              <div className='grid grid-cols-2 gap-2 w-full'>
                <Select
                  id='kategori'
                  label='Kategori'
                  placeholder='Pilih Kategori'
                  options={kategoriNameOptions}
                  isLoading={isLoadingKategoris}
                />
                <Input
                  id='tahun_terbit'
                  label='Tahun Terbit'
                  placeholder='Tahun Terbit'
                  type='number'
                />
              </div>
            </div>
          </div>
        </form>
      </FormProvider>
      <div className='space-y-4 mt-8'>
        <div className='flex items-center justify-between'>
          <Typography variant='h2'>
            Hasil Pencarian Buku dengan Kriteria:
          </Typography>
        </div>
        <PaginatedTable
          columns={columns}
          data={bukuData?.data || []}
          withFilter
          emptyPlaceholder='Tidak ada buku yang ditemukan dengan kriteria tersebut.'
        />
      </div>
    </AdminLayout>
  );
}
