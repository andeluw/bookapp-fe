import { keepPreviousData, useQuery } from '@tanstack/react-query';

import api from '@/lib/api';

import { ApiResponse } from '@/types/api';
import { Pembelian } from '@/types/pembelian';

export default function useGetDaftarPembelian() {
  return useQuery<ApiResponse<Pembelian[]>>({
    queryKey: ['pembelian', 'daftar-pembelian'],
    queryFn: async () => {
      const res = await api.get('/pembelian');
      return res.data;
    },
    placeholderData: keepPreviousData,
  });
}
