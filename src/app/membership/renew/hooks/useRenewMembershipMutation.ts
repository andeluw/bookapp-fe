import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

import api from '@/lib/api';

import { RenewMembershipRequest } from '@/app/membership/renew/containers/RenewMembershipForm';

import { ApiError, ApiResponse } from '@/types/api';

export const useRenewMembershipMutation = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  return useMutation<
    ApiResponse<void>,
    AxiosError<ApiError>,
    RenewMembershipRequest
  >({
    mutationFn: async (data: RenewMembershipRequest) => {
      const res = await api.put<ApiResponse<void>>('/membership/update', data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pelanggan'] });
      toast.success('Renew membership berhasil');
      router.push('/membership/pelanggan');
    },
    onError: (error) => {
      toast.error(
        error.response?.data.error ||
          'Terjadi kesalahan saat memperbarui membership, silahkan coba lagi'
      );
    },
  });
};
