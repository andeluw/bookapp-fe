import { keepPreviousData, useQuery } from '@tanstack/react-query';

import api from '@/lib/api';

import { ApiResponse } from '@/types/api';
import { RekomendasiBuku } from '@/types/buku';

export default function useGetRekomendasiBuku({
  maxStock,
}: {
  maxStock?: number;
}) {
  return useQuery<ApiResponse<RekomendasiBuku[]>>({
    queryKey: ['/buku', '/buku/rekomendasi', { maxStock }],
    queryFn: async () => {
      const res = await api.get('/rekomendasi-pembelian', {
        params: {
          max_stock: maxStock ? maxStock : 25,
        },
      });
      return res.data;
    },
    placeholderData: keepPreviousData,
  });
}
