import { useLocation } from 'react-router-dom';
import { dataManagementNavItems } from '@/config/data-management.config';

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

  const subItems = dataManagementNavItems.subItems;

  for (const item of subItems) {
        if (item.href === pathname) {
          return item;
        }
  }
  return { label: '', name: '', href: '', dataConfig: [] };
};