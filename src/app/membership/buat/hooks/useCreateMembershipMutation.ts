import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

import api from '@/lib/api';

import { CreateMembershipRequest } from '@/app/membership/buat/containers/BuatMembershipForm';

import { ApiError, ApiResponse } from '@/types/api';

export const useCreateMembershipMutation = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  return useMutation<
    ApiResponse<void>,
    AxiosError<ApiError>,
    CreateMembershipRequest
  >({
    mutationFn: async (data: CreateMembershipRequest) => {
      const res = await api.post<ApiResponse<void>>('/membership/insert', data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pelanggan'] });
      toast.success('Penambahan membership berhasil');
      router.push('/membership/pelanggan');
    },
    onError: (error) => {
      toast.error(
        error.response?.data.error ||
          'Terjadi kesalahan saat menambahkan membership, silahkan coba lagi'
      );
    },
  });
};
