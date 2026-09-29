import { useSearchParams } from 'react-router';

/**
 * Custom hook to manage catalog filters using URL search parameters.
 */
export const useCatalogFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get('q')?.trim() ?? '';
  const topic = searchParams.get('topic') ?? '';

  const updateFilters = (nextSearch, nextTopic) => {
    const nextParams = new URLSearchParams();
    if (nextSearch.trim()) nextParams.set('q', nextSearch.trim());
    if (nextTopic) nextParams.set('topic', nextTopic);
    setSearchParams(nextParams);
  };

  return { search, topic, updateFilters };
};
