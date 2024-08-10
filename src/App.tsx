import 'leaflet/dist/leaflet.css';
import { Route, Routes } from 'react-router-dom';

import HomePage from '@/pages/HomePage';
import MapPage from './pages/MapPage';
import DashboardPage from '@/pages/DashboardPage';
import HelpPage from '@/pages/HelpPage';
import AboutPage from '@/pages/AboutPage';
import BlogPage from '@/pages/BlogPage';
import OtherToolsPage from './pages/OtherToolsPage';

function App() {
  return (
    <Routes>
      <Route
        element={<HomePage />}
        path='/'
      />
      <Route
        element={<MapPage />}
        path='/map'
      />
      <Route
        element={<DashboardPage />}
        path='/dashboard'
      />
      <Route
        element={<HelpPage />}
        path='/help'
      />
      <Route
        element={<AboutPage />}
        path='/about'
      />
      <Route
        element={<BlogPage />}
        path='/blog'
      />
      <Route
        element={<OtherToolsPage />}
        path='/other-tools'
      />
    </Routes>
  );
}

export default App;
