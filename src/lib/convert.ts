export function convertToBukuId(id: number): string {
  return `BK${id.toString().padStart(6, '0')}`;
}

export function convertFromBukuId(bukuId: string): number {
  if (!/^BK\d{6}$/.test(bukuId)) {
    throw new Error('Invalid buku_id format');
  }
  return parseInt(bukuId.slice(2), 10);
}
