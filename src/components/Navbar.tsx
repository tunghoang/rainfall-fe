import { Link } from '@nextui-org/link';
import {
  Navbar as NextUINavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from '@nextui-org/navbar';
import { link as linkStyles } from '@nextui-org/theme';
import clsx from 'clsx';

import { siteConfig } from '@/config/site';
import { SearchIcon, UserIcon } from '@/components/icons';
import { Logo } from '@/components/icons';

export const Navbar = ({ wrapperClassName }: { wrapperClassName?: string }) => {
  return (
    <NextUINavbar
      maxWidth='xl'
      position='sticky'
      className='bg-white shadow-md navbar-height'
      classNames={{
        wrapper: wrapperClassName,
      }}
    >
      <NavbarContent justify='start'>
        <NavbarBrand className='gap-3 max-w-fit'>
          <Link
            className='flex justify-start items-center gap-1'
            color='foreground'
            href='/'
          >
            <Logo />
            <p className='font-bold text-inherit'>ACME</p>
          </Link>
        </NavbarBrand>
        <div className='hidden lg:flex gap-8 justify-start ml-2'>
          {siteConfig.navItems.map((item) => (
            <NavbarItem key={item.href}>
              <Link
                className={clsx(
                  linkStyles({ color: 'foreground' }),
                  'data-[active=true]:text-primary data-[active=true]:font-medium font-medium '
                )}
                color='foreground'
                href={item.href}
              >
                {item.label}
              </Link>
            </NavbarItem>
          ))}
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
                href='#'
                size='lg'
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
