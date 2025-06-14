import type {
  ColumnDef,
  PaginationState,
  Row,
  SortingState,
} from '@tanstack/react-table';
import { getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { ChevronLeft, ChevronRight, List } from 'lucide-react';
import * as React from 'react';
import { CSSProperties } from 'react';

import { cn } from '@/lib/utils';

import Button from '@/components/buttons/Button';
import { Filter } from '@/components/table/Filter';
import { Option } from '@/components/table/Option';
import { TableBody } from '@/components/table/TableBody';
import { TableHead } from '@/components/table/TableHead';
import Typography from '@/components/Typography';

import { LOCALE } from '@/constant/common';

import { PaginatedApiResponse } from '@/types/api';

export interface ServerTableState {
  globalFilter: string;
  pagination: PaginationState;
  sorting: SortingState;
}

interface CustomTableMeta<T> {
  getRowStyles?: (row: Row<T>) => CSSProperties;
}

type ConditionalStyles<T> = (row: Row<T>) => CSSProperties;

interface SetServerTableState {
  setGlobalFilter: React.Dispatch<React.SetStateAction<string>>;
  setPagination: React.Dispatch<React.SetStateAction<PaginationState>>;
  setSorting: React.Dispatch<React.SetStateAction<SortingState>>;
}

export type ServerTableProps<T extends object> = {
  columns: ColumnDef<T>[];
  data: PaginatedApiResponse<T[]> | undefined;
  emptyPlaceholder?: React.ReactNode;
  filterPlaceholder?: string;
  header?: React.ReactNode;
  isLoading: boolean;
  tableState: ServerTableState;
  setTableState: SetServerTableState;
  meta?: CustomTableMeta<T>;
  conditionalStyles?: ConditionalStyles<T>;
  omitSort?: boolean;
  withFilter?: boolean;
} & React.ComponentPropsWithoutRef<'div'>;

const ServerTable = <T extends object>({
  className,
  columns,
  data: response,
  header: Header,
  isLoading,
  tableState,
  setTableState,
  emptyPlaceholder,
  filterPlaceholder,
  omitSort = false,
  withFilter = false,
  conditionalStyles,
  ...rest
}: ServerTableProps<T>) => {
  const data = response?.data || [];
  const meta = response?.meta;

  const from = meta ? (meta.current_page - 1) * meta.per_page + 1 : 0;
  const to = meta
    ? Math.min(meta.current_page * meta.per_page, meta.total_data)
    : 0;

  const table = useReactTable({
    data,
    columns,
    state: {
      ...tableState,
    },
    defaultColumn: {
      minSize: 0,
      size: 0,
    },
    onGlobalFilterChange: setTableState.setGlobalFilter,
    onPaginationChange: setTableState.setPagination,
    onSortingChange: setTableState.setSorting,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    manualSorting: true,
    pageCount: meta?.total_pages || 0,
    meta: {
      getRowStyles: (row: Row<T>): CSSProperties =>
        conditionalStyles ? conditionalStyles(row) : {},
    },
  });

  return (
    <div className={cn('flex flex-col', className)} {...rest}>
      <div
        className={cn(
          'flex flex-col items-stretch gap-3 sm:flex-row',
          withFilter ? 'sm:justify-between' : 'sm:justify-end'
        )}
      >
        {withFilter ? (
          <Filter
            isLoading={isLoading}
            placeholder={filterPlaceholder}
            table={table}
          />
        ) : null}
        <div className='flex items-center gap-3'>
          {Header}
          <Option
            icon={<List size={16} />}
            onChange={(e) => {
              table.setPageSize(Number(e.target.value));
            }}
            value={table.getState().pagination.pageSize}
          >
            {[5, 10, 25].map((page) => (
              <option key={page} value={page}>
                {page} Entries
              </option>
            ))}
          </Option>
        </div>
      </div>
      <div
        className={cn([
          'mt-2 overflow-x-auto',

          // to allow table to overflow on right side (desktop) and/or both side (mobile)
          '-mx-[4%] sm:-mr-[2.5%]',

          // set enough space so the the drop-shadow is not cropped
          'sm:-ml-[2px] sm:pl-[2px]',
        ])}
      >
        <div className='inline-block min-w-full py-2 align-middle'>
          <div className='overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg'>
            <table className='min-w-full divide-y divide-gray-300'>
              <TableHead omitSort={omitSort} table={table} />
              <TableBody
                emptyPlaceholder={emptyPlaceholder}
                isLoading={isLoading}
                omitSort={omitSort}
                table={table}
              />
            </table>
          </div>
        </div>
      </div>

      {meta && meta.total_data && meta.total_data > 0 ? (
        <Typography
          className='mt-2 md:text-right'
          color='tertiary'
          variant='b3'
        >
          Menampilkan data{' '}
          <span className='font-medium text-typo'>
            {from.toLocaleString(LOCALE)}
          </span>{' '}
          sampai{' '}
          <span className='font-medium text-typo'>
            {to.toLocaleString(LOCALE)}
          </span>{' '}
          dari{' '}
          <span className='font-medium text-typo'>
            {meta.total_data.toLocaleString(LOCALE)}
          </span>{' '}
          entri
        </Typography>
      ) : null}

      {meta && meta.total_data && meta.total_data > 0 ? (
        <div className='flex items-center justify-between gap-x-2 mt-6 md:justify-end'>
          <div className='flex gap-1'>
            <Button
              disabled={meta?.current_page === 1}
              leftIcon={ChevronLeft}
              onClick={() => table.previousPage()}
              size='sm'
              variant='ghost'
            >
              Prev
            </Button>
            <Button
              disabled={meta?.current_page === meta?.total_pages}
              onClick={() => table.nextPage()}
              rightIcon={ChevronRight}
              size='sm'
              variant='ghost'
            >
              Next
            </Button>
          </div>
        </div>
      ) : null}
    </div>
  );
};
ServerTable.displayName = 'ServerTable';

export { ServerTable };
