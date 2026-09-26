import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Button } from '@/components/ui/Button';

/**
 * @template Item
 * @typedef {Object} IncrementalListProps
 * @property {Item[]} items
 * @property {(visibleItems: Item[]) => React.ReactNode} renderList
 * @property {number} [batchSize]
 * @property {string} [rootMargin]
 * @property {string} [buttonLabel]
 */

/**
 * Renders a list of items with incremental rendering and a "Load more" button. It accepts a renderList function to customize the rendering of the list items.
 *
 * @template Item
 * @param {IncrementalListProps<Item>} props
 *
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
