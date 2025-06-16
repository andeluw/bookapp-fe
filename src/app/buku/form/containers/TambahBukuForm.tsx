'use client';
import { Separator } from '@radix-ui/react-separator';
import { useRouter } from 'next/navigation';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import { formatCurrencyIDR } from '@/lib/currency';
import { useKategoriOptions } from '@/hooks/kategori/useGetKategori';
import { usePenerbitOptions } from '@/hooks/penerbit/useGetPenerbit';
import { usePenulisOptions } from '@/hooks/penulis/useGetPenulis';
import { useSupplierOptions } from '@/hooks/supplier/useGetSupplier';

import Button from '@/components/buttons/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/Card';
import ErrorMessage from '@/components/forms/ErrorMessage';
import Input from '@/components/forms/Input';
import { Label } from '@/components/forms/Label';
import Radio from '@/components/forms/Radio';
import Select from '@/components/forms/Select';
import AdminLayout from '@/components/layouts/AdminLayout';
import Typography from '@/components/Typography';

import useAuthStore from '@/stores/useAuthStore';

import { useTambahBukuMutation } from '@/app/buku/form/hooks/useTambahBukuMutation';

export type TambahBukuRequest = {
  judul: string;
  isbn: string;
  kategori_id: string;
  tahun_terbit: number;
  jumlah_halaman: number;
  pegawai_id: string;
  kuantitas: number;
  harga_beli: number;

  is_new_penerbit: string;
  penerbit_id?: string | null;
  pen_nama?: string | null;
  pen_alamat?: string | null;
  pen_no_telp?: string | null;

  is_new_penulis: string;
  penulis_id?: string | null;
  tul_nama_penulis?: string | null;

  is_new_supplier: string;
  supplier_id?: string | null;
  s_nama?: string | null;
  s_no_telp?: string | null;
  s_alamat?: string | null;
};

