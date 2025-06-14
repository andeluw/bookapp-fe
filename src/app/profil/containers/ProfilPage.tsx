'use client';

import { LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { formatDateString } from '@/lib/date';

import Button from '@/components/buttons/Button';
import { Card } from '@/components/Card';
import Input from '@/components/forms/Input';
import AdminLayout from '@/components/layouts/AdminLayout';
import NextImage from '@/components/NextImage';
import Typography from '@/components/Typography';

import useAuthStore from '@/stores/useAuthStore';

export default function ProfilPage() {
  const user = useAuthStore.useUser();
  const logout = useAuthStore.useLogout();

  const router = useRouter();

  function handleLogout() {
    logout();
    router.push('/login');
  }

  return (
    <AdminLayout
      title='Profil Admin'
      subheading='Halaman untuk melihat dan mengelola profil admin.'
      breadcrumbs={['/', '/profil']}
      backHref='/'
    >
      <Card className='w-full p-8'>
        {/* Header */}
        <div className='flex flex-col items-center gap-3 mb-8'>
          <div className='w-24 h-24 rounded-full overflow-hidden border-4 border-muted'>
            <NextImage
              src='/images/user.png'
              alt='Foto Profil'
              width={96}
              height={96}
              className='object-cover w-full h-full'
            />
          </div>
          <Typography variant='h3' className='font-bold text-center'>
            {user?.nama}
          </Typography>

          <div className='flex gap-4 items-center'>
            <Button
              variant='destructive'
              onClick={handleLogout}
              className='flex items-center gap-2'
              rightIcon={LogOut}
              iconSize={16}
            >
              Logout
            </Button>
          </div>
        </div>

        <hr className='mb-10 border-gray-200' />

        {/* Informasi Profil */}
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
          <InfoSection label='ID Admin' value={user?.pegawai_id || '-'} />
          {/* <InfoSection label='Nama' value={user?.nama || '-'} /> */}
          <InfoSection label='Email' value={user?.email || '-'} />
          <InfoSection label='Nomor Telepon' value={user?.no_telp || '-'} />
          <InfoSection
            label='Jenis Kelamin'
            value={
              user?.jenis_kelamin
                ? user?.jenis_kelamin == 'M'
                  ? 'Laki-laki'
                  : 'Perempuan'
                : '-'
            }
          />
          <InfoSection
            label='Tanggal Lahir'
            value={formatDateString(user?.tanggal_lahir) || '-'}
          />
        </div>
      </Card>
    </AdminLayout>
  );
}

function InfoSection({
  label,
  value,
}: {
  label: string;
  value: string | undefined;
}) {
  return (
    <div className='flex justify-center gap-1 flex-col'>
      <Input
        id=''
        value={value}
        disabled
        placeholder='Tidak ada data'
        label={label}
      />
    </div>
  );
}
