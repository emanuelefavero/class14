import { Link, useParams } from 'react-router';
import { MaterialLinks, ProjectList } from '@/components/shared/CatalogContent';
import { CatalogState } from '@/components/shared/CatalogState';
import { useTopic } from '@/features/catalog/topics';
import { paths } from '@/router/paths';
import '../Catalog.css';

export const Topic = () => {
  const { name } = useParams();
  const state = useTopic(name);

  if (state.step !== 'success') {
    return (
      <div className='catalog-page'>
        <CatalogState state={state} subject="dell'argomento" />
      </div>
    );
  }

  const { data } = state;

  return (
    <article className='catalog-page'>
      <header className='catalog-heading'>
        <Link className='catalog-back' to={paths.topics}>
          ← Tutti gli argomenti
        </Link>
        <p className='catalog-eyebrow'>
          Argomento · {data.project_count}{' '}
          {data.project_count === 1 ? 'progetto' : 'progetti'}
        </p>
        <h1>{data.name}</h1>
      </header>
      <section className='catalog-section'>
        <h2>Progetti collegati</h2>
        {data.projects.length ? (
          <ProjectList projects={data.projects} />
        ) : (
          <p className='catalog-muted'>Nessun progetto collegato.</p>
        )}
      </section>
      <section className='catalog-section'>
        <h2>Materiali dei progetti collegati</h2>
        <p className='catalog-muted'>
          Questi materiali sono associati ai progetti dell'argomento.
        </p>
        <MaterialLinks
          cheatsheets={data.related_cheatsheets}
          resources={data.related_resources}
        />
      </section>
    </article>
  );
};
