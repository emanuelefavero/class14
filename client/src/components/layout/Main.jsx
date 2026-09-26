import './Main.css';

export const Main = ({ children, ...props }) => {
  return (
    <main className='main' {...props}>
      <div className='container'>{children}</div>
    </main>
  );
};
