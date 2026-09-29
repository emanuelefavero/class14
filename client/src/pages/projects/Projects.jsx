import { ProjectList } from '@/components/shared/CatalogContent';
import { CatalogFilters } from '@/components/shared/CatalogFilters';
import { CatalogState } from '@/components/shared/CatalogState';
import { fetchProjects } from '@/features/catalog/api';
import { useCatalogFilters } from '@/features/catalog/useCatalogFilters';
import '../Catalog.css';

export const Projects = () => {
  const { catalog, topics, search, topic, updateFilters } =
    useCatalogFilters(fetchProjects);

  const render = () => {
    switch (catalog.step) {
      case 'idle':
      case 'loading':
      case 'error':
        return <CatalogState state={catalog} subject='dei progetti' />;

      case 'success':
        if (catalog.data.length === 0) {
          return (
            <p className='catalog-muted'>
              {search || topic
                ? 'Nessun progetto corrisponde ai filtri selezionati.'
                : 'Nessun progetto nel catalogo.'}
            </p>
          );
        }

        return <ProjectList projects={catalog.data} />;

      default:
        return null;
    }
  };

  return (
    <div className='catalog-page'>
      <header className='catalog-heading'>
        <p className='catalog-eyebrow'>Il catalogo · WDPT14</p>
        <h1>Progetti</h1>
        <p>
          Dal primo progetto React al database: esplora esercizi, repository e
          materiali della classe.
        </p>
      </header>
      <section className='catalog-results' aria-label='Catalogo progetti'>
        <CatalogFilters
          search={search}
          topic={topic}
          topics={topics.step === 'success' ? topics.data : []}
          topicError={topics.step === 'error'}
          topicLoading={topics.step === 'idle' || topics.step === 'loading'}
          searchLabel='Cerca per titolo o slug'
          resultCount={catalog.step === 'success' ? catalog.data.length : null}
          onChange={updateFilters}
        />
        {render()}
      </section>
    </div>
  );
};
