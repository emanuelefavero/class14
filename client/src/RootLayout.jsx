import { Outlet } from 'react-router';
import './RootLayout.css';
import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { Main } from '@/components/layout/Main';
import { Toast } from '@/components/ui/Toast';
import { ToastProvider } from '@/features/toast/context/ToastProvider';
import { navLinks } from '@/router/paths';

export const RootLayout = () => {
  return (
    <ToastProvider>
      <div className='root-layout'>
        <Header navLinks={navLinks} />

        <Main>
          <Outlet />
        </Main>

        <Footer />
        <Toast />
      </div>
    </ToastProvider>
  );
};
