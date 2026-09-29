import { Link } from 'react-router';
import { CatalogState } from '@/components/shared/CatalogState';
import { useTopics } from '@/features/catalog/topics';
import { getPath } from '@/router/paths';
import '../Catalog.css';

export const Topics = () => {
  const state = useTopics();

  const render = () => {
    switch (state.step) {
      case 'idle':
      case 'loading':
      case 'error':
        return <CatalogState state={state} subject='degli argomenti' />;

      case 'success':
        if (state.data.length === 0) {
          return (
            <p className='catalog-muted'>Nessun argomento nel catalogo.</p>
          );
        }

        return (
          <ul className='catalog-list'>
            {state.data.map((topic) => (
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
        );

      default:
        return null;
    }
  };

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
      {render()}
    </div>
  );
};
