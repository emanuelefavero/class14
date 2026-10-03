import { useSearchParams } from 'react-router';

/** Keeps catalog filters in the URL so they survive reloads, browser navigation and link sharing. */
export const useCatalogFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get('q')?.trim() ?? '';
  const topic = searchParams.get('topic') ?? '';

  // Rebuild the query string so cleared filters are removed instead of left as empty parameters.
  const updateFilters = (nextSearch, nextTopic) => {
    const nextParams = new URLSearchParams();
    if (nextSearch.trim()) nextParams.set('q', nextSearch.trim());
    if (nextTopic) nextParams.set('topic', nextTopic);
    setSearchParams(nextParams);
  };

  return { search, topic, updateFilters };
};
