import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

import api from '@/lib/api';

import useAuthStore from '@/stores/useAuthStore';

import { LoginRequest } from '@/app/(auth)/login/containers/LoginPage';

import { ApiError, ApiResponse } from '@/types/api';
import { Pegawai } from '@/types/pegawai';

export const useLoginMutation = () => {
  const login = useAuthStore.useLogin();
  const router = useRouter();

  const { mutate: loginMutation, isPending } = useMutation<
    ApiResponse<Pegawai>,
    AxiosError<ApiError>,
    LoginRequest
  >({
    mutationFn: async (data: LoginRequest) => {
      const res = await api.post<ApiResponse<Pegawai>>('/login', data);
      return res.data;
    },
    onSuccess: (data) => {
      login(data.data);
      toast.success('Login berhasil');
      router.push('/');
    },
    onError: (error) => {
      toast.error(
        error.response?.data.error ||
          'Email atau nomor telepon salah, silahkan coba lagi'
      );
    },
  });

  return {
    loginMutation,
    isPending,
  };
};
