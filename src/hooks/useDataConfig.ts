import { useLocation } from 'react-router-dom';
import { siteConfig } from '@/config/site';

type siteConfigType = {
  label: string;
  name: string;
  href: string;
  dataConfig: Array<{ 
    key: string; 
    label: string, 
    isColumn: boolean,
    isCreate: boolean,
    inputType: string 
  }>;
}

export const useDataConfig = (): siteConfigType => {
  const { pathname } = useLocation();

  const navItems = siteConfig.navItems;
  for (const item of navItems) {
    if (item.subItems) {
      for (const subItem of item.subItems) {
        if (subItem.href === pathname) {
          return subItem;
        }
      }
    }
  }
  return { label: '', name: '', href: '', dataConfig: [] };
};