import { keepPreviousData, useQuery } from '@tanstack/react-query';

import api from '@/lib/api';

import { ApiResponse } from '@/types/api';
import { BukuTerlaris } from '@/types/buku';

export default function useGetBukuTerlaris() {
  return useQuery<ApiResponse<BukuTerlaris[]>>({
    queryKey: ['buku', 'buku-terlaris'],
    queryFn: async () => {
      const res = await api.get('/laporan/terlaris');
      return res.data;
    },
    placeholderData: keepPreviousData,
  });
}
