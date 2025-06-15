import type { RowData, Table } from '@tanstack/react-table';
import { flexRender } from '@tanstack/react-table';
import * as React from 'react';

import { cn } from '@/lib/utils';

import Typography from '@/components/Typography';

type TableBodyProps<T extends RowData> = {
  emptyPlaceholder?: React.ReactNode;
  isLoading?: boolean;
  omitSort: boolean;
  table: Table<T>;
} & React.ComponentPropsWithoutRef<'div'>;

const TableBody = <T extends RowData>({
  className,
  emptyPlaceholder,
  isLoading = false,
  omitSort,
  table,
  ...rest
}: TableBodyProps<T>) => {
  const rows = table.getRowModel().rows;

  return (
    <tbody
      className={cn('divide-y divide-typo-divider bg-white', className)}
      {...rest}
    >
      {isLoading ? (
        <tr className='animate-pulse bg-gray-50'>
          <td
            className='whitespace-nowrap px-6 py-4 text-center text-sm text-gray-700'
            colSpan={table.getAllColumns().length}
          >
            <span>Memuat data...</span>
          </td>
        </tr>
      ) : null}
      {rows.length === 0 && !isLoading ? (
        <tr className='bg-gray-50'>
          <td
            className='whitespace-nowrap px-6 py-4 text-center text-sm text-gray-700'
            colSpan={table.getAllColumns().length}
          >
            {typeof emptyPlaceholder === 'string' ? (
              <span>{emptyPlaceholder}</span>
            ) : (
              emptyPlaceholder || <span>Data tidak ditemukan</span>
            )}
          </td>
        </tr>
      ) : (
        rows.map((row, index) => (
          <tr
            className={cn(index % 2 === 0 ? 'bg-white' : 'bg-gray-50')}
            key={`${row.id}-${index}`}
          >
            {row.getVisibleCells().map((cell) => (
              <Typography
                as='td'
                className={cn([
                  'whitespace-nowrap',
                  'truncate',
                  'py-4 pr-3',
                  !omitSort && cell.column.getCanSort()
                    ? 'pl-[34px]'
                    : 'pl-[30px]',
                ])}
                color='secondary'
                key={cell.id}
                style={{
                  width:
                    cell.column.getSize() !== 0
                      ? cell.column.getSize()
                      : undefined,
                  maxWidth:
                    cell.column.getSize() !== 0
                      ? cell.column.getSize()
                      : undefined,
                }}
                title={cell.getValue() as string}
                variant='b2'
              >
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </Typography>
            ))}
          </tr>
        ))
      )}
    </tbody>
  );
};
TableBody.displayName = 'TableBody';

export { TableBody };
