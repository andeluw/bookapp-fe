import { keepPreviousData, useQuery } from '@tanstack/react-query';

import api from '@/lib/api';

import { ApiResponse } from '@/types/api';
import { KategoriStatistik } from '@/types/kategori';

export default function useGetTrenKategori() {
  return useQuery<ApiResponse<KategoriStatistik[]>>({
    queryKey: ['kategori', 'tren-kategori'],
    queryFn: async () => {
      const res = await api.get('/laporan/tren-kategori');
      return res.data;
    },
    placeholderData: keepPreviousData,
  });
}
