import * as React from 'react';

import { cn } from '@/lib/utils';

type OptionProps = {
  children: React.ReactNode;
  icon?: React.ReactNode;
  placeholder?: string;
  value: string | number | readonly string[] | undefined;
  onChange: React.ChangeEventHandler<HTMLSelectElement>;
};

const Option = ({
  children,
  icon: Icon,
  placeholder,
  onChange,
  value,
}: OptionProps) => {
  return (
    <div className='relative flex items-center'>
      {Icon ? (
        <div className='pointer-events-none absolute inset-y-0 left-3 flex items-center text-typo-secondary'>
          {Icon}
        </div>
      ) : null}
      <select
        className={cn(
          'block rounded-md px-8 text-sm font-semibold text-typo-secondary',
          'border-none outline-none focus:border-none focus:outline-none focus:ring-0',
          'h-[2.25rem] py-0 md:h-[2.5rem]',
          'focus-visible:ring focus-visible:ring-primary-400',
          'active:bg-primary-100 disabled:bg-primary-100'
        )}
        onChange={onChange}
        value={value}
      >
        {placeholder ? (
          <option disabled hidden value=''>
            {placeholder}
          </option>
        ) : null}
        {children}
      </select>
    </div>
  );
};
Option.displayName = 'Option';

export { Option };
