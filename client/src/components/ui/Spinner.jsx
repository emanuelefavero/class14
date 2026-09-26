import { Loader2Icon } from 'lucide-react';
import { cx } from '@/lib/utils';
import './Spinner.css';

export const Spinner = ({ className = '', ...props }) => (
  <div className='spinner'>
    <Loader2Icon
      className={cx('loader', className)}
      role='status'
      aria-label='Loading'
      {...props}
    />
  </div>
);
