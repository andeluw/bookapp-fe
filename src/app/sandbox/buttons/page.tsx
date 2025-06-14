'use client';

import {
  ArrowRight,
  CreditCard,
  HelpCircle,
  Laptop,
  Minus,
  Phone,
  Plus,
  Shield,
  X,
} from 'lucide-react';
import React from 'react';

import Button, { ButtonVariant } from '@/components/buttons/Button';
import IconButton from '@/components/buttons/IconButton';
import TextButton from '@/components/buttons/TextButton';
import ArrowLink from '@/components/links/ArrowLink';
import ButtonLink from '@/components/links/ButtonLink';
import PrimaryLink from '@/components/links/PrimaryLink';
import UnderlineLink from '@/components/links/UnderlineLink';
import UnstyledLink from '@/components/links/UnstyledLink';
import Typography from '@/components/Typography';

const variantKeys = [
  'primary',
  'secondary',
  'outline',
  'ghost',
  'light',
  'dark',
  'destructive',
  'outlineblack',
] as ButtonVariant[];

/* eslint-disable @typescript-eslint/no-non-null-assertion */

export default function ButtonSandboxPage() {
  const renderButtonRow = (
    props?: Partial<React.ComponentProps<typeof Button>>
  ) => (
    <div className='flex flex-wrap gap-2'>
      {variantKeys.map((variant: ButtonVariant) => (
        <Button key={variant} variant={variant} {...props}>
          {variant!.charAt(0).toUpperCase() + variant?.slice(1)}
        </Button>
      ))}
    </div>
  );

  const renderIconButtons = (
    props?: Partial<React.ComponentProps<typeof Button>>
  ) => (
    <div className='flex flex-wrap gap-2'>
      {variantKeys.map((variant) => (
        <Button
          key={variant}
          variant={variant}
          leftIcon={Plus}
          rightIcon={ArrowRight}
          {...props}
        >
          Icon
        </Button>
      ))}
    </div>
  );

  return (
    <div className='layout min-h-screen py-20 bg-white text-black'>
      <Typography as='h1' variant='h1'>
        Button Sandbox
      </Typography>

      <UnderlineLink href='/sandbox' className='mt-2'>
        Back to Sandbox
      </UnderlineLink>

      <section className='mt-10 space-y-8'>
        <div className='space-y-6'>
          <Typography variant='h3'>Button</Typography>
          {renderButtonRow()}
          {renderIconButtons()}
          {renderButtonRow({ size: 'sm' })}
          {renderIconButtons({ size: 'sm' })}
          {renderButtonRow({ size: 'md' })}
          {renderIconButtons({ size: 'md' })}
          {renderButtonRow({ size: 'lg' })}
          {renderIconButtons({ size: 'lg' })}
          {renderButtonRow({ disabled: true })}
          {renderButtonRow({ isLoading: true })}
        </div>

        <div className='space-y-2'>
          <Typography variant='h3'>ButtonLink</Typography>
          <div className='flex flex-wrap gap-2'>
            {variantKeys.map((variant) => (
              <ButtonLink
                key={variant}
                variant={variant}
                href='https://google.com'
              >
                {variant!.charAt(0).toUpperCase() + variant!.slice(1)}
              </ButtonLink>
            ))}
          </div>
        </div>

        <div className='space-y-2'>
          <Typography variant='h3'>PrimaryLink</Typography>
          <div className='flex flex-wrap gap-4'>
            <PrimaryLink href='/'>Internal Links</PrimaryLink>
            <PrimaryLink href='https://google.com'>Outside Links</PrimaryLink>
          </div>
        </div>

        <div className='space-y-2'>
          <Typography variant='h3'>UnstyledLink</Typography>
          <div className='flex flex-wrap gap-4'>
            <UnstyledLink href='/'>Internal Links</UnstyledLink>
            <UnstyledLink href='https://google.com'>Outside Links</UnstyledLink>
          </div>
        </div>

        <div className='space-y-2'>
          <Typography variant='h3'>UnderlineLink</Typography>
          <div className='flex flex-wrap gap-4'>
            <UnderlineLink href='/'>Internal Links</UnderlineLink>
            <UnderlineLink href='https://google.com'>
              Outside Links
            </UnderlineLink>
          </div>
        </div>

        <div className='space-y-2'>
          <Typography variant='h3'>ArrowLink</Typography>
          <div className='flex items-center flex-wrap gap-4'>
            <ArrowLink href='/' direction='left'>
              Direction Left
            </ArrowLink>
            <ArrowLink href='/'>Direction Right</ArrowLink>
            <ArrowLink
              as={UnstyledLink}
              className='inline-flex items-center'
              href='/'
            >
              Polymorphic
            </ArrowLink>
            <ArrowLink
              as={ButtonLink}
              variant='light'
              className='inline-flex items-center'
              href='/'
            >
              Polymorphic
            </ArrowLink>
          </div>
        </div>

        <div className='space-y-2'>
          <Typography variant='h3'>TextButton</Typography>
          <div className='flex flex-wrap gap-2'>
            <TextButton>Primary</TextButton>
            <TextButton variant='basic'>Basic</TextButton>
          </div>
        </div>

        <div className='space-y-2'>
          <Typography variant='h3'>IconButton</Typography>
          <div className='flex flex-wrap gap-2'>
            <IconButton icon={Plus} />
            <IconButton variant='secondary' icon={Minus} />
            <IconButton variant='outline' icon={Laptop} />
            <IconButton variant='ghost' icon={Phone} />
            <IconButton variant='dark' icon={Shield} />
            <IconButton variant='light' icon={CreditCard} />
            <IconButton variant='destructive' icon={X} />
            <IconButton variant='outlineblack' icon={HelpCircle} />
          </div>
        </div>
      </section>
    </div>
  );
}
