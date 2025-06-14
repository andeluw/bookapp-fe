import { ArrowLeft } from 'lucide-react';

import { AdminSidebar } from '@/components/layouts/AdminSidebar';
import { Crumb, PageHeader } from '@/components/layouts/PageHeader';
import { SidebarInset, SidebarProvider } from '@/components/layouts/Sidebar';
import IconLink from '@/components/links/IconLink';
import { Skeleton } from '@/components/Skeleton';
import Typography from '@/components/Typography';

export default function AdminLayout({
  breadcrumbs,
  title,
  subheading,
  children,
  isLoading,
  backHref,
}: {
  breadcrumbs: Crumb[];
  title: string;
  subheading?: string;
  children: React.ReactNode;
  isLoading?: boolean;
  backHref?: string;
}) {
  return (
    <SidebarProvider>
      <AdminSidebar />
      <SidebarInset>
        <PageHeader breadcrumbs={breadcrumbs} />
        <div className='flex flex-1 flex-col gap-8 px-6 py-6 md:px-12 md:py-8 lg:px-16 lg:py-10 bg-primary-foreground'>
          <div className='flex gap-5 items-center'>
            {backHref && (
              <IconLink
                href={backHref}
                icon={ArrowLeft}
                variant='light'
                className='w-8 h-8'
              />
            )}
            <div className='flex flex-col gap-1.5'>
              <Typography variant='h1'>{title}</Typography>
              <Typography variant='b3' className='text-muted-foreground'>
                {subheading}
              </Typography>
            </div>
          </div>
          {isLoading ? (
            <div className='flex flex-col gap-4 -mt-2 h-full'>
              <Skeleton className='h-full w-full' />
            </div>
          ) : (
            children
          )}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
