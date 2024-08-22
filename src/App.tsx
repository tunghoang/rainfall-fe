import { Navbar } from './components/Navbar';
import RoutesPage from './RoutesPage';

function App() {
  return (
    <div className='relative flex flex-col h-screen'>
      <Navbar />
      <RoutesPage />
    </div>
  );
}

export default App;
