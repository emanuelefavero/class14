import { useCallback, useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/Button';

/**
 * Renders items in batches and automatically activates the same button available for manual loading.
 * @example
 * <IncrementalList
 *   items={items}
 *   renderList={(visibleItems) => <List items={visibleItems} />}
 * />
 */
export const IncrementalList = ({
  items,
  renderList,
  batchSize = 16,
  rootMargin = '400px 0px',
  buttonLabel = 'Load more',
}) => {
  const [visibleCount, setVisibleCount] = useState(batchSize);
  const buttonRef = useRef(null);
  const totalItems = items.length;

  const hasMore = visibleCount < totalItems;
  const visibleItems = items.slice(0, visibleCount);

  const loadMore = useCallback(() => {
    setVisibleCount((currentCount) =>
      Math.min(currentCount + batchSize, totalItems),
    );
  }, [batchSize, totalItems]);

  useEffect(() => {
    const loadMoreButton = buttonRef.current;

    if (!loadMoreButton || !hasMore) return;

    // Observing the real button preserves manual loading while also loading automatically before it enters the viewport.
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && loadMore(),
      { rootMargin },
    );

    observer.observe(loadMoreButton);

    return () => observer.disconnect();
  }, [hasMore, loadMore, rootMargin]);

  return (
    <>
      {renderList(visibleItems)}

      {hasMore && (
        <Button ref={buttonRef} onClick={loadMore}>
          {buttonLabel}
        </Button>
      )}
    </>
  );
};
