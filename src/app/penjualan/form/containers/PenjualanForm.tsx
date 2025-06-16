'use client';
import { Plus, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { FormProvider, useFieldArray, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import { formatCurrencyIDR } from '@/lib/currency';
import useGetBuku, { useGetBukuOptions } from '@/hooks/buku/useGetBuku';
import useGetPelanggan from '@/hooks/pelanggan/useGetPelanggan';

import Button from '@/components/buttons/Button';
import IconButton from '@/components/buttons/IconButton';
import { Card } from '@/components/Card';
import Input from '@/components/forms/Input';
import { Label } from '@/components/forms/Label';
import Select from '@/components/forms/Select';
import AdminLayout from '@/components/layouts/AdminLayout';
import { Separator } from '@/components/Separator';
import Typography from '@/components/Typography';

import useAuthStore from '@/stores/useAuthStore';

import { usePenjualanMutation } from '@/app/penjualan/form/hooks/usePenjualanMutation';

export type PenjualanRequest = {
  metode_pembayaran: string;
  no_telp_pelanggan: string;
  pegawai_id: string;
  buku_ids: string[];
  kuantitas: number[];
  items?: {
    buku_id: string;
    kuantitas: number;
  }[];
};

const metodePembayaranOptions = [
  { value: 'Tunai', label: 'Tunai' },
  { value: 'E-Wallet', label: 'E-Wallet' },
  { value: 'Transfer Bank', label: 'Transfer Bank' },
  { value: 'Kartu Kredit', label: 'Kartu Kredit' },
];

function getDiscount(membership: string) {
  switch (membership) {
    case 'Gold':
      return 0.1; // 10% discount
    case 'Silver':
      return 0.07; // 7% discount
    case 'Bronze':
      return 0.05; // 5% discount
    default:
      return 0;
  }
}

export default function PenjualanForm() {
  const router = useRouter();
  const [noTelp, setNoTelp] = useState<string>('');
  const [membership, setMembership] = useState<string>('');
  const [isNoTelpValid, setIsNoTelpValid] = useState<boolean>(false);
  const user = useAuthStore.useUser();

  const methods = useForm<PenjualanRequest>({
    mode: 'onTouched',
    defaultValues: {
      items: [
        {
          buku_id: '',
          kuantitas: 1,
        },
      ],
    },
  });

  const { reset, watch, control, handleSubmit, setValue, setError } = methods;
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'items',
  });
  const items = watch('items');
  const watchNoTelp = watch('no_telp_pelanggan');

  function handleFindPelanggan() {
    setNoTelp(watchNoTelp);
    setMembership('');
  }

  const {
    data: pelangganData,
    isError,
    error: pelangganError,
    isSuccess,
    isLoading: isLoadingPelanggan,
  } = useGetPelanggan({
    noTelp: noTelp,
  });

  useEffect(() => {
    if (isSuccess && pelangganData?.data) {
      setMembership(pelangganData.data.tipe || 'Basic');
      setIsNoTelpValid(true);
    } else if (isError) {
      toast.error(
        pelangganError.response?.data.error || 'Pelanggan tidak ditemukan'
      );
      setMembership('');
      setValue('no_telp_pelanggan', '');
      setError('no_telp_pelanggan', {
        type: 'manual',
        message:
          pelangganError.response?.data.error || 'Pelanggan tidak ditemukan',
      });
      setIsNoTelpValid(false);
    }
  }, [isSuccess, isError, pelangganData, setValue, setError, pelangganError]);

  const { data: bukuData } = useGetBuku({
    keyword: '',
    kategori: '',
    tahun_terbit: undefined,
  });
  const { bukuOptions, isLoading: isLoadingBukuOptions } = useGetBukuOptions();
  const hargaMap = useMemo(() => {
    const map: Record<string, number> = {};
    bukuData?.data.forEach((buku) => {
      map[buku.buku_id] = parseFloat(buku.harga_jual);
    });
    return map;
  }, [bukuData]);

  const selectedBookIds = useMemo(
    () => items?.map((item) => item.buku_id) ?? [],
    [items]
  );
  const availableBookOptions = useMemo(() => {
    return (
      bukuOptions?.filter(
        (option) => !selectedBookIds.includes(option.value)
      ) ?? []
    );
  }, [bukuOptions, selectedBookIds]);

  const totalOriginal =
    items?.reduce((total, item) => {
      const harga = hargaMap[item.buku_id] || 0;
      return total + harga * (item.kuantitas || 0);
    }, 0) || 0;
  const discountRate = getDiscount(membership);
  const discountAmount = totalOriginal * discountRate;
  const finalPrice = totalOriginal - discountAmount;

  const { mutate: penjualanMutate, isPending } = usePenjualanMutation();

  const onSubmit = (data: PenjualanRequest) => {
    if (!user?.pegawai_id) {
      toast.error('Pegawai ID tidak ditemukan. Silakan login ulang.');
      router.push('/login');
      return;
    }
    const buku_ids = data.items?.map((item) => item.buku_id) || [];
    const kuantitas = data.items?.map((item) => item.kuantitas) || [];

    const payload = {
      metode_pembayaran: data.metode_pembayaran,
      no_telp_pelanggan: data.no_telp_pelanggan,
      pegawai_id: user?.pegawai_id as string,
      buku_ids,
      kuantitas,
    };

    penjualanMutate(payload, {
      onSuccess: () => {
        reset();
      },
    });
  };

  return (
    <AdminLayout
      title='Penjualan Buku'
      subheading='Halaman untuk penjualan buku.'
      breadcrumbs={['/', '/penjualan/form']}
    >
      <Card>
        <FormProvider {...methods}>
          <form
            className='flex gap-y-8 flex-col px-4 py-6 md:p-8 gap-6'
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className='flex flex-col gap-4'>
              <Typography variant='h3'>Pelanggan</Typography>
              <div className='flex items-end gap-2'>
                <Input
                  id='no_telp_pelanggan'
                  label='Nomor Telepon Pelanggan'
                  placeholder='Masukkan nomor telepon pelanggan'
                  validation={{ required: 'Nomor telepon harus diisi' }}
                  onError={() => {
                    setMembership('');
                  }}
                />
                <Button
                  type='button'
                  variant='primary'
                  className='h-10'
                  onClick={handleFindPelanggan}
                  isLoading={isLoadingPelanggan}
                  disabled={isLoadingPelanggan || !watch('no_telp_pelanggan')}
                >
                  Cari Pelanggan
                </Button>
              </div>
              <div className='flex flex-col gap-2'>
                <Label>Tipe Membership</Label>
                <Typography variant='b2'>{membership || '-'}</Typography>
              </div>
              <Select
                id='metode_pembayaran'
                label='Metode Pembayaran'
                placeholder='Pilih Metode Pembayaran'
                options={metodePembayaranOptions}
                validation={{ required: 'Metode pembayaran harus dipilih' }}
                disabled={!isNoTelpValid}
              />
            </div>

            <div className='flex flex-col gap-2 lg:gap-4'>
              <Typography variant='h3'>Detail Pembelian</Typography>

              <div className='grid grid-cols-12 gap-2 md:gap-4 px-1 max-md:text-xs'>
                <Label className='col-span-5 md:col-span-6 lg:col-span-5'>
                  Judul Buku
                </Label>
                <Label className='col-span-3 sm:col-span-2'>Kuantitas</Label>
                <Label className='col-span-4 lg:col-span-2 text-nowrap'>
                  Harga
                </Label>
                <Label className='hidden lg:block col-span-2'>Subtotal</Label>
                <div className='col-span-1'></div>
              </div>

              {fields.map((field, index) => {
                const currentSelected = watch(`items.${index}.buku_id`);
                const filteredOptions =
                  bukuOptions?.filter(
                    (option) =>
                      option.value === currentSelected ||
                      !selectedBookIds.includes(option.value)
                  ) || [];
                return (
                  <div
                    key={field.id}
                    className='grid grid-cols-12 gap-2 md:gap-4'
                  >
                    <Select
                      id={`items.${index}.buku_id`}
                      options={filteredOptions}
                      isLoading={isLoadingBukuOptions}
                      containerClassName='col-span-5 md:col-span-6 lg:col-span-5'
                      validation={{
                        required: 'Buku harus dipilih',
                      }}
                      hideError
                      disabled={isLoadingBukuOptions || !isNoTelpValid}
                    />
                    <Input
                      id={`items.${index}.kuantitas`}
                      type='number'
                      disabled={
                        watch(`items.${index}.buku_id`) === '' || !isNoTelpValid
                      }
                      containerClassName='col-span-3 sm:col-span-2'
                      validation={{ required: 'Kuantitas harus diisi' }}
                      hideError
                    />
                    <Typography
                      className='col-span-4 lg:col-span-2 mt-2'
                      variant='b3'
                      color='secondary'
                    >
                      {formatCurrencyIDR(
                        hargaMap[watch(`items.${index}.buku_id`)] || 0
                      )}
                    </Typography>
                    <Typography
                      className='col-span-11 lg:col-span-2 mt-2'
                      variant='b3'
                      color='secondary'
                    >
                      {formatCurrencyIDR(
                        (hargaMap[watch(`items.${index}.buku_id`)] || 0) *
                          (watch(`items.${index}.kuantitas`) || 0)
                      )}
                    </Typography>
                    <IconButton
                      icon={Trash2}
                      variant='ghost'
                      className='text-red-500 col-span-1 justify-self-center'
                      onClick={() => remove(index)}
                    />
                  </div>
                );
              })}

              {availableBookOptions?.length > 0 && (
                <Button
                  type='button'
                  variant='secondary'
                  rightIcon={Plus}
                  onClick={() =>
                    append({
                      buku_id: '',
                      kuantitas: 1,
                    })
                  }
                  className='w-fit mt-2'
                >
                  Tambah Buku
                </Button>
              )}
            </div>
            <Separator className='mt-4 bg-gray-200 w-full h-0.5' />
            <div className='flex flex-col gap-2 ml-auto items-end'>
              <Typography variant='h2'>Ringkasan Pembelian</Typography>

              <div className='flex flex-col items-end'>
                <Typography variant='b2' className='text-gray-500'>
                  Harga Sebelum Diskon:
                </Typography>
                <Typography variant='b1'>
                  {formatCurrencyIDR(totalOriginal)}
                </Typography>
              </div>

              {discountRate > 0 && (
                <div className='flex flex-col items-end'>
                  <Typography variant='b2' className='text-gray-500'>
                    Diskon ({membership} -{Math.round(discountRate * 100)}%):
                  </Typography>
                  <Typography variant='b1' className='text-red-600'>
                    - {formatCurrencyIDR(discountAmount)}
                  </Typography>
                </div>
              )}

              <div className='flex flex-col items-end'>
                <Typography variant='b2' className='text-gray-500'>
                  Total Setelah Diskon:
                </Typography>
                <Typography variant='h3' className='text-green-600'>
                  {formatCurrencyIDR(finalPrice)}
                </Typography>
              </div>
            </div>
            <Button type='submit' variant='primary' isLoading={isPending}>
              Beli Buku
            </Button>
          </form>
        </FormProvider>
      </Card>
    </AdminLayout>
  );
}
