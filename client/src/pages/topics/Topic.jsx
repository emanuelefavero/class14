import { Link, useParams } from 'react-router';
import { MaterialLinks, ProjectList } from '@/components/shared/CatalogContent';
import { CatalogTitle } from '@/components/shared/CatalogIcon';
import { CatalogState } from '@/components/shared/CatalogState';
import { getTopicIcon } from '@/features/catalog/catalogIcons';
import { useTopic } from '@/features/catalog/hooks/useTopic';
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
      <header className='catalog-heading catalog-detail-heading'>
        <Link className='catalog-back' to={paths.topics}>
          ← Tutti gli argomenti
        </Link>
        <p className='catalog-eyebrow'>
          Argomento · {data.project_count}{' '}
          {data.project_count === 1 ? 'progetto' : 'progetti'}
        </p>
        <h1>
          <CatalogTitle icon={getTopicIcon(data.name)} size='heading'>
            {data.name}
          </CatalogTitle>
        </h1>
        <dl className='catalog-detail-metrics'>
          <div>
            <dt>Progetti</dt>
            <dd>{data.project_count}</dd>
          </div>
          <div>
            <dt>Cheat sheet</dt>
            <dd>{data.related_cheatsheets.length}</dd>
          </div>
          <div>
            <dt>Risorse</dt>
            <dd>{data.related_resources.length}</dd>
          </div>
        </dl>
      </header>
      <div className='catalog-detail-layout'>
        <section className='catalog-section'>
          <div className='catalog-section-heading'>
            <h2>Progetti collegati</h2>
            <span>{data.projects.length} risultati</span>
          </div>
          {data.projects.length ? (
            <ProjectList projects={data.projects} />
          ) : (
            <p className='catalog-muted'>Nessun progetto collegato.</p>
          )}
        </section>
        <aside className='catalog-detail-aside'>
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
        </aside>
      </div>
    </article>
  );
};
