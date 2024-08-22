import { useRoutes } from 'react-router-dom';

import HomePage from '@/pages/HomePage';
import MapPage from './pages/MapPage';
import DashboardPage from '@/pages/DashboardPage';
import AboutPage from '@/pages/AboutPage';
import WorkspacesPage from './pages/data-management/WorkspacesPage';
import LayersPage from './pages/data-management/LayersPage';
import StoresPage from './pages/data-management/StoresPage';

function RoutesPage() {
  const routes = useRoutes([
    { path: '/', element: <HomePage />, index: true },
    { path: 'map', element: <MapPage /> },
    { path: 'dashboard', element: <DashboardPage /> },
    {
      path: 'data-management',
      children: [
        {
          path: 'workspaces',
          element: <WorkspacesPage />,
        },
        {
          path: 'stores',
          element: <StoresPage />,
        },
        {
          path: 'layers',
          element: <LayersPage />,
        },
      ],
    },
    { path: 'about', element: <AboutPage /> },
    { path: '*', element: <HomePage /> },
  ]);

  return routes;
}

export default RoutesPage;
