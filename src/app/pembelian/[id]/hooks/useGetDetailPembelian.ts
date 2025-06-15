import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import api from '@/lib/api';

import { ApiError, ApiResponse } from '@/types/api';
import { DetailPembelian } from '@/types/pembelian';

export function useGetDetailPembelian(id: string) {
  return useQuery<ApiResponse<DetailPembelian>, AxiosError<ApiError>>({
    queryKey: ['pembelian', id],
    queryFn: async () => {
      const res = await api.get(`/pembelian/${id}`);
      return res.data;
    },
    enabled: !!id,
    retry: (failureCount, error) => {
      if (error.response?.status === 404) {
        return false;
      }
      return failureCount < 3;
    },
    placeholderData: keepPreviousData,
  });
}
