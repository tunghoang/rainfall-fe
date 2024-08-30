import { NextUIProvider } from '@nextui-org/system';
import { useNavigate } from 'react-router-dom';

export function Provider({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();

  return (
    <NextUIProvider
      // locale='en-GB'
      navigate={navigate}
    >
      {children}
    </NextUIProvider>
  );
}
