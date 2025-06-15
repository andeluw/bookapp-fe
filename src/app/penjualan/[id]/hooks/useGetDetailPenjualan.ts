import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import api from '@/lib/api';

import { ApiError, ApiResponse } from '@/types/api';
import { DetailPenjualan } from '@/types/penjualan';

export function useGetDetailPenjualan(id: string) {
  return useQuery<ApiResponse<DetailPenjualan>, AxiosError<ApiError>>({
    queryKey: ['penjualan', id],
    queryFn: async () => {
      const res = await api.get(`/penjualan/${id}`);
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
