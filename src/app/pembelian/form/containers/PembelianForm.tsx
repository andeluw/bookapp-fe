'use client';
import { Separator } from '@radix-ui/react-separator';
import { Plus, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { FormProvider, useFieldArray, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import { formatCurrencyIDR } from '@/lib/currency';
import {
  useSupplierBooksOptions,
  useSupplierOptions,
} from '@/hooks/supplier/useGetSupplier';

import Button from '@/components/buttons/Button';
import IconButton from '@/components/buttons/IconButton';
import { Card } from '@/components/Card';
import Input from '@/components/forms/Input';
import { Label } from '@/components/forms/Label';
import Select from '@/components/forms/Select';
import AdminLayout from '@/components/layouts/AdminLayout';
import Typography from '@/components/Typography';

import useAuthStore from '@/stores/useAuthStore';

import { usePembelianMutation } from '@/app/pembelian/form/hooks/usePembelianMutation';

export type PembelianRequest = {
  supplier_id: string;
  pegawai_id: string;
  buku_ids: string[];
  kuantitas: number[];
  harga_belis: number[];
  items?: {
    buku_id: string;
    kuantitas: number;
    harga_beli: number;
  }[];
};

export default function PembelianForm() {
  const user = useAuthStore.useUser();
  const router = useRouter();

  const methods = useForm<PembelianRequest>({
    mode: 'onTouched',
    defaultValues: {
      items: [
        {
          buku_id: '',
          kuantitas: 1,
          harga_beli: 0,
        },
      ],
    },
  });

  const { reset, watch, control, handleSubmit } = methods;
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'items',
  });
  const supplierId = watch('supplier_id');
  const items = watch('items');
  const selectedBookIds =
    items?.map((item) => item.buku_id).filter(Boolean) ?? [];

  const { supplierOptions, isLoading: isLoadingSuppliers } =
    useSupplierOptions();
  const { supplierBooksOptions, isLoading: isLoadingBooks } =
    useSupplierBooksOptions(supplierId);

  const filteredBookOptions = items?.map((item) => {
    return (
      supplierBooksOptions?.filter(
        (option) =>
          !selectedBookIds.includes(option.value) ||
          option.value === item.buku_id
      ) ?? []
    );
  });

  const availableBookOptions =
    supplierBooksOptions?.filter(
      (opt) => !selectedBookIds.includes(opt.value)
    ) ?? [];

  const { mutate: pembelianMutate, isPending } = usePembelianMutation();

  const onSubmit = (data: PembelianRequest) => {
    if (!user?.pegawai_id) {
      toast.error('Pegawai ID tidak ditemukan. Silakan login ulang.');
      router.push('/login');
      return;
    }
    const buku_ids = data.items?.map((item) => item.buku_id) || [];
    const kuantitas = data.items?.map((item) => item.kuantitas) || [];
    const harga_belis = data.items?.map((item) => item.harga_beli) || [];

    const payload = {
      supplier_id: data.supplier_id,
      pegawai_id: user?.pegawai_id as string,
      buku_ids,
      kuantitas,
      harga_belis,
    };

    pembelianMutate(payload, {
      onSuccess: () => {
        reset();
      },
    });
  };

  return (
    <AdminLayout
      title='Pembelian Buku'
      subheading='Halaman untuk pembelian buku.'
      breadcrumbs={['/', '/pembelian/form']}
    >
      <Card>
        <FormProvider {...methods}>
          <form
            className='flex gap-y-8 flex-col px-4 py-6 md:p-8 gap-6'
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className='flex flex-col gap-4'>
              <Typography variant='h3'>Supplier</Typography>
              <Select
                id='supplier_id'
                label='Nama Supplier'
                placeholder='Pilih Supplier'
                isLoading={isLoadingSuppliers}
                options={supplierOptions || []}
                validation={{ required: 'Supplier harus dipilih' }}
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

              {fields.map((field, index) => (
                <div
                  key={field.id}
                  className='grid grid-cols-12 gap-2 md:gap-4'
                >
                  <Select
                    id={`items.${index}.buku_id`}
                    options={filteredBookOptions?.[index] || []}
                    isLoading={isLoadingBooks}
                    disabled={isLoadingBooks || !supplierId}
                    containerClassName='col-span-5 md:col-span-6 lg:col-span-5'
                    validation={{
                      required: 'Buku harus dipilih',
                    }}
                    hideError
                  />
                  <Input
                    id={`items.${index}.kuantitas`}
                    type='number'
                    containerClassName='col-span-3 sm:col-span-2'
                    disabled={watch(`items.${index}.buku_id`) === ''}
                    validation={{ required: 'Kuantitas harus diisi' }}
                    hideError
                  />
                  <Input
                    id={`items.${index}.harga_beli`}
                    type='number'
                    containerClassName='col-span-4 lg:col-span-2'
                    disabled={watch(`items.${index}.buku_id`) === ''}
                    validation={{ required: 'Harga beli harus diisi' }}
                    hideError
                  />
                  <Typography
                    className='col-span-11 lg:col-span-2 mt-2'
                    variant='b3'
                    color='secondary'
                  >
                    {formatCurrencyIDR(
                      (watch(`items.${index}.kuantitas`) || 0) *
                        (watch(`items.${index}.harga_beli`) || 0)
                    )}
                  </Typography>
                  <IconButton
                    icon={Trash2}
                    variant='ghost'
                    className='text-red-500 col-span-1 justify-self-center'
                    onClick={() => remove(index)}
                  />
                </div>
              ))}

              {availableBookOptions?.length > 0 && (
                <Button
                  type='button'
                  variant='secondary'
                  rightIcon={Plus}
                  onClick={() =>
                    append({
                      buku_id: '',
                      kuantitas: 1,
                      harga_beli: 0,
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
              <Typography variant='h2'>Total Pembelian</Typography>
              <Typography variant='b1'>
                {formatCurrencyIDR(
                  items?.reduce((total, item) => {
                    return (
                      total + (item.kuantitas || 0) * (item.harga_beli || 0)
                    );
                  }, 0) || 0
                )}
              </Typography>
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
