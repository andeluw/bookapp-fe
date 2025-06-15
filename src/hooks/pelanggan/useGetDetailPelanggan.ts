import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import api from '@/lib/api';

import { ApiError, ApiResponse } from '@/types/api';
import { DetailPelanggan } from '@/types/pelanggan';

export default function useGetDetailPelanggan({ noTelp }: { noTelp: string }) {
  return useQuery<ApiResponse<DetailPelanggan>, AxiosError<ApiError>>({
    queryKey: ['pelanggan', 'penjualan', { noTelp }],
    queryFn: async () => {
      const res = await api.get(`/pelanggan/${noTelp}`);
      return res.data;
    },
    enabled: !!noTelp && noTelp.length > 0,
    retry: (failureCount, error: AxiosError<ApiError>) => {
      if (error.response?.status === 404) {
        return false;
      }
      return failureCount < 3;
    },
    placeholderData: keepPreviousData,
  });
}
