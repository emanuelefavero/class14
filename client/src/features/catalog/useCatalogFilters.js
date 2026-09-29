import { useSearchParams } from 'react-router';
import { fetchTopics } from './api';
import { useCatalogData } from './useCatalogData';

export const useCatalogFilters = (fetcher) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get('q')?.trim() ?? '';
  const topic = searchParams.get('topic') ?? '';

  const query = new URLSearchParams();
  if (search) query.set('q', search);
  if (topic) query.set('topic', topic);

  const catalog = useCatalogData(fetcher, query.toString());
  const topics = useCatalogData(fetchTopics);

  const updateFilters = (nextSearch, nextTopic) => {
    const nextParams = new URLSearchParams();
    if (nextSearch.trim()) nextParams.set('q', nextSearch.trim());
    if (nextTopic) nextParams.set('topic', nextTopic);
    setSearchParams(nextParams);
  };

  return { catalog, topics, search, topic, updateFilters };
};
