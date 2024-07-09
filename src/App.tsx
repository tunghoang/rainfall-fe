import 'leaflet/dist/leaflet.css';
import { Route, Routes } from 'react-router-dom';

import IndexPage from '@/pages/index';
import DocsPage from '@/pages/docs';
import PricingPage from '@/pages/pricing';
import BlogPage from '@/pages/blog';
import AboutPage from '@/pages/about';
import FullScreenMapPage from './pages/full-screen-map';

function App() {
  return (
    <Routes>
      <Route
        element={<IndexPage />}
        path='/'
      />
      <Route
        element={<DocsPage />}
        path='/docs'
      />
      <Route
        element={<PricingPage />}
        path='/pricing'
      />
      <Route
        element={<BlogPage />}
        path='/blog'
      />
      <Route
        element={<AboutPage />}
        path='/about'
      />
      <Route
        element={<FullScreenMapPage />}
        path='/full-screen-map'
      />
    </Routes>
  );
}

export default App;
