import { cx } from '@/lib/utils';
import './Button.css';

const buttonVariant = Object.freeze({
  primary: 'primary',
  outline: 'outline',
  success: 'success',
  danger: 'danger',
  warning: 'warning',
  ghost: 'ghost',
});

export const Button = ({
  type = 'button',
  variant = buttonVariant.primary,
  fullWidth = false,
  className = '',
  ...props
}) => (
  <button
    type={type}
    className={cx('button', variant, fullWidth && 'full-width', className)}
    {...props}
  />
);

Button.variant = buttonVariant;
