import { ProjectList } from '@/components/shared/CatalogContent';
import { CatalogState } from '@/components/shared/CatalogState';
import { fetchProjects } from '@/features/catalog/api';
import { useCatalogData } from '@/features/catalog/useCatalogData';
import '../Catalog.css';

export const Projects = () => {
  const { data, error, loading } = useCatalogData(fetchProjects);

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
      {loading || error ? (
        <CatalogState loading={loading} error={error} subject='dei progetti' />
      ) : data.length ? (
        <ProjectList projects={data} />
      ) : (
        <p className='catalog-muted'>Nessun progetto nel catalogo.</p>
      )}
    </div>
  );
};
