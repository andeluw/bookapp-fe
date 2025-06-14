import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';

import api from '@/lib/api';

import { ApiResponse } from '@/types/api';
import { Supplier } from '@/types/supplier';

type Buku = {
  buku_id: string;
  judul: string;
};

export function useGetSupplier() {
  return useQuery<ApiResponse<Supplier[]>>({
    queryKey: ['supplier'],
    queryFn: async () => {
      const res = await api.get('/supplier');
      return res.data;
    },
    placeholderData: keepPreviousData,
  });
}

export function useSupplierOptions() {
  const { data: suppliers, isLoading } = useGetSupplier();

  const supplierOptions = useMemo(() => {
    return (
      suppliers?.data?.map((supplier: Supplier) => ({
        value: supplier.supplier_id,
        label: supplier.nama,
      })) || []
    );
  }, [suppliers]);

  return { supplierOptions, isLoading };
}

export function useGetSupplierBooks(supplierId: string) {
  return useQuery<ApiResponse<Buku[]>>({
    queryKey: ['supplier', 'buku', supplierId, 'supplier-books'],
    queryFn: async () => {
      const res = await api.get(`/suppliers/${supplierId}/books`);
      return res.data;
    },
    placeholderData: keepPreviousData,
    enabled: !!supplierId,
  });
}

export function useSupplierBooksOptions(supplierId: string) {
  const { data: books, isLoading } = useGetSupplierBooks(supplierId);

  const supplierBooksOptions = useMemo(() => {
    return (
      books?.data?.map((book) => ({
        value: book.buku_id,
        label: book.judul,
      })) || []
    );
  }, [books]);

  return { supplierBooksOptions, isLoading };
}
