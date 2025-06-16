import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

import api from '@/lib/api';

import { TambahBukuRequest } from '@/app/buku/form/containers/TambahBukuForm';

import { ApiError, ApiResponse } from '@/types/api';

export const useTambahBukuMutation = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  return useMutation<
    ApiResponse<void>,
    AxiosError<ApiError>,
    Omit<
      TambahBukuRequest,
      'is_new_penulis' | 'is_new_penerbit' | 'is_new_supplier'
    >
  >({
    mutationFn: async (
      data: Omit<
        TambahBukuRequest,
        'is_new_penulis' | 'is_new_penerbit' | 'is_new_supplier'
      >
    ) => {
      const res = await api.post<ApiResponse<void>>('/tambah-buku', data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pembelian', 'buku'] });
      toast.success('Penambahan buku berhasil');
      router.push('/buku/cari');
    },
    onError: (error) => {
      toast.error(
        error.response?.data.error ||
          'Terjadi kesalahan saat menambahkan buku, silahkan coba lagi'
      );
    },
  });
};
