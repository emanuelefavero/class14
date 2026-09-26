import { Link } from 'react-router';
import { paths } from '@/router/paths';
import './AboutUs.css';

export const AboutUs = () => {
  return (
    <section className='about-us'>
      <header className='intro'>
        <h1 className='title font-semibold'>About Us</h1>

        <p className='lead text-xl'>
          We bring clothing, electronics, jewelry, and everyday essentials
          together in one simple shopping experience.
        </p>
      </header>

      <div className='details'>
        <article className='item'>
          <h2 className='text-xl font-semibold'>A varied selection</h2>
          <p>
            Explore a practical mix of products for different needs, interests,
            and moments in everyday life.
          </p>
        </article>

        <article className='item'>
          <h2 className='text-xl font-semibold'>Designed for simplicity</h2>
          <p>
            Clear product information and straightforward navigation help you
            find what you need without unnecessary complexity.
          </p>
        </article>
      </div>

      <p>
        Looking for a place to start?{' '}
        <Link to={paths.home} className='link'>
          Return to the homepage
        </Link>
        .
      </p>
    </section>
  );
};
