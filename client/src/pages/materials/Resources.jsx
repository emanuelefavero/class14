import { Link } from 'react-router';
import { CatalogFilters } from '@/components/shared/CatalogFilters';
import { CatalogState } from '@/components/shared/CatalogState';
import { useResources } from '@/features/catalog/materials';
import { useTopics } from '@/features/catalog/topics';
import { useCatalogFilters } from '@/features/catalog/useCatalogFilters';
import { getPath } from '@/router/paths';
import '../Catalog.css';

export const Resources = () => {
  const { search, topic, updateFilters } = useCatalogFilters();
  const catalog = useResources(search, topic);
  const topics = useTopics();

  const render = () => {
    switch (catalog.step) {
      case 'idle':
      case 'loading':
      case 'error':
        return <CatalogState state={catalog} subject='delle risorse' />;

      case 'success':
        if (catalog.data.length === 0) {
          return (
            <p className='catalog-muted'>
              {search || topic
                ? 'Nessuna risorsa corrisponde ai filtri selezionati.'
                : 'Nessuna risorsa nel catalogo.'}
            </p>
          );
        }

        return (
          <ul className='catalog-list'>
            {catalog.data.map((resource) => (
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
        );

      default:
        return null;
    }
  };

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
          topics={topics.step === 'success' ? topics.data : []}
          topicError={topics.step === 'error'}
          topicLoading={topics.step === 'idle' || topics.step === 'loading'}
          searchLabel='Cerca per titolo'
          resultCount={catalog.step === 'success' ? catalog.data.length : null}
          onChange={updateFilters}
        />
        {render()}
      </section>
    </div>
  );
};
