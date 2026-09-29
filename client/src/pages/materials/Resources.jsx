import { Library } from 'lucide-react';
import { ProjectTitleLink } from '@/components/shared/CatalogContent';
import { CatalogFilters } from '@/components/shared/CatalogFilters';
import { CatalogState } from '@/components/shared/CatalogState';
import { useCatalogFilters } from '@/features/catalog/hooks/useCatalogFilters';
import { useResources } from '@/features/catalog/hooks/useResources';
import { useTopics } from '@/features/catalog/hooks/useTopics';
import '../Catalog.css';

export const Resources = () => {
  const filters = useCatalogFilters();
  const { search, topic } = filters;
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
              <li
                className='catalog-row catalog-material-row'
                key={resource.id}
              >
                <div className='catalog-row-main'>
                  <span className='catalog-material-icon' aria-hidden='true'>
                    <Library />
                  </span>
                  <div>
                    <h2 className='catalog-row-title'>{resource.title}</h2>
                    <p className='catalog-meta'>
                      {resource.projects.length ? (
                        <>
                          Progetti:{' '}
                          {resource.projects.map((project, index) => (
                            <span key={project.id}>
                              {index > 0 && ', '}
                              <ProjectTitleLink
                                className='link'
                                iconSize='inline'
                                project={project}
                              />
                            </span>
                          ))}
                        </>
                      ) : (
                        'Nessun progetto collegato'
                      )}
                    </p>
                  </div>
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
          filters={filters}
          topicsState={topics}
          searchLabel='Cerca per titolo'
          resultCount={catalog.step === 'success' ? catalog.data.length : null}
        />
        {render()}
      </section>
    </div>
  );
};
