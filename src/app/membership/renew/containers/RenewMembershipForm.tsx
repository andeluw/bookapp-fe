'use client';
import React, { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import useGetPelanggan from '@/hooks/pelanggan/useGetPelanggan';

import Button from '@/components/buttons/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/Card';
import Input from '@/components/forms/Input';
import Select from '@/components/forms/Select';
import AdminLayout from '@/components/layouts/AdminLayout';

import { useRenewMembershipMutation } from '@/app/membership/renew/hooks/useRenewMembershipMutation';

export type RenewMembershipForm = {
  nama: string;
  tipe: string;
  alamat: string;
  no_telp: string;
  no_telp2?: string;
  tanggal_kadaluwarsa: Date | string;
  membership_id?: string;
  tanggal_pembuatan?: Date | string;
};

export type RenewMembershipRequest = Omit<
  RenewMembershipForm,
  'tanggal_pembuatan' | 'membership_id'
>;

export default function RenewMembershipForm() {
  const [noTelp, setNoTelp] = useState<string>('');
  const [isNoTelpValid, setIsNoTelpValid] = useState<boolean>(false);
  const methods = useForm<RenewMembershipForm>({
    mode: 'onTouched',
  });

  const { watch, setValue, handleSubmit, setError } = methods;

  const currNoTelp = watch('no_telp');

  const {
    data,
    isLoading,
    isError,
    error: pelangganError,
    isSuccess,
  } = useGetPelanggan({ noTelp });
  const pelanggan = data?.data;

  useEffect(() => {
    if (isSuccess && pelanggan) {
      setValue('nama', pelanggan.nama);
      setValue('alamat', pelanggan.alamat);
      setValue('no_telp', pelanggan.no_telp);
      setValue('membership_id', pelanggan.membership_id);
      setValue('tipe', pelanggan.tipe);
      setValue('tanggal_pembuatan', pelanggan.tanggal_pembuatan.slice(0, 10));
      setValue(
        'tanggal_kadaluwarsa',
        pelanggan.tanggal_kadaluwarsa.slice(0, 10)
      );
      setIsNoTelpValid(true);
    }
    if (isError && pelangganError) {
      setValue('nama', '');
      setValue('alamat', '');
      setValue('no_telp', '');
      setValue('membership_id', '');
      setValue('tipe', '');
      setValue('tanggal_pembuatan', '');
      setValue('tanggal_kadaluwarsa', '');
      setIsNoTelpValid(false);
      setError('no_telp', {
        type: 'manual',
        message: pelangganError.message,
      });
    }
  }, [isSuccess, pelanggan, setValue, isError, pelangganError, setError]);

  const { mutate: renew, isPending } = useRenewMembershipMutation();

  const onSubmit = (data: RenewMembershipRequest) => {
    renew(data);
  };

  function handleNoTelp() {
    setNoTelp(currNoTelp);
  }

  return (
    <AdminLayout
      title='Renew Membership'
      subheading='Halaman untuk memperbarui membership.'
      breadcrumbs={['/', '/membership/renew']}
    >
      <FormProvider {...methods}>
        <form className='flex flex-col gap-8' onSubmit={handleSubmit(onSubmit)}>
          <div className='flex gap-4 mb-4 items-end'>
            <Input
              id='no_telp'
              label='Nomor Telepon'
              placeholder='Masukkan nomor telepon pelanggan'
              containerClassName='w-1/2'
              hideError
            />
            <Button
              variant='secondary'
              className='h-10'
              onClick={handleNoTelp}
              isLoading={isLoading}
              disabled={!currNoTelp?.length}
            >
              Cari Pelanggan
            </Button>
          </div>
          <Card>
            <CardHeader>
              <CardTitle className='text-xl'>Data Membership</CardTitle>
            </CardHeader>
            <CardContent className='grid grid-cols-1 gap-5 sm:grid-cols-2'>
              <Input
                id='nama'
                label='Nama'
                placeholder='Masukkan nama'
                validation={{ required: 'Nama harus diisi' }}
                disabled={!isNoTelpValid}
              />
              <Select
                id='tipe'
                label='Tipe Membership'
                placeholder='Pilih Tipe Membership'
                options={[
                  { value: 'Basic', label: 'Basic' },
                  { value: 'Bronze', label: 'Bronze' },
                  { value: 'Silver', label: 'Silver' },
                  { value: 'Gold', label: 'Gold' },
                ]}
                validation={{ required: 'Tipe membership harus dipilih' }}
                disabled={!isNoTelpValid}
              />
              <Input
                id='alamat'
                label='Alamat'
                placeholder='Masukkan alamat'
                validation={{ required: 'Alamat harus diisi' }}
                disabled={!isNoTelpValid}
              />
              <Input
                id='no_telp2'
                label='Nomor Telepon'
                placeholder='Masukkan nomor telepon pelanggan'
                value={isNoTelpValid ? currNoTelp : ''}
                disabled
              />
              <Input
                id='tanggal_pembuatan'
                label='Tanggal Pembuatan'
                placeholder='Masukkan tanggal pembuatan'
                type='date'
                disabled
              />
              <Input
                id='tanggal_kadaluwarsa'
                label='Tanggal Kadaluwarsa'
                placeholder='Masukkan tanggal kadaluwarsa'
                type='date'
                validation={{ required: 'Tanggal kadaluwarsa harus diisi' }}
                disabled={!isNoTelpValid}
              />
              <Button
                type='submit'
                isLoading={isPending}
                className='col-span-1 sm:col-span-2 !mt-6'
                disabled={!isNoTelpValid}
              >
                Renew Membership
              </Button>
            </CardContent>
          </Card>
        </form>
      </FormProvider>
    </AdminLayout>
  );
}
