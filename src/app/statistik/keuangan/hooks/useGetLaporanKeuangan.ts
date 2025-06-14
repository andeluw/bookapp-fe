import { keepPreviousData, useQuery } from '@tanstack/react-query';

import api from '@/lib/api';

import { ApiResponse } from '@/types/api';

export type LaporanKeuangan = {
  bulan: string;
  total_pendapatan: number;
  total_biaya: number;
  laporan_keuangan: number;
};

export default function useGetLaporanKeuangan() {
  return useQuery<ApiResponse<LaporanKeuangan[]>>({
    queryKey: ['keuangan', 'laporan-keuangan'],
    queryFn: async () => {
      const res = await api.get('/laporan/keuangan-bulanan');
      return res.data;
    },
    placeholderData: keepPreviousData,
  });
}
