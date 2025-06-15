import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import api from '@/lib/api';

import { ApiError, ApiResponse } from '@/types/api';
import { DetailPegawai } from '@/types/pegawai';

export default function useGetPegawai({
  id,
  enabled,
}: {
  id: string;
  enabled?: boolean;
}) {
  return useQuery<ApiResponse<DetailPegawai>, AxiosError<ApiError>>({
    queryKey: ['pegawai', { id }],
    queryFn: async () => {
      const res = await api.get(`/pegawai/${id}`);
      return res.data;
    },
    enabled: !!id && enabled,
    retry: (failureCount, error: AxiosError<ApiError>) => {
      if (error.response?.status === 404) {
        return false;
      }
      return failureCount < 3;
    },
    placeholderData: keepPreviousData,
  });
}
