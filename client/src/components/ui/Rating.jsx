import { Star, StarHalf } from 'lucide-react';
import { cx } from '@/lib/utils';
import './Rating.css';

const MAX_RATING = 5;

export const Rating = ({
  value,
  count,
  className = '',
  'aria-label': ariaLabel = `${value} out of ${MAX_RATING}, ${count} reviews`,
  ...props
}) => {
  const rating = Math.min(Math.max(value, 0), MAX_RATING);
  const roundedRating = Math.round(rating * 2) / 2;

  return (
    <div
      className={cx('rating', 'text-sm', className)}
      aria-label={ariaLabel}
      {...props}
    >
      <span className='stars' aria-hidden='true'>
        {Array.from({ length: MAX_RATING }, (_, index) => {
          const position = index + 1;

          if (roundedRating >= position) {
            return <Star key={position} className='star filled' />;
          }

          if (roundedRating >= position - 0.5) {
            return <StarHalf key={position} className='star filled' />;
          }

          return <Star key={position} className='star empty' />;
        })}
      </span>

      <span>
        {value} ({count})
      </span>
    </div>
  );
};
