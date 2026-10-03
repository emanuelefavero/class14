import { RotateCcw, Search, SlidersHorizontal } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import './CatalogFilters.css';

/**
 * Renders the shared catalog controls and updates the URL-backed filters.
 * It also shows the topics state and the current number of results.
 */
export const CatalogFilters = ({
  filters,
  topicsState,
  searchLabel,
  resultCount,
}) => {
  const { search, topic, updateFilters } = filters;
  const topics = topicsState.step === 'success' ? topicsState.data : [];
  const topicError = topicsState.step === 'error';
  const topicLoading =
    topicsState.step === 'idle' || topicsState.step === 'loading';

  // Keep typed text local until submit to avoid a request for every character.
  const [draft, setDraft] = useState(search);
  const hasFilters = Boolean(search || topic);

  // Sync the draft when browser navigation or an external link changes the URL.
  useEffect(() => {
    setDraft(search);
  }, [search]);

  const handleSearch = (event) => {
    event.preventDefault();
    updateFilters(draft, topic);
  };

  const handleReset = () => {
    setDraft('');
    updateFilters('', '');
  };

  return (
    <div className='catalog-filters'>
      <div className='catalog-filter-heading'>
        <span aria-hidden='true'>
          <SlidersHorizontal />
        </span>
        <div>
          <strong>Filtra il catalogo</strong>
          <small>Ricerca e argomento</small>
        </div>
      </div>
      <div className='catalog-filter-controls'>
        <form className='catalog-search' role='search' onSubmit={handleSearch}>
          <label htmlFor='catalog-search-input'>{searchLabel}</label>
          <div className='catalog-search-row'>
            <div className='catalog-search-field'>
              <Search aria-hidden='true' />
              <Input
                id='catalog-search-input'
                name='q'
                value={draft}
                onChange={(event) => setDraft(event.target.value)}
                maxLength={150}
                placeholder='Cerca nel catalogo'
              />
            </div>
            <Button type='submit'>
              <Search aria-hidden='true' /> Cerca
            </Button>
          </div>
        </form>
        <div className='catalog-topic-filter'>
          <label htmlFor='catalog-topic-select'>Argomento</label>
          <Select
            id='catalog-topic-select'
            value={topic}
            onChange={(event) => updateFilters(draft, event.target.value)}
            disabled={topicLoading || Boolean(topicError)}
          >
            <option value=''>Tutti gli argomenti</option>
            {topic && !topics.some((item) => item.name === topic) && (
              <option value={topic}>{topic}</option>
            )}
            {topics.map((item) => (
              <option key={item.name} value={item.name}>
                {item.name}
              </option>
            ))}
          </Select>
        </div>
      </div>
      <div className='catalog-filter-status'>
        {resultCount !== null && (
          <p className='catalog-result-count' role='status'>
            {resultCount} {resultCount === 1 ? 'risultato' : 'risultati'}
          </p>
        )}
        {topicError && <p>Filtro argomenti non disponibile.</p>}
        {hasFilters && (
          <button className='link' type='button' onClick={handleReset}>
            <RotateCcw aria-hidden='true' /> Azzera filtri
          </button>
        )}
      </div>
    </div>
  );
};
