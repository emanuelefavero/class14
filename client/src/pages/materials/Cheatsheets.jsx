import { Link } from 'react-router';
import { CatalogFilters } from '@/components/shared/CatalogFilters';
import { CatalogState } from '@/components/shared/CatalogState';
import { fetchCheatsheets } from '@/features/catalog/api';
import { useCatalogFilters } from '@/features/catalog/useCatalogFilters';
import { getPath } from '@/router/paths';
import '../Catalog.css';

export const Cheatsheets = () => {
  const { catalog, topics, search, topic, updateFilters } =
    useCatalogFilters(fetchCheatsheets);
  const { data, error, loading } = catalog;

  return (
    <div className='catalog-page'>
      <header className='catalog-heading'>
        <p className='catalog-eyebrow'>Materiali · WDPT14</p>
        <h1>Cheat sheet</h1>
        <p>PDF di ripasso e progetti a cui sono collegati.</p>
      </header>
      <section className='catalog-results' aria-label='Catalogo cheat sheet'>
        <CatalogFilters
          search={search}
          topic={topic}
          topics={topics.data ?? []}
          topicError={topics.error}
          topicLoading={topics.loading}
          searchLabel='Cerca per titolo o slug'
          resultCount={loading || error ? null : data.length}
          onChange={updateFilters}
        />
        {loading || error ? (
          <CatalogState
            loading={loading}
            error={error}
            subject='dei cheat sheet'
          />
        ) : data.length ? (
          <ul className='catalog-list'>
            {data.map((sheet) => (
              <li className='catalog-row' key={sheet.id}>
                <div>
                  <h2 className='catalog-row-title'>{sheet.title}</h2>
                  <p className='catalog-meta'>
                    {sheet.projects.length ? (
                      <>
                        Progetti:{' '}
                        {sheet.projects.map((project, index) => (
                          <span key={project.id}>
                            {index > 0 && ', '}
                            <Link
                              className='link'
                              to={getPath.project(project.slug)}
                            >
                              {project.title}
                            </Link>
                          </span>
                        ))}
                      </>
                    ) : (
                      'Nessun progetto collegato'
                    )}
                  </p>
                </div>
                <div className='catalog-actions'>
                  <a
                    className='link'
                    href={sheet.file_path}
                    target='_blank'
                    rel='noreferrer'
                  >
                    Apri PDF ↗
                  </a>
                  <a className='link' href={sheet.file_path} download>
                    Scarica
                  </a>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className='catalog-muted'>
            {search || topic
              ? 'Nessun cheat sheet corrisponde ai filtri selezionati.'
              : 'Nessun cheat sheet nel catalogo.'}
          </p>
        )}
      </section>
    </div>
  );
};
