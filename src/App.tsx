import 'leaflet/dist/leaflet.css';
import { useRoutes } from 'react-router-dom';

import HomePage from '@/pages/HomePage';
import MapPage from './pages/MapPage';
import DashboardPage from '@/pages/DashboardPage';
import AboutPage from '@/pages/AboutPage';
import OtherToolsPage from './pages/OtherToolsPage';
import DataSourcesPage from './pages/DataSourcesPage';
import DataCatalogPage from './pages/DataCatalogPage';
import DataCollectionPage from './pages/DataCollectionPage';

function App() {
  const routes = useRoutes([
    { path: '/', element: <HomePage />, index: true },
    { path: 'map', element: <MapPage /> },
    { path: 'dashboard', element: <DashboardPage /> },
    {
      path: 'data-management',
      children: [
        {
          path: 'data-sources',
          element: <DataSourcesPage />,
        },
        {
          path: 'data-catalog',
          element: <DataCatalogPage />,
        },
        {
          path: 'data-collection',
          element: <DataCollectionPage />,
        },
        {
          path: 'data-analysis',
          element: <DataCollectionPage />,
        },
        {
          path: 'data-visualization',
          element: <DataCollectionPage />,
        },
        {
          path: 'data-report',
          element: <DataCollectionPage />,
        },
      ],
    },
    { path: 'about', element: <AboutPage /> },
    { path: 'other-tools', element: <OtherToolsPage /> },
  ]);

  return routes;
}

export default App;
