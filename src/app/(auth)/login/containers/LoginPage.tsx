'use client';

import { FormProvider, useForm } from 'react-hook-form';

import Button from '@/components/buttons/Button';
import { Card } from '@/components/Card';
import Input from '@/components/forms/Input';
import Typography from '@/components/Typography';

import { useLoginMutation } from '@/app/(auth)/login/hooks/useLoginMutation';

export type LoginRequest = {
  email: string;
  no_telp: string;
};

export default function LoginPage() {
  const methods = useForm<LoginRequest>({
    mode: 'onTouched',
  });
  const { handleSubmit } = methods;
  const { loginMutation, isPending } = useLoginMutation();
  const onSubmit = (data: LoginRequest) => {
    loginMutation(data);
  };

  return (
    <div className='h-screen flex items-center justify-center bg-primary-50'>
      <Card className='max-w-[90%] sm:max-w-[400px] w-full p-6'>
        <Typography
          as='h1'
          variant='h1'
          className='text-center mb-6 font-semibold'
        >
          Login
        </Typography>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
            <Input
              id='email'
              type='email'
              label='Email'
              placeholder='Masukkan email Anda'
              validation={{
                required: 'Email tidak boleh kosong',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: 'Format email tidak valid',
                },
              }}
            />

            <Input
              id='no_telp'
              label='Nomor Telepon'
              placeholder='Masukkan nomor telepon Anda'
              validation={{
                required: 'Nomor telepon tidak boleh kosong',
              }}
            />

            <Button
              type='submit'
              className='w-full !mt-8'
              isLoading={isPending}
            >
              Login
            </Button>
          </form>
        </FormProvider>
      </Card>
    </div>
  );
}
