import { Link } from 'react-router';
import { CatalogState } from '@/components/shared/CatalogState';
import { fetchCheatsheets } from '@/features/catalog/api';
import { useCatalogData } from '@/features/catalog/useCatalogData';
import { getPath } from '@/router/paths';
import '../Catalog.css';

export const Cheatsheets = () => {
  const { data, error, loading } = useCatalogData(fetchCheatsheets);

  return (
    <div className='catalog-page'>
      <header className='catalog-heading'>
        <p className='catalog-eyebrow'>Materiali · WDPT14</p>
        <h1>Cheat sheet</h1>
        <p>PDF di ripasso e progetti a cui sono collegati.</p>
      </header>
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
        <p className='catalog-muted'>Nessun cheat sheet nel catalogo.</p>
      )}
    </div>
  );
};
