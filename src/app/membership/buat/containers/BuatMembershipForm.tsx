'use client';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import Button from '@/components/buttons/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/Card';
import Input from '@/components/forms/Input';
import Select from '@/components/forms/Select';
import AdminLayout from '@/components/layouts/AdminLayout';

import { useCreateMembershipMutation } from '@/app/membership/buat/hooks/useCreateMembershipMutation';

export type CreateMembershipRequest = {
  nama: string;
  tipe: string;
  alamat: string;
  no_telp: string;
};

export default function BuatMembershipForm() {
  const methods = useForm<CreateMembershipRequest>({
    mode: 'onTouched',
    defaultValues: {
      tipe: 'Basic',
    },
  });

  const { handleSubmit } = methods;

  const { mutate: createMembershipMutate, isPending } =
    useCreateMembershipMutation();

  const onSubmit = (data: CreateMembershipRequest) => {
    createMembershipMutate(data);
  };

  return (
    <AdminLayout
      title='Tambah Membership'
      subheading='Halaman untuk penambahan membership.'
      breadcrumbs={['/', '/membership/buat']}
    >
      <FormProvider {...methods}>
        <form className='flex flex-col gap-8' onSubmit={handleSubmit(onSubmit)}>
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
              />
              <Input
                id='alamat'
                label='Alamat'
                placeholder='Masukkan alamat'
                validation={{ required: 'Alamat harus diisi' }}
              />
              <Input
                id='no_telp'
                label='Nomor Telepon'
                placeholder='Masukkan nomor telepon'
                validation={{ required: 'Nomor telepon harus diisi' }}
              />
              <Button
                type='submit'
                isLoading={isPending}
                className='col-span-1 sm:col-span-2 !mt-6'
              >
                Tambah Membership
              </Button>
            </CardContent>
          </Card>
        </form>
      </FormProvider>
    </AdminLayout>
  );
}
