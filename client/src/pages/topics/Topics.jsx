import { Link } from 'react-router';
import { CatalogState } from '@/components/shared/CatalogState';
import { fetchTopics } from '@/features/catalog/api';
import { useCatalogData } from '@/features/catalog/useCatalogData';
import { getPath } from '@/router/paths';
import '../Catalog.css';

export const Topics = () => {
  const { data, error, loading } = useCatalogData(fetchTopics);

  return (
    <div className='catalog-page'>
      <header className='catalog-heading'>
        <p className='catalog-eyebrow'>Il percorso · WDPT14</p>
        <h1>Argomenti</h1>
        <p>
          Scegli una tecnologia per ritrovare i progetti e i materiali
          collegati.
        </p>
      </header>
      {loading || error ? (
        <CatalogState
          loading={loading}
          error={error}
          subject='degli argomenti'
        />
      ) : data.length ? (
        <ul className='catalog-list'>
          {data.map((topic) => (
            <li className='catalog-row' key={topic.name}>
              <Link
                className='catalog-row-title'
                to={getPath.topic(topic.name)}
              >
                {topic.name}
              </Link>
              <span className='catalog-meta'>
                {topic.project_count}{' '}
                {topic.project_count === 1 ? 'progetto' : 'progetti'}
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <p className='catalog-muted'>Nessun argomento nel catalogo.</p>
      )}
    </div>
  );
};
