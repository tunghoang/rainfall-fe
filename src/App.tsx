import 'react-toastify/dist/ReactToastify.css';

import { Navbar } from './components/Navbar';
import RoutesPage from './RoutesPage';
import { ToastContainer } from 'react-toastify';
import {createContext, useState} from 'react';
import {I18nProvider} from "@react-aria/i18n";

export const UserContext = createContext<string | null>(null);

function App() {
  const __token = localStorage.getItem('token')
  const [ token, setToken ] = useState(__token)
  return (<UserContext.Provider value={token}>
    <I18nProvider locale="vi-VN">
      <div className='relative flex flex-col'>
        <Navbar token={token} setToken={setToken} />
        <RoutesPage />
        <ToastContainer />
      </div>
    </I18nProvider>
  </UserContext.Provider>);
}

export default App;
