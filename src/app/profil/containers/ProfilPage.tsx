'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Eye, LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { convertFromPembelianId, convertFromPenjualanId } from '@/lib/convert';
import { formatCurrencyIDR } from '@/lib/currency';
import { formatDateString } from '@/lib/date';
import useGetPegawai from '@/hooks/pegawai/useGetPegawai';

import Button from '@/components/buttons/Button';
import { Card } from '@/components/Card';
import Input from '@/components/forms/Input';
import AdminLayout from '@/components/layouts/AdminLayout';
import IconLink from '@/components/links/IconLink';
import NextImage from '@/components/NextImage';
import { PaginatedTable } from '@/components/table/PaginatedTable';
import Typography from '@/components/Typography';

import useAuthStore from '@/stores/useAuthStore';

import { Pembelian } from '@/types/pembelian';
import { Penjualan } from '@/types/penjualan';

const pembelianColumns: ColumnDef<Pembelian>[] = [
  {
    accessorKey: 'pembelian_id',
    header: 'Pembelian ID',
  },
  {
    accessorKey: 'tanggal_pembelian',
    header: 'Tanggal Pembelian',
    cell: ({ getValue }) => formatDateString(getValue() as string),
  },
  {
    accessorKey: 'nama_supplier',
    header: 'Nama Supplier',
  },
  {
    accessorKey: 'total',
    header: 'Total',
    cell: ({ getValue }) => formatCurrencyIDR(getValue() as number),
  },
  {
    accessorKey: 'pembelian_id',
    header: 'Aksi',
    enableSorting: false,
    cell: ({ getValue }) => (
      <IconLink
        icon={Eye}
        href={`/pembelian/${convertFromPembelianId(getValue() as string)}`}
      />
    ),
  },
];

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
    accessorKey: 'nama_pelanggan',
    header: 'Nama Pelanggan',
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

export default function ProfilPage() {
  const user = useAuthStore.useUser();
  const logout = useAuthStore.useLogout();

  const router = useRouter();

  function handleLogout() {
    logout();
    router.push('/login');
  }

  const { data: dataPegawai, isLoading } = useGetPegawai({
    id: user?.pegawai_id as string,
    enabled: !!user?.pegawai_id,
  });

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

      <div className='mt-8'>
        <Typography variant='h2' className='mb-4'>
          Daftar Pembelian
        </Typography>
        <div className='mb-4 flex flex-col gap-2'>
          <Typography variant='b2' color='secondary'>
            Total Kuantitas Pembelian:{' '}
            <span className='font-medium'>
              {dataPegawai?.data?.kuantitas_pembelian || 0}
            </span>
          </Typography>
          <Typography variant='b2' color='secondary'>
            Total Harga Pembelian:{' '}
            <span className='font-medium'>
              {formatCurrencyIDR(dataPegawai?.data?.total_pembelian || 0)}
            </span>
          </Typography>
        </div>
        <PaginatedTable
          columns={pembelianColumns}
          data={dataPegawai?.data?.pembelian || []}
          isLoading={isLoading}
          emptyPlaceholder='Tidak ada data pembelian yang ditemukan.'
          withFilter
          pageSize={5}
        />
      </div>

      <div className=''>
        <Typography variant='h2' className='mb-4'>
          Daftar Penjualan
        </Typography>
        <div className='mb-4 flex flex-col gap-2'>
          <Typography variant='b2' color='secondary'>
            Total Kuantitas Penjualan:{' '}
            <span className='font-medium'>
              {dataPegawai?.data?.kuantitas_penjualan || 0}
            </span>
          </Typography>
          <Typography variant='b2' color='secondary'>
            Total Harga Penjualan:{' '}
            <span className='font-medium'>
              {formatCurrencyIDR(dataPegawai?.data?.total_penjualan || 0)}
            </span>
          </Typography>
        </div>
        <PaginatedTable
          columns={penjualanColumns}
          data={dataPegawai?.data?.penjualan || []}
          isLoading={isLoading}
          emptyPlaceholder='Tidak ada data penjualan yang ditemukan.'
          withFilter
          pageSize={5}
        />
      </div>
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
