import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

import api from '@/lib/api';

import { PembelianRequest } from '@/app/pembelian/form/containers/PembelianForm';

import { ApiError, ApiResponse } from '@/types/api';

export const usePembelianMutation = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  return useMutation<ApiResponse<void>, AxiosError<ApiError>, PembelianRequest>(
    {
      mutationFn: async (data: PembelianRequest) => {
        const res = await api.post<ApiResponse<void>>('/pembelian-buku', data);
        return res.data;
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['pembelian', 'buku'] });
        toast.success('Pembelian berhasil');
        router.push('/pembelian');
      },
      onError: (error) => {
        toast.error(
          error.response?.data.error ||
            'Terjadi kesalahan saat melakukan pembelian, silahkan coba lagi'
        );
      },
    }
  );
};
