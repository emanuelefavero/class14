import { Outlet } from 'react-router';
import './RootLayout.css';
import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { Main } from '@/components/layout/Main';
import { navLinks } from '@/router/paths';

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
