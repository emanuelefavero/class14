import { Link } from 'react-router';
import { paths } from '@/router/paths';
import './Home.css';

export const Home = () => {
  return (
    <section className='home'>
      <h1 className='title font-semibold'>
        Everyday products, all in one place.
      </h1>

      <p className='description text-lg'>
        Explore a diverse selection of clothing, electronics, jewelry, and
        practical essentials for every part of your day.
      </p>

      <Link to={paths.products} className='cta font-semibold'>
        Browse products
      </Link>
    </section>
  );
};
