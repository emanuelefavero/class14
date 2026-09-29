import { ProjectList } from '@/components/shared/CatalogContent';
import { CatalogFilters } from '@/components/shared/CatalogFilters';
import { CatalogState } from '@/components/shared/CatalogState';
import { fetchProjects } from '@/features/catalog/api';
import { useCatalogFilters } from '@/features/catalog/useCatalogFilters';
import '../Catalog.css';

export const Projects = () => {
  const { catalog, topics, search, topic, updateFilters } =
    useCatalogFilters(fetchProjects);
  const { data, error, loading } = catalog;

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
            subject='dei progetti'
          />
        ) : data.length ? (
          <ProjectList projects={data} />
        ) : (
          <p className='catalog-muted'>
            {search || topic
              ? 'Nessun progetto corrisponde ai filtri selezionati.'
              : 'Nessun progetto nel catalogo.'}
          </p>
        )}
      </section>
    </div>
  );
};
