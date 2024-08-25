import {
  Navbar as NextUINavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from '@nextui-org/navbar';
import { DropdownItem, DropdownTrigger, Dropdown, DropdownMenu } from '@nextui-org/react';
import { link as linkStyles } from '@nextui-org/theme';
import clsx from 'clsx';

import { siteConfig } from '@/config/site';
import { ChevronDown, SearchIcon, UserIcon } from '@/components/icons';
import { Logo } from '@/components/icons';
import { Link } from 'react-router-dom';

export const Navbar = () => {
  return (
    <NextUINavbar
      maxWidth='xl'
      position='sticky'
      className='bg-white shadow-md h-11'
      classNames={{
        wrapper: 'max-w-full',
      }}
    >
      <NavbarContent justify='start'>
        <NavbarBrand className='gap-3 max-w-fit'>
          <Link
            className='flex justify-start items-center gap-1'
            color='foreground'
            to='/'
          >
            <Logo />
            <p className='font-bold text-inherit text-sm'>ACME</p>
          </Link>
        </NavbarBrand>
        <div className='hidden lg:flex gap-8 justify-start ml-2'>
          {siteConfig.navItems.map((item) => {
            return item.subItems ? (
              <Dropdown key={item.label}>
                <NavbarItem>
                  <DropdownTrigger>
                    <div
                      className={clsx(
                        linkStyles({ color: 'foreground' }),
                        'data-[active=true]:text-primary data-[active=true]:font-medium font-medium text-sm cursor-pointer'
                      )}
                      color='foreground'
                    >
                      {item.label}
                      <span>
                        <ChevronDown size={16} />
                      </span>
                    </div>
                  </DropdownTrigger>
                </NavbarItem>
                <DropdownMenu
                  aria-label='ACME features'
                  className='h-96 overflow-y-auto'
                  // itemClasses={{
                  //   base: 'gap-4',
                  // }}
                >
                  {item.subItems.map((subItem) => (
                    <DropdownItem key={subItem.href}>
                      <Link
                        className={clsx(
                          linkStyles({ color: 'foreground' }),
                          'data-[active=true]:text-primary data-[active=true]:font-medium font-medium text-sm pr-16'
                        )}
                        color='foreground'
                        to={subItem.href}
                      >
                        {subItem.label}
                      </Link>
                    </DropdownItem>
                  ))}
                </DropdownMenu>
              </Dropdown>
            ) : (
              <NavbarItem key={item.href}>
                <Link
                  className={clsx(
                    linkStyles({ color: 'foreground' }),
                    'data-[active=true]:text-primary data-[active=true]:font-medium font-medium text-sm'
                  )}
                  color='foreground'
                  to={item.href}
                >
                  {item.label}
                </Link>
              </NavbarItem>
            );
          })}
        </div>
      </NavbarContent>

      <NavbarContent justify='end'>
        <NavbarItem>
          <div className='p-2 rounded-full cursor-pointer'>
            <SearchIcon />
          </div>
        </NavbarItem>
        <NavbarItem>
          <div className='p-2 rounded-full cursor-pointer'>
            <UserIcon />
          </div>
        </NavbarItem>
        <NavbarMenuToggle className='lg:hidden' />
      </NavbarContent>

      <NavbarMenu>
        <div className='mx-4 mt-2 flex flex-col gap-2'>
          {siteConfig.navMenuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                color={'foreground'}
                to='#'
                // size='lg'
              >
                {item.label}
              </Link>
            </NavbarMenuItem>
          ))}
        </div>
      </NavbarMenu>
    </NextUINavbar>
  );
};
