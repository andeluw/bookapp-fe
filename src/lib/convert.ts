export function convertToBukuId(id: number): string {
  return `BK${id.toString().padStart(6, '0')}`;
}

export function convertFromBukuId(bukuId: string): number {
  if (!/^BK\d{6}$/.test(bukuId)) {
    throw new Error('Invalid buku_id format');
  }
  return parseInt(bukuId.slice(2), 10);
}

export function convertToPembelianId(id: number): string {
  return `PB${id.toString().padStart(8, '0')}`;
}

export function convertFromPembelianId(pembelianId: string): number {
  if (!/^PB\d{8}$/.test(pembelianId)) {
    throw new Error('Invalid pembelian_id format');
  }
  return parseInt(pembelianId.slice(2), 10);
}

export function convertToPenjualanId(id: number): string {
  return `PJ${id.toString().padStart(8, '0')}`;
}
export function convertFromPenjualanId(penjualanId: string): number {
  if (!/^PJ\d{8}$/.test(penjualanId)) {
    throw new Error('Invalid penjualan_id format');
  }
  return parseInt(penjualanId.slice(2), 10);
}
