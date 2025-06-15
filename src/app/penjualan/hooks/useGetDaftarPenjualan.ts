import { keepPreviousData, useQuery } from '@tanstack/react-query';

import api from '@/lib/api';

import { ApiResponse } from '@/types/api';
import { Penjualan } from '@/types/penjualan';

export default function useGetDaftarPenjualan() {
  return useQuery<ApiResponse<Penjualan[]>>({
    queryKey: ['penjualan', 'daftar-penjualan'],
    queryFn: async () => {
      const res = await api.get('/penjualan');
      return res.data;
    },
    placeholderData: keepPreviousData,
  });
}
