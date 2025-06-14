import { LOCALE } from '@/constant/common';

export function formatDateToLocalYYYYMMDD(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export const formatTimeUTC = (date: Date) => {
  const time = new Date(date);
  const hours = String(time.getUTCHours()).padStart(2, '0');
  const minutes = String(time.getUTCMinutes()).padStart(2, '0');
  return `${hours}:${minutes}`;
};

export const formatTimeRangeUTC = (jamAwal: Date, jamAkhir: Date) => {
  const start = formatTimeUTC(jamAwal);
  const end = formatTimeUTC(jamAkhir);

  return `${start} - ${end}`;
};

export const formatDateString = (
  date: Date | string | null | undefined
): string => {
  if (!date) return '-';

  const dateObj =
    typeof date === 'string' || typeof date === 'number'
      ? new Date(date)
      : date;

  return new Intl.DateTimeFormat(LOCALE, {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  }).format(dateObj);
};

export function formatMonthYear(dateInput: string | Date): string {
  const date = new Date(dateInput);
  return date.toLocaleString(LOCALE, {
    month: 'long',
    year: 'numeric',
  });
}
