'use client';
import get from 'lodash.get';
import { ChevronDown, X } from 'lucide-react';
import type { RegisterOptions } from 'react-hook-form';
import { Controller, useFormContext } from 'react-hook-form';
import type { MultiValue, StylesConfig } from 'react-select';
import ReactSelect, { components } from 'react-select';

import type { ExtractProps } from '@/lib/helper';
import { cn } from '@/lib/utils';

import ErrorMessage from '@/components/forms/ErrorMessage';
import HelperText from '@/components/forms/HelperText';
import { Label } from '@/components/forms/Label';

export type SelectProps = {
  label?: string | null;
  id: string;
  placeholder?: React.ReactNode;
  helperText?: string;
  type?: string;
  isFixed?: boolean;
  isMulti?: boolean;
  readOnly?: boolean;
  hideError?: boolean;
  validation?: RegisterOptions;
  options: { value: string; label: string }[];
  containerClassName?: string;
} & React.ComponentPropsWithoutRef<'select'> &
  ExtractProps<ReactSelect>;

const Select = ({
  disabled,
  readOnly,
  label,
  helperText,
  id,
  isFixed = false,
  isMulti = false,
  placeholder,
  validation,
  options,
  hideError = false,
  containerClassName,
  ...rest
}: SelectProps) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  const error = get(errors, id);
  const withLabel = !!label;

  //#region  //*=========== Styles ===========
  const customStyles: StylesConfig = {
    control: (styles) => ({
      ...styles,
      // red-500 and gray-300
      border: `solid ${error ? '2px #EF4444' : '1.5px #D1D5DB'}`,
      '&:hover': {
        border: `solid 2px ${error ? '#EF4444' : '#D1D5DB'}`,
      },
      boxShadow: 'none',
      transition: 'none',
      '&:focus-within': {
        border: `solid 1.25px ${
          error ? '#EF4444' : 'var(--color-primary-500)'
        }`,
        boxShadow: `0 0 0 1.25px ${
          error ? '#EF4444' : 'var(--color-primary-500)'
        }`,
      },
      '*': {
        boxShadow: 'none !important',
      },
      borderRadius: '0.5rem',
      padding: '0 0.75rem',
      background: disabled || readOnly ? '#F3F4F6' : undefined,
      cursor: 'pointer',
    }),
    valueContainer: (styles) => ({
      ...styles,
      padding: 0,
      gap: '0.5rem',
    }),
    input: (styles) => ({
      ...styles,
      padding: 0,
      margin: 0,
      caretColor: 'var(--color-primary-500)',
      color: '#1F201d',
      '::placeholder': {
        color: '#5a5d56',
      },
    }),
    singleValue: (styles) => ({
      ...styles,
      color: 'inherit',
    }),
    indicatorsContainer: (styles) => ({
      ...styles,
      '&>div': {
        padding: 0,
      },
    }),
    dropdownIndicator: (styles) => ({
      ...styles,
      color: '#878787',
      '&:hover': {
        color: '#878787',
      },
    }),
    option: (styles, state) => ({
      ...styles,
      color: 'black',
      background: state.isFocused
        ? 'var(--color-primary-50)'
        : state.isSelected
        ? 'var(--color-primary-100)'
        : 'white',
      ':hover': {
        background: '#E5E7EB',
      },
      cursor: 'pointer',
    }),
    multiValue: (styles) => ({
      ...styles,
      display: 'flex',
      alignItems: 'center',
      gap: '0.25rem',
      background: 'var(--color-primary-100)',
      borderRadius: '0.375rem',
      padding: '0.25rem 0.75rem',
      margin: 0,
    }),
    multiValueLabel: (styles) => ({
      ...styles,
      color: 'var(--color-primary-700)',
      padding: 0,
      paddingLeft: 0,
    }),
    multiValueRemove: (styles) => ({
      ...styles,
      color: 'var(--color-primary-700)',
      padding: 0,
      paddingLeft: '0.5rem',
      '&:hover': {
        color: 'var(--color-primary-700)',
        backgroundColor: 'transparent',
      },
    }),
    menu: (styles) => ({
      ...styles,
      borderRadius: '0.5rem',
      overflow: 'hidden',
    }),
    menuPortal: (styles) => ({
      ...styles,
      zIndex: 1,
    }),
  };

  //#endregion  //*======== Styles ===========

  return (
    <div className={containerClassName}>
      {withLabel ? (
        <Label required={validation?.required ? true : false}>{label}</Label>
      ) : null}
      <div
        className={cn(
          'relative',
          withLabel && 'mt-2',
          (disabled || readOnly) && 'cursor-not-allowed'
        )}
      >
        <Controller
          control={control}
          name={id}
          render={({ field }) => {
            return (
              <ReactSelect
                {...field}
                classNames={{
                  control: () => '!h-[2.5rem]',
                }}
                closeMenuOnSelect={!isMulti}
                components={{
                  IndicatorSeparator: () => null,
                  DropdownIndicator: (props) => (
                    <components.DropdownIndicator {...props}>
                      <ChevronDown size={18} />
                    </components.DropdownIndicator>
                  ),
                  ClearIndicator: (props) => (
                    <components.ClearIndicator {...props}>
                      <X
                        className='mr-0.5 text-typo-icons hover:text-typo-secondary'
                        size={18}
                      />
                    </components.ClearIndicator>
                  ),
                  MultiValueRemove: (props) => (
                    <components.MultiValueRemove {...props}>
                      <X size={18} />
                    </components.MultiValueRemove>
                  ),
                }}
                inputId={id}
                isClearable
                isDisabled={disabled || readOnly}
                isMulti={isMulti}
                menuPosition={isFixed ? 'fixed' : undefined}
                onChange={(selectedOptions) => {
                  isMulti
                    ? field.onChange(
                        (
                          selectedOptions as MultiValue<
                            (typeof options)[number]
                          >
                        ).map((option) => option?.value ?? '')
                      )
                    : field.onChange(
                        (selectedOptions as (typeof options)[number])?.value ??
                          ''
                      );
                }}
                options={options}
                placeholder={placeholder}
                styles={customStyles}
                value={
                  //? null is needed so if the selected value is not found in the options, it will clear the value
                  isMulti
                    ? field.value?.map(
                        (value: unknown) =>
                          options.find((option) => option.value === value) ??
                          null
                      )
                    : options.find((opt) => opt.value === field.value) ?? null
                }
                {...rest}
              />
            );
          }}
          rules={validation}
        />
        {!hideError && error ? (
          <ErrorMessage className='mt-2'>
            {String(error.message ?? '')}
          </ErrorMessage>
        ) : null}
        {helperText ? (
          <HelperText helperTextClassName='mt-2'>{helperText}</HelperText>
        ) : null}
      </div>
    </div>
  );
};
Select.displayName = 'Select';

export default Select;
