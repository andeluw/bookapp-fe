import { LOCALE } from '@/constant/common';

export function formatCurrencyIDR(value: number): string {
  return new Intl.NumberFormat(LOCALE, {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 2,
  }).format(value || 0);
}
