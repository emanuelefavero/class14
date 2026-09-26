import { useNavigate, useLocation } from 'react-router';
import { paths } from '@/router/paths';
import { cx } from '@/lib/utils';
import { Undo2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import './BackButton.css';

export const BackButton = ({
  variant = Button.variant.outline,
  icon = true,
  label = 'Back',
  className,
  ...props
}) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const isHome = pathname === paths.home;

  if (isHome) return null;

  const handleNavigateBack = () => navigate(-1);

  return (
    <Button
      variant={variant}
      className={cx('back-button', className)}
      {...props}
      onClick={handleNavigateBack}
    >
      {icon && <Undo2 className='icon' aria-hidden='true' />}
      <span className='label text-xs'>{label}</span>
    </Button>
  );
};
