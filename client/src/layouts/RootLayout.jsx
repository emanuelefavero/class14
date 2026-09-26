import { Outlet } from 'react-router';
import './RootLayout.css';
import { Header } from '@/components/layout/Header';
import { Main } from '@/components/layout/Main';
import { Footer } from '@/components/layout/Footer';
import { navLinks } from '@/router/routes';

export const RootLayout = () => {
  return (
    <div className='root-layout'>
      <Header navLinks={navLinks} logo='React Context API' />

      <Main>
        <Outlet />
      </Main>

      <Footer />
    </div>
  );
};