export default function TambahBukuForm() {
  const user = useAuthStore.useUser();
  const router = useRouter();

  const methods = useForm<TambahBukuRequest>({
    mode: 'onTouched',
    defaultValues: {
      is_new_supplier: 'false',
      is_new_penerbit: 'false',
      is_new_penulis: 'false',
    },
  });

  const {
    watch,
    handleSubmit,
    formState: { errors },
  } = methods;

  const isNewSupplier = watch('is_new_supplier') === 'true';
  const isNewPenerbit = watch('is_new_penerbit') === 'true';
  const isNewPenulis = watch('is_new_penulis') === 'true';

  const { supplierOptions, isLoading: isLoadingSuppliers } =
    useSupplierOptions();
  const { kategoriOptions, isLoading: isLoadingKategoris } =
    useKategoriOptions();
  const { penulisOptions, isLoading: isLoadingPenulis } = usePenulisOptions();
  const { penerbitOptions, isLoading: isLoadingPenerbit } =
    usePenerbitOptions();

  const { mutate: tambahBukuMutate, isPending } = useTambahBukuMutation();

  const onSubmit = (data: TambahBukuRequest) => {
    if (!user?.pegawai_id) {
      toast.error('Pegawai ID tidak ditemukan. Silakan login ulang.');
      router.push('/login');
      return;
    }
    const payload = {
      ...data,
      ...(data.is_new_penerbit === 'true'
        ? {
            pen_nama: data.pen_nama,
            pen_alamat: data.pen_alamat,
            pen_no_telp: data.pen_no_telp,
            penerbit_id: null,
          }
        : {
            penerbit_id: data.penerbit_id,
            pen_nama: null,
            pen_alamat: null,
            pen_no_telp: null,
          }),
      ...(data.is_new_penulis === 'true'
        ? {
            tul_nama_penulis: data.tul_nama_penulis,
            penulis_id: null,
          }
        : {
            penulis_id: data.penulis_id,
            tul_nama_penulis: null,
          }),
      ...(data.is_new_supplier === 'true'
        ? {
            s_nama: data.s_nama,
            s_no_telp: data.s_no_telp,
            s_alamat: data.s_alamat,
            supplier_id: null,
          }
        : {
            supplier_id: data.supplier_id,
            s_nama: null,
            s_no_telp: null,
            s_alamat: null,
          }),
      pegawai_id: user?.pegawai_id as string,
    };
    tambahBukuMutate(payload);
  };

  return (
    <AdminLayout
      title='Tambah Buku'
      subheading='Halaman untuk penambahan buku.'
      breadcrumbs={['/', '/buku/form']}
    >
      <FormProvider {...methods}>
        <form className='flex flex-col gap-8' onSubmit={handleSubmit(onSubmit)}>
          <Card>
            <CardHeader>
              <CardTitle className='text-xl'>Data Buku</CardTitle>
            </CardHeader>
            <CardContent className='grid grid-cols-1 gap-5 sm:grid-cols-2'>
              <Input
                id='judul'
                label='Judul Buku'
                placeholder='Masukkan judul buku'
                validation={{ required: 'Judul buku harus diisi' }}
              />
              <Input
                id='isbn'
                label='ISBN'
                placeholder='Masukkan ISBN buku'
                validation={{ required: 'ISBN buku harus diisi' }}
              />
              <Input
                id='tahun_terbit'
                label='Tahun Terbit'
                type='number'
                placeholder='Masukkan tahun terbit buku'
                validation={{
                  required: 'Tahun terbit buku harus diisi',
                  min: {
                    value: 1900,
                    message: 'Tahun terbit tidak boleh sebelum 1900',
                  },
                  max: {
                    value: parseInt(new Date().getFullYear().toString()),
                    message: `Tahun terbit tidak boleh lebih dari ${new Date().getFullYear()}`,
                  },
                }}
              />
              <Input
                id='jumlah_halaman'
                label='Jumlah Halaman'
                type='number'
                placeholder='Masukkan jumlah halaman buku'
                validation={{
                  required: 'Jumlah halaman buku harus diisi',
                  min: {
                    value: 1,
                    message: 'Jumlah halaman buku harus lebih dari 0',
                  },
                }}
              />
              <Select
                id='kategori_id'
                label='Kategori'
                placeholder='Pilih Kategori'
                isLoading={isLoadingKategoris}
                options={kategoriOptions || []}
                validation={{ required: 'Kategori harus dipilih' }}
              />
              <Input
                id='kuantitas'
                label='Kuantitas'
                type='number'
                placeholder='Masukkan kuantitas buku'
                validation={{
                  required: 'Kuantitas buku harus diisi',
                  min: {
                    value: 1,
                    message: 'Kuantitas buku harus lebih dari 0',
                  },
                }}
              />

              <Input
                id='harga_beli'
                label='Harga Beli'
                type='number'
                placeholder='Masukkan harga beli buku'
                validation={{
                  required: 'Harga beli buku harus diisi',
                  min: {
                    value: 0,
                    message: 'Harga beli buku tidak boleh kurang dari 0',
                  },
                }}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className='text-xl'>Data Penulis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className='flex flex-col justify-center gap-2 mb-4'>
                <Label required htmlFor='is_new_penulis'>
                  Nama Penulis
                </Label>
                <div className='flex flex-wrap items-center gap-x-6 gap-y-2'>
                  <Radio
                    name='is_new_penulis'
                    value='false'
                    label='Penulis Lama'
                  />

                  <Radio
                    name='is_new_penulis'
                    value='true'
                    label='Penulis Baru'
                  />
                </div>
                <ErrorMessage>
                  {errors.is_new_penulis?.message || ''}
                </ErrorMessage>
              </div>
              <div className='grid grid-cols-1 gap-5 sm:grid-cols-2'>
                {isNewPenulis ? (
                  <Input
                    id='tul_nama_penulis'
                    label='Nama Penulis'
                    placeholder='Masukkan nama penulis'
                    validation={{ required: 'Nama penulis harus diisi' }}
                  />
                ) : (
                  <Select
                    id='penulis_id'
                    label='Nama Penulis'
                    placeholder='Pilih Penulis'
                    isLoading={isLoadingPenulis}
                    options={penulisOptions || []}
                    validation={{ required: 'Penulis harus dipilih' }}
                  />
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className='text-xl'>Data Penerbit</CardTitle>
            </CardHeader>
            <CardContent>
              <div className='flex flex-col justify-center gap-2 mb-4'>
                <Label required htmlFor='is_new_penerbit'>
                  Nama Penerbit
                </Label>
                <div className='flex flex-wrap items-center gap-x-6 gap-y-2'>
                  <Radio
                    name='is_new_penerbit'
                    value='false'
                    label='Penerbit Lama'
                  />

                  <Radio
                    name='is_new_penerbit'
                    value='true'
                    label='Penerbit Baru'
                  />
                </div>
                <ErrorMessage>
                  {errors.is_new_penerbit?.message || ''}
                </ErrorMessage>
              </div>
              <div className='grid grid-cols-1 gap-5 sm:grid-cols-2'>
                {isNewPenerbit ? (
                  <React.Fragment>
                    <Input
                      id='pen_nama'
                      label='Nama Penerbit'
                      placeholder='Masukkan nama penerbit'
                      validation={{ required: 'Nama penerbit harus diisi' }}
                    />
                    <Input
                      id='pen_alamat'
                      label='Alamat Penerbit'
                      placeholder='Masukkan alamat penerbit'
                      validation={{ required: 'Alamat penerbit harus diisi' }}
                    />
                    <Input
                      id='pen_no_telp'
                      label='Nomor Telepon Penerbit'
                      placeholder='Masukkan no. telepon penerbit'
                      validation={{
                        required: 'Nomor telepon penerbit harus diisi',
                      }}
                    />
                    <Input
                      id='pen_email'
                      label='Email Penerbit'
                      placeholder='Masukkan email penerbit'
                      validation={{
                        required: 'Email penerbit harus diisi',
                      }}
                    />
                  </React.Fragment>
                ) : (
                  <Select
                    id='penerbit_id'
                    label='Nama Penerbit'
                    placeholder='Pilih Penerbit'
                    isLoading={isLoadingPenerbit}
                    options={penerbitOptions || []}
                    validation={{ required: 'Penerbit harus dipilih' }}
                  />
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className='text-xl'>Data Supplier</CardTitle>
            </CardHeader>
            <CardContent>
              <div className='flex flex-col justify-center gap-2 mb-4'>
                <Label required htmlFor='is_new_supplier'>
                  Jenis Supplier
                </Label>
                <div className='flex flex-wrap items-center gap-x-6 gap-y-2'>
                  <Radio
                    name='is_new_supplier'
                    value='false'
                    label='Supplier Lama'
                  />

                  <Radio
                    name='is_new_supplier'
                    value='true'
                    label='Supplier Baru'
                  />
                </div>
                <ErrorMessage>
                  {errors.is_new_supplier?.message || ''}
                </ErrorMessage>
              </div>
              <div className='grid grid-cols-1 gap-5 sm:grid-cols-2'>
                {isNewSupplier ? (
                  <React.Fragment>
                    <Input
                      id='s_nama'
                      label='Nama Supplier'
                      placeholder='Masukkan nama supplier'
                      validation={{ required: 'Nama supplier harus diisi' }}
                    />
                    <Input
                      id='s_no_telp'
                      label='No. Telepon'
                      placeholder='Masukkan no. telepon supplier'
                      validation={{
                        required: 'No. telepon supplier harus diisi',
                      }}
                    />
                    <Input
                      id='s_alamat'
                      label='Alamat'
                      placeholder='Masukkan alamat supplier'
                      validation={{ required: 'Alamat supplier harus diisi' }}
                    />
                  </React.Fragment>
                ) : (
                  <Select
                    id='supplier_id'
                    label='Nama Supplier'
                    placeholder='Pilih Supplier'
                    isLoading={isLoadingSuppliers}
                    options={supplierOptions || []}
                    validation={{ required: 'Supplier harus dipilih' }}
                  />
                )}
              </div>
            </CardContent>
          </Card>

          <Separator className='mt-4 bg-gray-200 w-full h-0.5' />
          <div className='flex flex-col gap-2 ml-auto items-end'>
            <Typography variant='h2'>Total Pembelian</Typography>
            <Typography variant='h1' className='text-primary-800'>
              {formatCurrencyIDR(watch('harga_beli') * watch('kuantitas'))}
            </Typography>
          </div>
          <Button type='submit' variant='primary' isLoading={isPending}>
            Tambah Buku
          </Button>
        </form>
      </FormProvider>
    </AdminLayout>
  );
}
