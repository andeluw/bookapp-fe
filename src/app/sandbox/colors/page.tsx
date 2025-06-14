import React from 'react';

import UnderlineLink from '@/components/links/UnderlineLink';
import Typography from '@/components/Typography';

const systemColors = [
  'background',
  'foreground',
  'card',
  'card-foreground',
  'popover',
  'popover-foreground',
  'primary',
  'primary-foreground',
  'secondary',
  'secondary-foreground',
  'muted',
  'muted-foreground',
  'accent',
  'accent-foreground',
  'destructive',
  'destructive-foreground',
  'border',
  'input',
  'ring',
  'chart-1',
  'chart-2',
  'chart-3',
  'chart-4',
  'chart-5',
];

const primaryShades = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];

export default function Page() {
  return (
    <div className='py-20 min-h-screen layout space-y-20'>
      <div>
        <Typography as='h1' variant='h1'>
          Color Sandbox
        </Typography>
        <UnderlineLink href='/sandbox' className='mt-2'>
          Back to Sandbox
        </UnderlineLink>
      </div>

      <div>
        <Typography as='h2' variant='h2' className='mb-4'>
          Primary Colors
        </Typography>
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4'>
          {primaryShades.map((shade) => (
            <div key={shade} className='flex items-center gap-4'>
              <div
                className='w-16 h-16 rounded-md border'
                style={{
                  backgroundColor: `rgb(var(--tw-color-primary-${shade}))`,
                }}
              />
              <span className='text-sm font-mono'>primary-{shade}</span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <Typography as='h2' variant='h2' className='mb-4'>
          System Colors
        </Typography>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
          {systemColors.map((color) => (
            <div key={color} className='flex items-center gap-4'>
              <div
                className='w-16 h-16 rounded-md border'
                style={{ backgroundColor: `hsl(var(--${color}))` }}
              />
              <span className='text-sm font-mono'>{color}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
