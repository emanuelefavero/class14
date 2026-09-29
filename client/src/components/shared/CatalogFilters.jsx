import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import './CatalogFilters.css';

export const CatalogFilters = ({
  search,
  topic,
  topics,
  topicError,
  topicLoading,
  searchLabel,
  resultCount,
  onChange,
}) => {
  const [draft, setDraft] = useState(search);
  const hasFilters = Boolean(search || topic);

  useEffect(() => {
    setDraft(search);
  }, [search]);

  const handleSearch = (event) => {
    event.preventDefault();
    onChange(draft, topic);
  };

  const handleReset = () => {
    setDraft('');
    onChange('', '');
  };

  return (
    <div className='catalog-filters'>
      <div className='catalog-filter-controls'>
        <form className='catalog-search' role='search' onSubmit={handleSearch}>
          <label htmlFor='catalog-search-input'>{searchLabel}</label>
          <div className='catalog-search-row'>
            <Input
              id='catalog-search-input'
              name='q'
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              maxLength={150}
              placeholder='Cerca nel catalogo'
            />
            <Button type='submit'>Cerca</Button>
          </div>
        </form>
        <div className='catalog-topic-filter'>
          <label htmlFor='catalog-topic-select'>Argomento</label>
          <Select
            id='catalog-topic-select'
            value={topic}
            onChange={(event) => onChange(draft, event.target.value)}
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
          <p role='status'>
            {resultCount} {resultCount === 1 ? 'risultato' : 'risultati'}
          </p>
        )}
        {topicError && <p>Filtro argomenti non disponibile.</p>}
        {hasFilters && (
          <button className='link' type='button' onClick={handleReset}>
            Azzera filtri
          </button>
        )}
      </div>
    </div>
  );
};
