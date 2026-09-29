import { ProjectTitleLink } from '@/components/shared/CatalogContent';
import { CatalogFilters } from '@/components/shared/CatalogFilters';
import { CatalogState } from '@/components/shared/CatalogState';
import { useCatalogFilters } from '@/features/catalog/hooks/useCatalogFilters';
import { useCheatsheets } from '@/features/catalog/hooks/useCheatsheets';
import { useTopics } from '@/features/catalog/hooks/useTopics';
import '../Catalog.css';

export const Cheatsheets = () => {
  const filters = useCatalogFilters();
  const { search, topic } = filters;
  const catalog = useCheatsheets(search, topic);
  const topics = useTopics();

  const render = () => {
    switch (catalog.step) {
      case 'idle':
      case 'loading':
      case 'error':
        return <CatalogState state={catalog} subject='dei cheat sheet' />;

      case 'success':
        if (catalog.data.length === 0) {
          return (
            <p className='catalog-muted'>
              {search || topic
                ? 'Nessun cheat sheet corrisponde ai filtri selezionati.'
                : 'Nessun cheat sheet nel catalogo.'}
            </p>
          );
        }

        return (
          <ul className='catalog-list'>
            {catalog.data.map((sheet) => (
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
        );

      default:
        return null;
    }
  };

  return (
    <div className='catalog-page'>
      <header className='catalog-heading'>
        <p className='catalog-eyebrow'>Materiali · WDPT14</p>
        <h1>Cheat sheet</h1>
        <p>PDF di ripasso e progetti a cui sono collegati.</p>
      </header>
      <section className='catalog-results' aria-label='Catalogo cheat sheet'>
        <CatalogFilters
          filters={filters}
          topicsState={topics}
          searchLabel='Cerca per titolo o slug'
          resultCount={catalog.step === 'success' ? catalog.data.length : null}
        />
        {render()}
      </section>
    </div>
  );
};
