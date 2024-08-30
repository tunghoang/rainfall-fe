import 'react-toastify/dist/ReactToastify.css';

import { Navbar } from './components/Navbar';
import RoutesPage from './RoutesPage';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <div className='relative flex flex-col h-screen'>
      <Navbar />
      <RoutesPage />
      <ToastContainer />
    </div>
  );
}

export default App;
