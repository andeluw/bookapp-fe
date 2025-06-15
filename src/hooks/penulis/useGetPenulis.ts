import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';

import api from '@/lib/api';

import { ApiResponse } from '@/types/api';
import { Penulis } from '@/types/penulis';

export function useGetPenulis() {
  return useQuery<ApiResponse<Penulis[]>>({
    queryKey: ['penulis'],
    queryFn: async () => {
      const res = await api.get('/penulis');
      return res.data;
    },
    placeholderData: keepPreviousData,
  });
}

export function usePenulisOptions() {
  const { data: penulisData, isLoading } = useGetPenulis();

  const penulisOptions = useMemo(() => {
    return (
      penulisData?.data?.map((penulis: Penulis) => ({
        value: penulis.penulis_id,
        label: penulis.nama_penulis,
      })) || []
    );
  }, [penulisData]);

  return { penulisOptions, isLoading };
}
