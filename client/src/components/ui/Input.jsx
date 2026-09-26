import './Input.css';
import { cx } from '@/lib/utils';

export const Input = ({ type = 'text', className = '', ...props }) => (
  <input type={type} className={cx('input', className)} {...props} />
);
