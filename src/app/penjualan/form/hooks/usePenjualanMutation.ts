import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

import api from '@/lib/api';

import { PenjualanRequest } from '@/app/penjualan/form/containers/PenjualanForm';

import { ApiError, ApiResponse } from '@/types/api';

export const usePenjualanMutation = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  return useMutation<ApiResponse<void>, AxiosError<ApiError>, PenjualanRequest>(
    {
      mutationFn: async (data: PenjualanRequest) => {
        const res = await api.post<ApiResponse<void>>('/penjualan-buku', data);
        return res.data;
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['penjualan', 'buku'] });
        toast.success('Penjualan berhasil');
        router.push('/penjualan');
      },
      onError: (error) => {
        toast.error(
          error.response?.data.error ||
            'Terjadi kesalahan saat melakukan penjualan, silahkan coba lagi'
        );
      },
    }
  );
};
