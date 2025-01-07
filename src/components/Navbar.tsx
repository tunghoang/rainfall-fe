import {
  Navbar as NextUINavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from '@nextui-org/navbar';
import { DropdownItem, DropdownTrigger, Dropdown, DropdownMenu, Button, Autocomplete, AutocompleteItem,
    useDisclosure } from '@nextui-org/react';
import {useState, useMemo} from 'react';
import { link as linkStyles } from '@nextui-org/theme';
import clsx from 'clsx';

import {jwtDecode} from 'jwt-decode'
import { SiteConfig, siteConfig } from '@/config/site';
import { ChevronDown } from '@/components/icons';
import { Logo } from '@/components/icons';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { SettingsModal } from '@/dialogs/SettingsModal.tsx'
import _tr from "../translation"

import SignIn from '../dialogs/SignIn'
import SignInIcon from '../icons/SignIn'
import SignOutIcon from '../icons/SignOut'
import SearchIcon from '../icons/Search'
import UserIcon from '../icons/User'

import { dataManagementNavItems } from "../config/data-management.config";

import { login } from "@/api"

export const Navbar = ({token, setToken}) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { isOpen: isSettingsOpen, onOpen:onSettingsOpen, onOpenChange: onSettingsOpenChange } = useDisclosure()
  //const __token = localStorage.getItem('token')
  //const [ token, setToken ] = useState(__token)
  const { pathname } = useLocation()
  let userName = useMemo(() => {
    try {
      if (token) {
        const payload = jwtDecode(token);
        return (<span>{payload.fullname} (<span className='text-xs italic font-serif'>{payload.email}</span>)</span>)
      }
    }
    catch(e) {
      localStorage.removeItem('token')
      setToken(null)
    }
    return ''
  }, [token])
  let navigate = useNavigate()
  const renderItem = (item) => {
    if ('subItems' in item) {
      return (
        <Dropdown key={item.label}>
          <NavbarItem className='menu-item px-2'>
            <DropdownTrigger>
              <div
                className={clsx(
                  linkStyles({ color: 'foreground' }),
                  'data-[active=true]:text-primary data-[active=true]:font-medium font-medium text-sm cursor-pointer'
                )}
                color='foreground'
              >
                {_tr(item.label)}
                <span>
                  <ChevronDown size={16} />
                </span>
              </div>
            </DropdownTrigger>
          </NavbarItem>
          <DropdownMenu
            className='max-h-96 overflow-y-auto'
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
      );
    } 
    else {
      return (
        <NavbarItem isActive={item.href === pathname} key={item.href} className='menu-item px-2' style={{lineHeight:2.2}}>
          <Link
            className='text-sm'
            color='foreground'
            to={item.href}
          >
            {_tr(item.label)}
          </Link>
        </NavbarItem>
      );
    }
  }
  return (
    <NextUINavbar
      maxWidth='xl'
      position='sticky'
      style={{boxShadow: "0 1px 2px 1px #aaa", zIndex:60, /*background: '#8df'*/}}
      className='bg-white shadow-md h-11 \'
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
            <Logo style={{stroke:"blue", fill: "blue"}}/>
            <p className='font-bold text-primary text-sm'>INDRA</p>
          </Link>
        </NavbarBrand>
        <div className='hidden lg:flex gap-4 justify-start ml-2 items-center'>
          {token?
            (<>
                {siteConfig.navItems.map((item) => renderItem(item))}
                <NavbarItem>
                    <Autocomplete placeholder="Search for a product" variant='faded' size='sm'
                        aria-label='select product'
                        startContent={<SearchIcon size={14} color="#121213" filled={false} />}
                        defaultItems={dataManagementNavItems.subItems}
                        className="w-60"
                        classNames="w-60 bordered-small"
                        onSelectionChange={(sel) => {
                            if ( sel === null ) return
                            console.log(sel);
                            navigate(sel);
                        }}
                    >
                        {(item) => <AutocompleteItem key={item.href}>{item.label||item.name}</AutocompleteItem>}
                    </Autocomplete>
                </NavbarItem>
                <NavbarItem isActive={'/admin' === pathname} key='/admin' className='menu-item admin-item px-2' style={{lineHeight:2.2}} >
                    <Link className='text-sm' color='foreground' to='/admin' >
                        {_tr('Admin Zone')}
                    </Link>
                </NavbarItem>
            </>):
            siteConfig.navItems.filter((item) => item.public).map((item) => renderItem(item))
          }
        </div>
      </NavbarContent>

      <NavbarContent justify='end' className="gap-0">
        {token?<>
        <NavbarItem>
          <div className="py-2 cursor-pointer">
            <Button radius='none' variant='light' className="px-0" onPress={() => {
              console.log('kakaka')
              onSettingsOpen()
            }}>
              <UserIcon style={{display: 'inline-block'}} filled={false}/><span>{userName}</span>
            </Button>
            <SettingsModal isOpen={isSettingsOpen} onOpenChange={onSettingsOpenChange} />
          </div>
        </NavbarItem>
        <NavbarItem>
          <div className='py-2 cursor-pointer'>
            <Button radius='none' isIconOnly variant='light' className="px-0" onPress={()=> {
                localStorage.removeItem('token')
                setToken(null)
                console.log('Sign out')
                navigate('/')
            }}><SignOutIcon /></Button>
          </div>
        </NavbarItem></> : <NavbarItem>
          <div className='py-2 cursor-pointer'>
            <Button radius='none' isIconOnly variant="light" onPress={onOpen} className="px-0" ><SignInIcon /></Button>
            <SignIn isOpen={isOpen} onOpenChange={onOpenChange} onLogin={async function(username, password) {
                console.log(username, password);
                const payload = await login(username, password)
                localStorage.setItem('token', payload.access_token);
                setToken(payload.access_token);
            }}/>
          </div>
        </NavbarItem>}
        <NavbarMenuToggle className='lg:hidden' />
      </NavbarContent>

    </NextUINavbar>
  );
};
