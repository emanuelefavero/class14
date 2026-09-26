import './Select.css';
import { ChevronDown } from 'lucide-react';
import { cx } from '@/lib/utils';

export const Select = ({ className = '', children, ...props }) => (
  <div className='select-wrapper'>
    <select className={cx('select', className)} {...props}>
      {children}
    </select>
    <ChevronDown className='select-icon' size={18} aria-hidden='true' />
  </div>
);
