import { Link } from 'react-router';
import { CatalogFilters } from '@/components/shared/CatalogFilters';
import { CatalogState } from '@/components/shared/CatalogState';
import { fetchResources } from '@/features/catalog/api';
import { useCatalogFilters } from '@/features/catalog/useCatalogFilters';
import { getPath } from '@/router/paths';
import '../Catalog.css';

export const Resources = () => {
  const { catalog, topics, search, topic, updateFilters } =
    useCatalogFilters(fetchResources);
  const { data, error, loading } = catalog;

  return (
    <div className='catalog-page'>
      <header className='catalog-heading'>
        <p className='catalog-eyebrow'>Materiali · WDPT14</p>
        <h1>Risorse</h1>
        <p>
          Documentazione e tutorial esterni utili per i progetti del percorso.
        </p>
      </header>
      <section className='catalog-results' aria-label='Catalogo risorse'>
        <CatalogFilters
          search={search}
          topic={topic}
          topics={topics.data ?? []}
          topicError={topics.error}
          topicLoading={topics.loading}
          searchLabel='Cerca per titolo'
          resultCount={loading || error ? null : data.length}
          onChange={updateFilters}
        />
        {loading || error ? (
          <CatalogState
            loading={loading}
            error={error}
            subject='delle risorse'
          />
        ) : data.length ? (
          <ul className='catalog-list'>
            {data.map((resource) => (
              <li className='catalog-row' key={resource.id}>
                <div>
                  <h2 className='catalog-row-title'>{resource.title}</h2>
                  <p className='catalog-meta'>
                    {resource.projects.length ? (
                      <>
                        Progetti:{' '}
                        {resource.projects.map((project, index) => (
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
                <a
                  className='link'
                  href={resource.url}
                  target='_blank'
                  rel='noreferrer'
                >
                  Apri risorsa ↗
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <p className='catalog-muted'>
            {search || topic
              ? 'Nessuna risorsa corrisponde ai filtri selezionati.'
              : 'Nessuna risorsa nel catalogo.'}
          </p>
        )}
      </section>
    </div>
  );
};
