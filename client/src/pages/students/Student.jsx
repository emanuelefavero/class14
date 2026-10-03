import { useParams } from 'react-router';
import { Breadcrumb } from '@/components/shared/Breadcrumb';
import {
  ProjectTitleLink,
  TopicLinks,
} from '@/components/shared/CatalogContent';
import { CatalogState } from '@/components/shared/CatalogState';
import { StudentAvatar } from '@/components/shared/StudentAvatar';
import { useStudent } from '@/features/catalog/hooks/useStudent';
import { paths } from '@/router/paths';
import '../Catalog.css';

export const Student = () => {
  const { github_username } = useParams();
  const state = useStudent(github_username);

  if (state.step !== 'success') {
    return (
      <div className='catalog-page'>
        <CatalogState state={state} subject='dello studente' />
      </div>
    );
  }

  const { data } = state;

  return (
    <article className='catalog-page'>
      <header className='catalog-heading catalog-detail-heading'>
        <Breadcrumb
          items={[
            { label: 'Home', to: paths.home },
            { label: 'Studenti', to: paths.students },
            { label: data.name },
          ]}
        />
        <p className='catalog-eyebrow'>Studente · WDPT14</p>
        <div className='catalog-person catalog-profile-heading'>
          <StudentAvatar
            key={data.github_username}
            student={data}
            size='profile'
          />
          <h1>{data.name}</h1>
        </div>
        <p className='catalog-meta'>@{data.github_username}</p>
        <dl className='catalog-detail-metrics'>
          <div>
            <dt>Repository disponibili</dt>
            <dd>{data.repository_count}</dd>
          </div>
          <div>
            <dt>Argomenti</dt>
            <dd>{data.topics.length}</dd>
          </div>
        </dl>
        <div className='catalog-actions'>
          <a
            className='link'
            href={data.github_url}
            target='_blank'
            rel='noreferrer'
          >
            Profilo GitHub ↗
          </a>
        </div>
        {data.topics.length > 0 && <TopicLinks topics={data.topics} />}
      </header>

      <section className='catalog-section'>
        <div className='catalog-section-heading'>
          <h2>Progetti con repository disponibili</h2>
          <span>{data.projects.length} nel catalogo</span>
        </div>
        {data.projects.length ? (
          <ul className='catalog-list catalog-repository-list'>
            {data.projects.map((project) => (
              <li className='catalog-row' key={project.id}>
                <div>
                  <ProjectTitleLink project={project} />
                  <p className='catalog-meta'>{project.slug}</p>
                </div>
                <a
                  className='link'
                  href={project.repo_url}
                  target='_blank'
                  rel='noreferrer'
                >
                  Apri repository ↗
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <p className='catalog-muted'>
            Nessuna repository pubblica verificata nel catalogo per questo
            studente.
          </p>
        )}
      </section>
    </article>
  );
};
