import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';

import api from '@/lib/api';

import { ApiResponse } from '@/types/api';
import { Kategori } from '@/types/kategori';

export function useGetKategori() {
  return useQuery<ApiResponse<Kategori[]>>({
    queryKey: ['kategori'],
    queryFn: async () => {
      const res = await api.get('/kategori');
      return res.data;
    },
    placeholderData: keepPreviousData,
  });
}

export function useKategoriOptions() {
  const { data: kategoriData, isLoading } = useGetKategori();

  const kategoriOptions = useMemo(() => {
    return (
      kategoriData?.data?.map((kategori: Kategori) => ({
        value: kategori.kategori_id,
        label: kategori.nama,
      })) || []
    );
  }, [kategoriData]);

  return { kategoriOptions, isLoading };
}

export function useKategoriNameOptions() {
  const { data: kategoriData, isLoading } = useGetKategori();

  const kategoriNameOptions = useMemo(() => {
    return (
      kategoriData?.data?.map((kategori: Kategori) => ({
        value: kategori.nama,
        label: kategori.nama,
      })) || []
    );
  }, [kategoriData]);

  return { kategoriNameOptions, isLoading };
}
