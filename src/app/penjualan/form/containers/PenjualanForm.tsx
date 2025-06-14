'use client';
import { Plus, Trash2 } from 'lucide-react';
import { useMemo } from 'react';
import { FormProvider, useFieldArray, useForm } from 'react-hook-form';

import { formatCurrencyIDR } from '@/lib/currency';
import useGetBuku, { useGetBukuOptions } from '@/hooks/buku/useGetBuku';

import Button from '@/components/buttons/Button';
import IconButton from '@/components/buttons/IconButton';
import { Card } from '@/components/Card';
import Input from '@/components/forms/Input';
import { Label } from '@/components/forms/Label';
import Select from '@/components/forms/Select';
import AdminLayout from '@/components/layouts/AdminLayout';
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

export default function PenjualanForm() {
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

  const { reset, watch, control, handleSubmit } = methods;
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'items',
  });
  const items = watch('items');

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

  const { mutate: penjualanMutate, isPending } = usePenjualanMutation();

  const onSubmit = (data: PenjualanRequest) => {
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
              <Input
                id='no_telp_pelanggan'
                label='Nomor Telepon Pelanggan'
                placeholder='Masukkan nomor telepon pelanggan'
                validation={{ required: 'Nomor telepon harus diisi' }}
              />
              <Select
                id='metode_pembayaran'
                label='Metode Pembayaran'
                placeholder='Pilih Metode Pembayaran'
                options={metodePembayaranOptions}
                validation={{ required: 'Metode pembayaran harus dipilih' }}
              />
            </div>

            <div className='flex flex-col gap-4'>
              <Typography variant='h3'>Detail Penjualan</Typography>

              <div className='grid grid-cols-12 gap-2 md:gap-4 px-1 max-md:text-xs'>
                <Label className='col-span-5'>Judul Buku</Label>
                <Label className='col-span-3 sm:col-span-2'>Kuantitas</Label>
                <Label className='col-span-3 text-nowrap lg:col-span-2'>
                  Harga Jual
                </Label>
                <Label className='hidden lg:block col-span-2'>Subtotal</Label>
                <div className='col-span-1'></div>
              </div>

              {fields.map((field, index: number) => {
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
                      containerClassName='col-span-5'
                      validation={{
                        required: 'Buku harus dipilih',
                      }}
                      hideError
                    />
                    <Input
                      id={`items.${index}.kuantitas`}
                      type='number'
                      containerClassName='col-span-3 sm:col-span-2'
                      validation={{ required: 'Kuantitas harus diisi' }}
                      hideError
                    />
                    <Typography
                      className='col-span-2 mt-2'
                      variant='b3'
                      color='secondary'
                    >
                      {formatCurrencyIDR(
                        hargaMap[watch(`items.${index}.buku_id`)] || 0
                      )}
                    </Typography>
                    <Typography
                      className='col-span-2 mt-2'
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

              <div className='flex flex-col md:flex-row gap-2 justify-between mt-4'>
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
                  >
                    Tambah Buku
                  </Button>
                )}
                <Button
                  type='submit'
                  variant='primary'
                  className='md:ml-auto'
                  isLoading={isPending}
                >
                  Jual Buku
                </Button>
              </div>
            </div>
          </form>
        </FormProvider>
      </Card>
    </AdminLayout>
  );
}
