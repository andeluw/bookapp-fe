import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';

import api from '@/lib/api';

import { FilterBuku } from '@/app/buku/cari/containers/CariBukuPage';

import { ApiResponse } from '@/types/api';
import { Buku } from '@/types/buku';

export default function useGetBuku({
  keyword = '',
  kategori = '',
  tahun_terbit,
}: FilterBuku) {
  return useQuery<ApiResponse<Buku[]>>({
    queryKey: ['buku', keyword, kategori, tahun_terbit],
    queryFn: async () => {
      const res = await api.get('/cari-buku', {
        params: {
          keyword: keyword,
          kategori: kategori,
          tahun_terbit: tahun_terbit ? tahun_terbit : undefined,
        },
      });
      return res.data;
    },
    placeholderData: keepPreviousData,
  });
}

export function useGetBukuOptions() {
  const { data: bukuData, isLoading } = useGetBuku({
    keyword: '',
    kategori: '',
    tahun_terbit: undefined,
  });

  const bukuOptions = useMemo(() => {
    return (
      bukuData?.data.map((buku) => ({
        value: buku.buku_id,
        label: buku.judul,
      })) || []
    );
  }, [bukuData]);

  return {
    bukuOptions,
    isLoading,
  };
}
