import { useRoutes, Navigate } from 'react-router-dom';

import HomePage from '@/pages/HomePage';
import MapPage from './pages/MapPage';
import DashboardPage from '@/pages/DashboardPage';
import AboutPage from '@/pages/AboutPage';
import UserManPage from '@/pages/UserManPage';
import { siteConfig } from './config/site.ts'
import { dataManagementNavItems } from './config/data-management.config';
import DataSourcesPage from './pages/data-management/DataSourcePage';

function RoutesPage() {
  console.log(siteConfig.navItems)
  const routes = useRoutes([
    /*{ path: '/', element: <MapPage />, index: true },*/
    { path: '/', element: <Navigate to={siteConfig.navItems[0].href==='/map'?siteConfig.navItems[0].href:dataManagementNavItems.subItems[0].href} />, index: true },
    { path: 'map', element: <MapPage /> },
    { path: 'dashboard', element: <DashboardPage /> },
    {
      path: 'data-management',
      children: dataManagementNavItems.subItems.map((item) => {
        return {
          path: item.href.slice(item.href.lastIndexOf('/') + 1, item.href.length),
          element: <DataSourcesPage />,
        };
      }),
    },
    { path: '/user', element: <UserManPage /> },
    { path: 'about', element: <AboutPage /> },
    { path: '*', element: <MapPage /> },
  ]);

  return routes;
}

export default RoutesPage;
