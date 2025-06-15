import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import api from '@/lib/api';

import { ApiError, ApiResponse } from '@/types/api';
import { DetailBuku } from '@/types/buku';

export function useGetDetailBuku(id: string) {
  return useQuery<ApiResponse<DetailBuku>, AxiosError<ApiError>>({
    queryKey: ['buku', id],
    queryFn: async () => {
      const res = await api.get(`/buku/${id}`);
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
