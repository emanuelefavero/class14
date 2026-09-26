import './Footer.css';

export const Footer = () => {
  return (
    <footer className='footer'>
      <div className='container'>
        <p className='text-sm text-center font-medium'>
          &copy; {new Date().getFullYear()} Emanuele Favero
        </p>
      </div>
    </footer>
  );
};
