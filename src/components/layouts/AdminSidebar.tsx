'use client';
import { BookOpenText, Minus, Plus } from 'lucide-react';
import { usePathname } from 'next/navigation';
import * as React from 'react';

import { navigation } from '@/lib/content/navigation';

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/Collapsible';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from '@/components/layouts/Sidebar';
import UnstyledLink from '@/components/links/UnstyledLink';
import Typography from '@/components/Typography';

export function AdminSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <UnstyledLink
              href='/'
              className='flex py-3 px-1 items-center gap-2'
            >
              <BookOpenText className='text-primary-600' size={24} />
              <Typography variant='h3' className='text-primary-600 font-bold'>
                BookApp
              </Typography>
            </UnstyledLink>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {navigation.navMain.map((item, index) => (
              <Collapsible
                key={item.title}
                defaultOpen={index === 1}
                className='group/collapsible'
              >
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton>
                      {item.title}{' '}
                      <Plus className='ml-auto group-data-[state=open]/collapsible:hidden' />
                      <Minus className='ml-auto group-data-[state=closed]/collapsible:hidden' />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  {item.items?.length ? (
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {item.items.map((item) => (
                          <SidebarMenuSubItem key={item.title}>
                            <SidebarMenuSubButton
                              asChild
                              isActive={
                                item.exactMatch
                                  ? pathname === item.url
                                  : pathname.startsWith(item.url)
                              }
                            >
                              <a href={item.url} className='text-nowrap'>
                                {item.title}
                              </a>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  ) : null}
                </SidebarMenuItem>
              </Collapsible>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
