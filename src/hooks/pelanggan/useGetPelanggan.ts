import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import api from '@/lib/api';

import { ApiError, ApiResponse } from '@/types/api';
import { Pelanggan } from '@/types/pelanggan';

export default function useGetPelanggan({ noTelp }: { noTelp: string }) {
  return useQuery<ApiResponse<Pelanggan>, AxiosError<ApiError>>({
    queryKey: ['pelanggan', { noTelp }],
    queryFn: async () => {
      const res = await api.get(`/pelanggan/phone/${noTelp}`);
      return res.data;
    },
    enabled: !!noTelp,
    retry: (failureCount, error: AxiosError<ApiError>) => {
      if (error.response?.status === 404) {
        return false;
      }
      return failureCount < 3;
    },
    placeholderData: keepPreviousData,
  });
}
