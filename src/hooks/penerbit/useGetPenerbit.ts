import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';

import api from '@/lib/api';

import { ApiResponse } from '@/types/api';
import { Penerbit } from '@/types/penerbit';

export function useGetPenerbit() {
  return useQuery<ApiResponse<Penerbit[]>>({
    queryKey: ['penerbit'],
    queryFn: async () => {
      const res = await api.get('/penerbit');
      return res.data;
    },
    placeholderData: keepPreviousData,
  });
}

export function usePenerbitOptions() {
  const { data: penerbitData, isLoading } = useGetPenerbit();

  const penerbitOptions = useMemo(() => {
    return (
      penerbitData?.data?.map((penerbit: Penerbit) => ({
        value: penerbit.penerbit_id,
        label: penerbit.nama,
      })) || []
    );
  }, [penerbitData]);

  return { penerbitOptions, isLoading };
}
