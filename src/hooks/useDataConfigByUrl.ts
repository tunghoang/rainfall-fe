import { useLocation } from 'react-router-dom';
import { dataManagementNavItems } from '@/config/data-management.config';

type siteConfigType = {
  label: string;
  name: string;
  href: string;
}

export const useDataConfigByUrl = (): siteConfigType => {
  const { pathname } = useLocation();

  const subItems = dataManagementNavItems.subItems;

  for (const item of subItems) {
        if (item.href === pathname) {
          return item;
        }
  }
  return { label: '', name: '', href: ''};
};